/**
 * Angular radio button directive
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var radioButton = angular.module("kiiri.angular.radio", []);

radioButton.controller("radioButtonController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "identifier", Helpers.guid());
        Helpers.defaultValue($scope, "label", "");
        Helpers.defaultValue($scope, "value", "");
        Helpers.defaultValue($scope, "name", "");

        if ($scope.defaultSelected === "true") {
            $scope.checked = $scope.value;
        }
    }
]);

radioButton.directive("radioButton", [
    function () {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/radio-button/kiiri-radio-button.tpl.html",
            scope: {
                checked: "=",
                identifier: "=?",
                label: "@?",
                value: "@?",
                name: "@?",
                defaultSelected: "@?"
            },
            controller: "radioButtonController"
        };
    }
]);