/**
 * Angular customizable input field. Although any 'type' can be specified, the only
 * types that really make sense for this directive are 'text' and 'password', and 'text'
 * is the default type. Allows the setting of a defaultValue, among other things.
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var input = angular.module("kiiri.angular.input", []);

input.controller("inputController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "fill", false);
        Helpers.defaultValue($scope, "invalid", false);
        Helpers.defaultValue($scope, "type", "text");
        Helpers.defaultValue($scope, "placeholder", "");
        Helpers.defaultValue($scope, "isDisabled", false);
        Helpers.defaultValue($scope, "stripe", "");
        Helpers.defaultValue($scope, "onEnter", angular.noop);

        if ($scope.defaultValue) {
            $scope.value = $scope.defaultValue;
        }

        $scope.clearInvalid = function() {
            $scope.invalid = false;
        };
    }
]);

input.directive("inputField", [
    function () {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/input-field/kiiri-input-field.tpl.html",
            scope: {
                defaultValue: "@?",
                isDisabled: "=?",
                fill: "=?",
                icon: "@?",
                invalid: "=?",
                name: "@?",
                placeholder: "@?",
                type: "@?",
                value: "=",
                onEnter: "&?",
                stripe: "@?",
                size: "@?"
            },
            controller: "inputController",
            link: function($scope, element, attributes) {
                // For backwards compatibility
                if ($scope.fill) {
                    $(element).addClass("fill");
                }
            }
        };
    }
]);