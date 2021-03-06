
var tooltip = angular.module("kiiri.angular.tooltip", []);

tooltip.controller("tooltipController", ["$element", "$sce", "$scope", "Helpers",
    function ($element, $sce, $scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "isVisible", false);
        Helpers.defaultValue($scope, "isDisabled", false);
        Helpers.defaultValue($scope, "position", "bottom");

        $scope.$sce = $sce;

        $scope.showTooltip = function($event) {
            if (!$scope.isDisabled && $scope.text) {
                var calculatorElement = $element.find(".kiiri-tooltip-length-calculator");
                $scope.tooltipWidth = calculatorElement.width();
                var $tooltipContent = $element.find(".tooltip-content");
                $tooltipContent.css("width", $scope.tooltipWidth + 40);

                if ($scope.position === "bottom") {
                    $tooltipContent.css("left", $event.pageX - $element.offset().left - 25);
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
                position: "@?",
                fill: "=?",
                icon: "@?"
            },
            link: function($scope, element, attributes) {
                $scope.$watch("text", function() {
                    var calculatorElement = $(element).find(".kiiri-tooltip-length-calculator");
                    $scope.tooltipWidth = calculatorElement.width();
                });

                // For backwards compatibility
                if ($scope.fill) {
                    $(element).addClass("fill");
                }
            },
            transclude: true,
            controller: "tooltipController"
        };
    }
]);