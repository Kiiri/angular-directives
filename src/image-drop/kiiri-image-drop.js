
;(function() {
    "use strict";

    var imageDrop = angular.module("kiiri.angular.imageDrop", []);

    imageDrop.controller("imageDropController", ["$element", "$log", "$scope", "$timeout",
        function($element, $log, $scope, $timeout) {
            $scope.openFileInput = function() {
                $timeout(function() {
                    $element.find("input[type='file']").click();
                }, 0);
            };

            $scope.fileInputChanged = function(file) {
                $scope.validateAndPreviewImage($element.find("input[type='file']")[0].files[0]);
                $scope.clear();
            };

            $scope.validateAndPreviewImage = function(file) {
                var reader = new FileReader();
                var type, size, name;

                reader.onload = function(event) {
                    // if the max file size is provided and the size of dropped file is greater than it,
                    // it's an invalid file and false is returned
                    if (!$scope.maxFileSize || (((size / 1024) / 1024) < $scope.maxFileSize)) {
                        if (!$scope.validMimeTypes || $scope.validMimeTypes.indexOf(type) !== -1) {
                            $scope.$apply(function() {
                                $scope.image = event.target.result;
                            });
                        } else {
                            $log.error("Invalid file type given. File type must be one of the following: " + $scope.validMimeTypes);
                        }
                    } else {
                        $log.error("File must be smaller than " + $scope.maxFileSize + " MB");
                    }
                };

                name = file.name;
                type = file.type;
                size = file.size;
                reader.readAsDataURL(file);
                return false;
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

    imageDrop.directive("imageDrop", [
        function () {
            return {
                restrict: "E",
                templateUrl: "src/image-drop/kiiri-image-drop.tpl.html",
                scope: {
                    currentProgress: "&?",
                    image: "=?",
                    maxFileSize: "&?",
                    validMimeTypes: "&?"
                },
                transclude: true,
                controller: "imageDropController",
                link: function($scope, element, attrs) {
                    element.bind("dragover dragenter", function(event) {
                        if (event) { event.preventDefault(); }
                        (event.dataTransfer || event.originalEvent.dataTransfer).effectAllowed = "move";
                        return false;
                    });

                    element.bind("drop", function(event) {
                        event.preventDefault();

                        return $scope.validateAndPreviewImage((event.dataTransfer || event.originalEvent.dataTransfer).files[0]);
                    });
                }
            };
        }
    ]);

    imageDrop.directive("fileChange", [
        function() {
            return {
                restrict: "A",
                scope: {
                    fileChange: "&"
                },
                link: function(scope, element, attrs) {
                    element.on("change", onChange);

                    scope.$on("destroy", function () {
                        element.off("change", onChange);
                    });

                    function onChange() {
                        scope.fileChange();
                    }
                }
            };
        }
    ]);
})();