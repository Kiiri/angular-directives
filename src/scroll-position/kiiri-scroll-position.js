/**
 * Angular scroll position directive
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var scrollPosition = angular.module("kiiri.angular.scrollposition", []);

scrollPosition.controller("scrollPositionController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";
    }
]);

scrollPosition.directive("scrollPosition", ["$window",
    function ($window) {
        "use strict";
        return {
            restrict: "A",
            scope: {
                minScrollHeight: "@?",
                maxScrollHeight: "@?",
                currentScrollHeight: "=?"
            },
            link: function ($scope, element) {
                $scope.currentScrollHeight = $window.scrollY;

                var refreshElementDisplay = function() {
                    $scope.$apply(function() {
                        $scope.currentScrollHeight = $window.scrollY;
                    });

                    try {
                        // If the given height is a percentage, attempt to parse it with respect to window height
                        if ($scope.minScrollHeight && $scope.minScrollHeight.indexOf("%") === $scope.minScrollHeight.length -1) {
                            $scope.minScrollHeight = parseFloat($scope.minScrollHeight)/100 * $window.innerHeight;
                        }

                        if ($scope.maxScrollHeight && $scope.maxScrollHeight.indexOf("%") === $scope.maxScrollHeight.length -1) {
                            $scope.maxScrollHeight = parseFloat($scope.maxScrollHeight)/100 * $window.innerHeight;
                        }
                    } catch (ex) {}

                    if ($scope.minScrollHeight && $window.scrollY < $scope.minScrollHeight) {
                        $(element).hide();
                    } else if ($scope.maxScrollHeight && $window.scrollY > $scope.maxScrollHeight) {
                        $(element).hide();
                    } else {
                        $(element).show();
                    }
                };

                angular.element($window).on("scroll", refreshElementDisplay);
                refreshElementDisplay();
            }
        };
    }
]);