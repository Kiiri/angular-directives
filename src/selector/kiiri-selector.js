/**
 * Multiple option selector directive
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var selector = angular.module("kiiri.angular.selector", []);

selector.controller("selectorController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";

        $scope.itemDisplay = function(item) {
            return angular.isObject(item) ? item.name : item;
        };

        $scope.itemDisabled = function(item) {
            return angular.isObject(item) && item.disabled;
        };

        $scope.itemSelected = function(item) {
            return $scope.selectedItems.indexOf(item) !== -1;
        };

        $scope.selectItem = function(item) {
            if (item.onClick) { item.onClick(); }
            if (item.disabled || item.skip) { return; }
            if ($scope.single) { $scope.selectedItems.length = 0; }

            var index = $scope.selectedItems.indexOf(item);

            if (index === -1) {
                $scope.selectedItems.push(item);
            } else if (!$scope.single) {
                $scope.selectedItems.splice(index, 1);
            }

            if ($scope.single) { $scope.selectedItem = $scope.selectedItems[0]; }
        };
    }
]);

selector.directive("selector", ["Helpers",
    function (Helpers) {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/selector/kiiri-selector.tpl.html",
            scope: {
                items: "=",
                selectedItems: "=?",
                selectedItem: "=?",
                autoSelect: "@?",
                single: "@?",
                variant: "@?",
                fill: "@?"
            },
            controller: "selectorController",
            link: function ($scope, element) {
                Helpers.defaultValue($scope, "selectedItems", []);

                $scope.$watch("items", function(newValue, oldValue) {
                    if ($scope.autoSelect && $scope.items.length > 0) {
                        if ($scope.selectedItems.length === 0 || newValue !== oldValue) {
                            $scope.selectedItems.push($scope.items[0]);

                            if ($scope.single) { $scope.selectedItem = $scope.selectedItems[0]; }
                        }
                    }
                }, true);
            }
        };
    }
]);