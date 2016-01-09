/**
 * Angular customizable dropdown field. Takes in a list of items in either object
 * (with keys "name" and "value") or string form. Can be set to auto select the
 * first element, use a given icon for its background, among other things. The
 * dropdown will automatically resize to fit the largest element if the width of
 * .kiiri-dropdown is not set in the CSS. See the example in examples/kiiri-dropdown.html
 *
 * Note: There is a bug right now where the dropdown element will cover up elements below it
 * unless you set the css property 'position' to 'relative'
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var dropdown = angular.module("kiiri.angular.dropdown", []);

dropdown.controller("dropdownController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "items", []);
        Helpers.defaultValue($scope, "previouslyResized", false);
        Helpers.defaultValue($scope, "hideSelected", false);
        Helpers.defaultValue($scope, "openOnHover", false);
        Helpers.defaultValue($scope, "menuHeight", 200);
        Helpers.defaultValue($scope, "inputFilter", false);

        $scope.fields = {};

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

            if ($scope.inputFilter) {
                $scope.fields.filterValue = angular.copy($scope.selectedItem);
            }
        };

        $scope.toggleDropdown = function() {
            $scope.dropdownOpen = !$scope.dropdownOpen;
        };

        $scope.closeDropdown = function() {
            $scope.dropdownOpen = false;
        };

        $scope.openDropdown = function() {
            $scope.dropdownOpen = true;
        };

        $scope.dropdownItems = function() {
            if ($scope.inputFilter && $scope.fields.filterValue) {
                return $scope.items.filter(function(item) {
                    return String(item).toLowerCase().indexOf(String($scope.fields.filterValue).toLowerCase()) !== -1;
                });
            } else {
                return $scope.items;
            }
        };

        $scope.$watch("fields.filterValue", function(newValue, oldValue) {
            if ($scope.inputFilter && newValue !== oldValue) {
                $scope.selectedItem = angular.copy($scope.fields.filterValue);
            }
        });
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
                icon: "@?",
                imageIcon: "@?",
                formName: "@?",
                items: "=?",
                linkItems: "=?",
                selectedItem: "=?",
                hideSelected: "=?",
                openOnHover: "@?",
                menuHeight: "@?",
                inputFilter: "@?"
            },
            controller: "dropdownController",
            link: function ($scope, element) {
                $scope.$watch("items", function(newValue, oldValue) {
                    if ($scope.autoSelect && $scope.items.length > 0) {
                        if (!$scope.selectedItem || newValue !== oldValue) {
                            $scope.selectedItem = $scope.items[0];
                        }
                    } else if (!(newValue !== oldValue || $scope.selectedItem)) {
                        $scope.selectedItem = null;
                    }

                    // Only resize the dropdown if it is not already set in the CSS
                    if ((!$scope.previouslyResized && $(element).find(".kiiri-dropdown").width() === 0) || $scope.previouslyResized) {
                        var dropdownWidth = $(element).find("table").width();
                        $(element).find(".kiiri-dropdown").width(dropdownWidth);
                        $scope.previouslyResized = true;
                    }

                    $(element).find(".kiiri-dropdown-items").addClass("dropdown-hidden");
                }, true);
            }
        };
    }
]);