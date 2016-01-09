
var checkbox = angular.module("kiiri.angular.checkbox", []);

checkbox.controller("checkboxController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "identifier", Helpers.guid());
        Helpers.defaultValue($scope, "isDisabled", false);
    }
]);

checkbox.directive("checkbox", [
    function () {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/checkbox/kiiri-checkbox.tpl.html",
            scope: {
                checked: "=",
                identifier: "=?",
                isDisabled: "=?"
            },
            transclude: true,
            controller: "checkboxController"
        };
    }
]);