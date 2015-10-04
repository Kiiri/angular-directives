/**
 * Angular customizable dropdown field. Takes in a list of items in either object
 * (with keys "name" and "value") or string form. Can be set to auto select the
 * first element, use a given icon for its background, among other things. See the
 * example in examples/kiiri-dropdown.html
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var dropdown = angular.module("kiiri.angular.dropdown", []);

dropdown.controller("dropdownController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "items", []);

        // The list of items can either be a list of values, or a list of objects
        // with the keys 'name' and 'value'
        $scope.itemDisplay = function(item) {
            if (angular.isObject(item)) {
                return item.name;
            } else {
                return item;
            }
        };

        $scope.itemValue = function(item) {
            if (angular.isObject(item)) {
                return item.value;
            } else {
                return item;
            }
        };

        $scope.selectItem = function(item) {
            $scope.selectedItem = item;
            $scope.dropdownOpen = false;
        };

        $scope.toggleDropdown = function() {
            $scope.dropdownOpen = !$scope.dropdownOpen;
        };

        $scope.closeDropdown = function() {
            $scope.dropdownOpen = false;
        };

        $scope.$watch("items", function(newValue, oldValue) {
            if ($scope.autoSelect && $scope.items.length > 0) {
                if (!$scope.selectedItem || newValue !== oldValue) {
                    $scope.selectedItem = $scope.items[0];
                }
            } else {
                $scope.selectedItem = null;
            }
        }, true);
    }
]);

dropdown.directive("dropdown", [
    function () {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/dropdown/kiiri-dropdown.tpl.html",
            scope: {
                autoSelect: "=?",
                defaultText: "@?",
                disabled: "=?",
                emptyText: "@?",
                icon: '@?',
                formName: "@?",
                items: "=?",
                selectedItem: "=?"
            },
            controller: "dropdownController"
        };
    }
]);