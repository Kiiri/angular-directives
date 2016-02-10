;(function() {
    "use strict";

    /**
     * Basic bar that fills up depending on the given values
     *
     * @author Alex Dong (https://github.com/Kiiri)
     */

    var fillBar = angular.module("kiiri.angular.fillBar", []);

    fillBar.controller("fillBarController", ["$scope", "Helpers",
        function($scope, Helpers) {
            Helpers.defaultValue($scope, "max", 10, function(value) { return Number(value); });
            Helpers.defaultValue($scope, "current", 10, function(value) { return Number(value); });
        }
    ]);

    fillBar.directive("fillBar", [
        function () {
            return {
                restrict: "E",
                scope: {
                    max: "@?",
                    current: "@?",
                    label: "@?"
                },
                templateUrl: "src/fill-bar/kiiri-fill-bar.tpl.html",
                controller: "fillBarController"
            };
        }
    ]);
})();