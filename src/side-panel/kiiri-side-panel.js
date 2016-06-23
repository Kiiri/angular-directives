/**
 * Angular side panel directive
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var sidePanel = angular.module("kiiri.angular.sidepanel", []);

sidePanel.controller("sidePanelController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "open", false);
        Helpers.defaultValue($scope, "type", "slide");

        $scope.closePanel = function() {
            $scope.open = false;
        };
    }
]);

sidePanel.directive("sidePanel", [
    function () {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/side-panel/kiiri-side-panel.tpl.html",
            scope: {
                open: "=",
                type: "@?"
            },
            transclude: true,
            controller: "sidePanelController"
        };
    }
]);