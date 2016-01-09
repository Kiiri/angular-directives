/**
 * Directive used set the background-image attribute of an element. Ensures something is only attempted
 * to be loaded when an image is given.
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var backgroundImage = angular.module("kiiri.angular.backgroundImage", []);

backgroundImage.directive("backgroundImage", ["Helpers",
    function (Helpers) {
        "use strict";
        return {
            restrict: "A",
            scope: {
                backgroundImage: "@?"
            },
            link: function($scope, element) {
                $scope.$watch("backgroundImage", function() {
                    if ($scope.backgroundImage) {
                        $(element).css("background-image", "url(" + $scope.backgroundImage + ")");
                    }
                });
            }
        };
    }
]);