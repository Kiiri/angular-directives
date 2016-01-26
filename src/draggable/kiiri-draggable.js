;(function() {
    "use strict";

    /**
     * Wrapper for jQuery UI draggable. Currently only supports axes, containment, and grid.
     *
     * @author Alex Dong (https://github.com/Kiiri)
     */

    var draggable = angular.module("kiiri.angular.draggable", []);

    draggable.directive("draggable", ["$timeout", "Helpers",
        function ($timeout, Helpers) {
            return {
                restrict: "A",
                scope: {
                    horizontalScroll: "@?",
                    verticalScroll: "@?",
                    parentBound: "@?",
                    snapGrid: "=?",
                    currentPosition: "=?",
                    maxLeft: "=?",
                    minLeft: "=?"
                },
                link: function($scope, element) {
                    $(element).addClass("kiiri-draggable");

                    $scope.currentPosition = {
                        left: Number($(element).css("left").replace("px", "")) || 0,
                        top: Number($(element).css("top").replace("px", "")) || 0
                    };

                    var properties = {
                        drag: function() {
                            $timeout(function() {
                                $scope.currentPosition = {
                                    left: Number($(element).css("left").replace("px", "")),
                                    top: Number($(element).css("top").replace("px", ""))
                                };

                                if ($scope.maxLeft !== undefined && $scope.currentPosition.left >= $scope.maxLeft) {
                                    $(element).css("left", $scope.maxLeft + "px");
                                    $scope.currentPosition.left = $scope.maxLeft;
                                }

                                if ($scope.minLeft !== undefined && $scope.currentPosition.left <= $scope.minLeft) {
                                    $(element).css("left", $scope.minLeft + "px");
                                    $scope.currentPosition.left = $scope.minLeft;
                                }
                            }, 0);
                        },
                    };

                    if ($scope.horizontalScroll === "false") {
                        properties.axis = "y";
                    } else if ($scope.verticalScroll === "false") {
                        properties.axis = "x";
                    }

                    if ($scope.parentBound !== "false") {
                        properties.containment = "parent";
                    }

                    if ($scope.snapGrid) {
                        properties.grid = $scope.snapGrid;
                    }

                    $(element).draggable(properties);
                },
                controller: ["$scope", "Helpers",
                    function($scope, Helpers) {
                        Helpers.defaultValue($scope, "horizontalScroll", true);
                        Helpers.defaultValue($scope, "verticalScroll", true);
                        Helpers.defaultValue($scope, "parentBound", true);
                        Helpers.defaultValue($scope, "snapGrid", [20, 20]);
                    }
                ]
            };
        }
    ]);
})();