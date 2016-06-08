
;(function() {
    "use strict";

    var imageOnload = angular.module("kiiri.angular.imageOnload", []);

    imageOnload.directive('imageOnload', function() {
        return {
            restrict: "A",
            scope: {
                imageOnload: "&?"
            },
            link: function($scope, element, attrs) {
                element.bind('load', function() {
                    $scope.imageOnload();
                });
                element.bind('error', function(){
                    console.error("Unable to load image");
                });
            }
        };
    });
})();