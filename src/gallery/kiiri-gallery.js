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
        }
    ]);

    gallery.directive("gallery", [
        function () {
            return {
                restrict: "E",
                scope: {
                    maxDisplay: "@?",
                    images: "="
                },
                templateUrl: "src/gallery/kiiri-gallery.tpl.html",
                transclude: true,
                controller: "galleryController"
            };
        }
    ]);
})();