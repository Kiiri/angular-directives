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

scrollPosition.directive("scrollPosition", ["$timeout", "$window",
    function ($timeout, $window) {
        "use strict";
        return {
            restrict: "A",
            scope: {
                minScrollHeight: "@?",
                maxScrollHeight: "@?",
                currentScrollHeight: "=?",
                pageHeight: "=?",
                scrollClass: "@?",
                hideElement: "@?"
            },
            link: function ($scope, element) {
                $scope.currentScrollHeight = $window.scrollY;
                $scope.pageHeight = $window.innerHeight;

                var toggleClasses = function(trigger) {
                    if ($scope.scrollClass) {
                        if (trigger) {
                            $(element).addClass($scope.scrollClass);
                        } else {
                            $(element).removeClass($scope.scrollClass);
                        }
                    }
                };

                var refreshElementDisplay = function() {
                    $timeout(function() {
                        $scope.currentScrollHeight = $window.scrollY;
                        $scope.pageHeight = $window.innerHeight;
                    }, 0);

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
                        if ($scope.hideElement !== "false") {
                            $(element).hide();
                        }
                        toggleClasses(false);
                    } else if ($scope.maxScrollHeight && $window.scrollY > $scope.maxScrollHeight) {
                        if ($scope.hideElement !== "false") {
                            $(element).hide();
                        }
                        toggleClasses(false);
                    } else {
                        if ($scope.hideElement !== "false") {
                            $(element).show();
                        }
                        toggleClasses(true);
                    }
                };

                angular.element($window).on("scroll", refreshElementDisplay);
                refreshElementDisplay();
            }
        };
    }
]);