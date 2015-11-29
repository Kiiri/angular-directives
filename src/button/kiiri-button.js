
var button = angular.module("kiiri.angular.button", []);

button.controller("buttonController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "propagate", false);

        $scope.onClick = function($event) {
            if (!$scope.propagate) {
                $event.stopPropagation();
            }

            if (!$scope.disabled && !$scope.loading) {
                $scope.click();
            }
        };
    }
]);

button.directive("angularButton", [
    function () {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/button/kiiri-button.tpl.html",
            scope: {
                click: "&",
                loading: "=?",
                type: "@?",
                disabled: "=?",
                fill: "=?",
                link: "@?"
            },
            transclude: true,
            controller: "buttonController"
        };
    }
]);