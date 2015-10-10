/**
 * Fills itself to fill its parent element. Overlays a hidden file input field on top of its parent.
 * Previews the chosen image in the element. See examples/kiiri-image-input.
 *
 * Note: The parent element must have the property 'position' set to 'relative' in order for
 * for the css to work properly.
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var imageInput = angular.module("kiiri.angular.imageinput", []);

imageInput.controller("imageInputController", ["$scope", "$timeout", "$http", "Helpers",
    function ($scope, $timeout, $http, Helpers) {
        'use strict';

        Helpers.defaultValue($scope, "onChange", angular.noop);

        if ($scope.defaultGradient) {
            var min = 152;
            var max = 225;

            $scope.gradientValues = [
                Math.floor(Math.random() * (max - min) + min),
                Math.floor(Math.random() * (max - min) + min),
                Math.floor(Math.random() * (max - min) + min)
            ];
        }

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

        $scope.fileChanged = function(file) {
            $timeout(function() {
                if (!$scope.loading) {
                    var reader = new FileReader();

                    if ($scope.autoLoading) {
                        $scope.loading = true;
                    }

                    reader.onload = function (dataUrl) {
                        $scope.$apply(function() {
                            $scope.value = dataUrl.target.result;
                        });
                    };

                    if (file && file.files && file.files.length > 0) {
                        $scope.$apply(function() {
                            $scope.file = file.files[0];
                            $scope.onChange(file.files[0]);
                        });
                    }
                    reader.readAsDataURL(file.files[0]);
                }
            }, 0);
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
                getFile: "=?",
                onChange: "=?",
                loading: "=?",
                autoLoading: "=?",
                defaultGradient: "=?"
            },
            transclude: true,
            controller: "imageInputController"
        };
    }
]);