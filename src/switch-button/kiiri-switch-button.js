/**
 * Angular switch button directive
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var switchButton = angular.module("kiiri.angular.switch", []);

switchButton.controller("switchButtonController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "selectedValue", $scope.leftValue);
    }
]);

switchButton.directive("switchButton", [
    function () {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/switch-button/kiiri-switch-button.tpl.html",
            scope: {
                leftValue: "@",
                rightValue: "@",
                selectedValue: "=?"
            },
            controller: "switchButtonController",
            link: function ($scope, element) {
                $scope.$watchCollection("[leftValue, rightValue]", function() {
                    var leftWidth = element.find(".kiiri-switch-item.left-switch").width();
                    var rightWidth = element.find(".kiiri-switch-item.right-switch").width();
                    var largerWidth = Math.max(leftWidth, rightWidth);

                    element.find(".kiiri-switch-item, .kiiri-switch-slider").width(largerWidth);
                });
            }
        };
    }
]);