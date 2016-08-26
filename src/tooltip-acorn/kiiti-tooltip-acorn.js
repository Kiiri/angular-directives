
var tooltipAcorn = angular.module("kiiri.angular.tooltipAcorn", []);

tooltipAcorn.controller("tooltipAcornController", ["$scope",
    function ($scope) {
        "use strict";

        $scope.showTooltip = function($event) {
            $scope.visible = true;
        };

        $scope.hideTooltip = function() {
            $scope.visible = false;
        };
    }
]);

tooltipAcorn.directive("tooltipAcorn", [
    function () {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/tooltip-acorn/kiiri-tooltip-acorn.tpl.html",
            scope: {
                position: "@?",
                text: "@"
            },
            controller: "tooltipAcornController"
        };
    }
]);