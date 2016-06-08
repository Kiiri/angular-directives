;(function() {
    "use strict";

    /**
     * Basic gallery display for a given list of images
     *
     * @author Alex Dong (https://github.com/Kiiri)
     */

    var gallery = angular.module("kiiri.angular.gallery", []);

    gallery.controller("galleryController", ["$scope", "Helpers",
        function($scope, Helpers) {
            Helpers.defaultValue($scope, "maxDisplay", 3, function(value) { return Number(value); });
            Helpers.defaultValue($scope, "currentIndex", 0);
            Helpers.defaultValue($scope, "imageModalOpen", false);

            $scope.openImageModal = function(index) {
                $scope.currentIndex = index;
                $scope.imageModalOpen = true;
            };

            $scope.previousImage = function() {
                $scope.currentIndex = $scope.currentIndex - 1;

                if($scope.currentIndex < 0) {
                    $scope.currentIndex = $scope.images.length - 1;
                }
            };

            $scope.nextImage = function() {
                $scope.currentIndex = $scope.currentIndex + 1;

                if($scope.currentIndex >= $scope.images.length) {
                    $scope.currentIndex = 0;
                }
            };
        }
    ]);

    gallery.directive("gallery", [
        function () {
            return {
                restrict: "E",
                scope: {
                    maxDisplay: "@?",
                    images: "=",
                    currentIndex: "=?"
                },
                templateUrl: "src/gallery/kiiri-gallery.tpl.html",
                transclude: true,
                controller: "galleryController",
                link: function($scope, element) {
                    $(document).bind("keydown keypress", function (event) {
                        if($scope.imageModalOpen) {
                            // Left arrow
                            if ((event.keyCode || event.which) === 37) {
                                $scope.$apply(function() { $scope.previousImage(); });
                                event.preventDefault();
                            // Right arrow
                            } else if ((event.keyCode || event.which) === 39) {
                                $scope.$apply(function() { $scope.nextImage(); });
                                event.preventDefault();
                            }
                        }
                    });
                }
            };
        }
    ]);
})();