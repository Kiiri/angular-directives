/**
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var scrollbar = angular.module("kiiri.angular.scrollbar", []);

scrollbar.directive("scrollbar", ["Helpers", "$timeout",
    function (Helpers, $timeout) {
        "use strict";
        return {
            restrict: "A",
            templateUrl: "src/scrollbar/kiiri-scrollbar.tpl.html",
            scope: {
                maxHeight: "@?",
                disabled: "@?"
            },
            transclude: true,
            link: function($scope, element) {
                if (!$scope.disabled) {
                    $(element).addClass("kiiri-scrollbar-wrapper");
                    $scope.scrollbar = $(element).mCustomScrollbar();
                }

                $scope.$watch("disabled", function(newValue, oldValue) {
                    if (newValue !== oldValue) {
                        if ($scope.disabled) {
                            if ($scope.scrollbar) {
                                $(element).removeClass("kiiri-scrollbar-wrapper");
                                $(element).mCustomScrollbar("destroy");
                                $scope.scrollbar = undefined;
                            }
                        } else {
                            if (!$scope.scrollbar) {
                                $(element).addClass("kiiri-scrollbar-wrapper");
                                $scope.scrollbar = $(element).mCustomScrollbar();
                            }
                        }
                    }
                });
            }
        };
    }
]);