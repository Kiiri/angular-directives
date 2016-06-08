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
            link: function($scope, element) {
                $scope.$watch(function() { element.attr("background-image"); }, function() {
                    var backgroundImage = element.attr("background-image");
                    if (backgroundImage) {
                        $(element).addClass("kiiri-background-image");
                        if (backgroundImage.indexOf("rgb(") === -1 && backgroundImage.indexOf("rgba(") === -1) {
                            $(element).css("background-image", "url(" + backgroundImage + ")");
                        } else {
                            $(element).css("background-color", backgroundImage);
                        }
                    }
                });
            }
        };
    }
]);