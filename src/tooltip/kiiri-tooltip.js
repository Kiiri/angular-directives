
var tooltip = angular.module("kiiri.angular.tooltip", []);

tooltip.controller("tooltipController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "isVisible", false);
        Helpers.defaultValue($scope, "isDisabled", false);
        Helpers.defaultValue($scope, "position", "bottom");

        $scope.showTooltip = function($event) {
            if (!$scope.isDisabled) {
                var element = $($event.currentTarget).parent();
                var $tooltipContent = $(element).find(".tooltip-content");
                $tooltipContent.css("width", $scope.tooltipWidth + 40);

                if ($scope.position === "bottom") {
                    $tooltipContent.css("left", $event.pageX - $(element).offset().left - 25);
                    $tooltipContent.css("top", $($event.currentTarget).height() + 12);
                } else if ($scope.position === "right") {
                    $tooltipContent.css("left", $($event.currentTarget).width() + 12);
                }

                $scope.isVisible = true;
            }
        };

        $scope.hideTooltip = function() {
            $scope.isVisible = false;
        };
    }
]);

tooltip.directive("tooltip", [
    function () {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/tooltip/kiiri-tooltip.tpl.html",
            scope: {
                text: "@",
                isVisible: "=?",
                isDisabled: "=?",
                position: "@?"
            },
            link: function($scope, element, attributes) {
                $scope.$watch("text", function() {
                    $scope.tooltipWidth = $(element).find(".kiiri-tooltip-length-calculator").width();
                });
            },
            transclude: true,
            controller: "tooltipController"
        };
    }
]);