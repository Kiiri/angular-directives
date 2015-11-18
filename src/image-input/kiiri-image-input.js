/**
 * Resizes itself to fill its parent element. Overlays a hidden file input field on top of its parent.
 * Previews the chosen image in the element. Also allows for cropping of given image.
 * See examples/kiiri-image-input.
 *
 * Note: The parent element must have the property 'position' set to 'relative' in order for
 * for the css to work properly.
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var imageInput = angular.module("kiiri.angular.imageinput", []);

imageInput.controller("imageInputController", ["$scope", "$element", "$timeout", "$http", "Helpers",
    function ($scope, $element, $timeout, $http, Helpers) {
        'use strict';

        Helpers.defaultValue($scope, "onChange", angular.noop);
        Helpers.defaultValue($scope, "cropWidth", 640);
        Helpers.defaultValue($scope, "cropHeight", 360);

        if ($scope.defaultGradient) {
            var min = 152;
            var max = 225;

            $scope.gradientValues = [
                Math.floor(Math.random() * (max - min) + min),
                Math.floor(Math.random() * (max - min) + min),
                Math.floor(Math.random() * (max - min) + min)
            ];
        }

        $scope.showOpacityOverlay = function() {
            if (!$scope.hoverEffectOff) {
                $scope.opacityShowing = true;
            }
        };

        $scope.hideOpacityOverlay = function() {
            if (!$scope.hoverEffectOff) {
                $scope.opacityShowing = false;
            }
        };

        $scope.getFile = function() {
            return $scope.file;
        };

        $scope.openImageInput = function($event) {
            $event.stopPropagation();

            $timeout(function() {
                if (!$scope.loading) {
                    $($event.currentTarget).find("input[type='file']").click();
                }
            }, 0);
        };

        $scope.uploadImage = function(image) {
            $scope.formData = new FormData();
            $scope.formData.append("file", image);

            if ($scope.authenticityToken) {
                $scope.formData.append("authenticity_token", $scope.authenticityToken);
            }

            $scope.loading = true;

            $http({
                url: $scope.uploadUrl,
                method: "POST",
                data: $scope.formData,
                headers: {'Content-Type': undefined}
            }).success(function(response) {
                $scope.value = $scope.onloadResult;
            }).error(function(response) {
                console.log("There was an error uploading the file.");
            })["finally"](function() {
                $scope.loading = false;
            });
        };

        $scope.destroyCropper = function() {
            $element.find(".kiiri-crop-image").cropper("destroy");
        };

        $scope.finishCropping = function() {
            var croppedResult = $element.find(".kiiri-crop-image").cropper("getCroppedCanvas");
            $scope.onloadResult = croppedResult.toDataURL();

            croppedResult.toBlob(function(blob) {
                $timeout(function() {
                    $scope.onChange(blob);
                    $scope.displayCropModal = false;

                    if ($scope.uploadUrl) {
                        $scope.uploadImage(blob);
                    } else {
                        $scope.value = $scope.onloadResult;
                        $scope.blob = blob;
                    }

                    if ($scope.autoLoading) {
                        $scope.loading = true;
                    }
                }, 0);
            });
        };

        $scope.fileChanged = function(file) {
            $timeout(function() {
                if (!$scope.loading) {
                    var reader = new FileReader();

                    if ($scope.autoLoading && !$scope.cropImage) {
                        $scope.loading = true;
                    }

                    reader.onload = function (dataUrl) {
                        if ($scope.cropImage || $scope.uploadUrl) {
                            $scope.$apply(function() {
                                $scope.onloadResult = dataUrl.target.result;
                            });
                        } else {
                            $scope.$apply(function() {
                                $scope.value = dataUrl.target.result;
                            });
                        }
                    };

                    if (file && file.files && file.files.length > 0 && !$scope.cropImage) {
                        $scope.$apply(function() {
                            $scope.file = file.files[0];
                            $scope.onChange(file.files[0]);
                        });
                    }
                    reader.readAsDataURL(file.files[0]);

                    if ($scope.cropImage) {
                        $scope.$apply(function() {
                            $scope.displayCropModal = true;

                            /* Needs a slight timeout, so that the modal is open before cropper is called */
                            $timeout(function() {
                                $element.find(".kiiri-crop-image").cropper({
                                    aspectRatio: $scope.cropWidth / $scope.cropHeight,
                                    movable: false,
                                    zoomable: false,
                                    rotatable: false,
                                    scalable: false
                                });
                            }, 100);
                        });
                    } else if ($scope.uploadUrl) {
                        $scope.$apply(function() {
                            $scope.uploadImage(file.files[0]);
                        });
                    }
                }
            }, 0);
        };

        // http://stackoverflow.com/questions/1043957/clearing-input-type-file-using-jquery
        $scope.clear = function() {
            var $fileInput = $element.find("input[type='file']");

            $fileInput.wrap('<form>').closest('form').get(0).reset();
            $fileInput.unwrap();
            $scope.value = "";
        };
    }
]);

imageInput.directive("imageInput", [
    function () {
        'use strict';
        return {
            restrict: "E",
            templateUrl: "src/image-input/kiiri-image-input.tpl.html",
            scope: {
                value: "=?",
                blob: "=?",
                getFile: "=?",
                onChange: "=?",
                loading: "=?",
                autoLoading: "=?",
                defaultGradient: "=?",
                uploadUrl: "@?",
                authenticityToken: "@?",
                hoverEffectOff: "@?",
                cropImage: "@?",
                cropWidth: "@?",
                cropHeight: "@?",
                clear: "=?"
            },
            transclude: true,
            controller: "imageInputController"
        };
    }
]);