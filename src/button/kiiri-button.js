
var button = angular.module("kiiri.angular.button", []);

button.controller("buttonController", ["$http", "$scope", "Helpers", "LOGGING_ENDPOINT",
    function ($http, $scope, Helpers, LOGGING_ENDPOINT) {
        "use strict";

        Helpers.defaultValue($scope, "round", "true");
        Helpers.defaultValue($scope, "propagate", false);
        Helpers.defaultValue($scope, "slideHover", false);

        $scope.onClick = function($event) {
            if ($event && !$scope.propagate) {
                $event.stopPropagation();
            }

            if (!$scope.disabled && !$scope.loading) {
                $scope.click();
                $scope.logRequest();
            }
        };

        $scope.logRequest = function() {
            if (LOGGING_ENDPOINT) {
                if ($scope.log) {
                    $http.post(LOGGING_ENDPOINT, { type: "ButtonClick", name: $scope.log, details: $scope.logDetails });
                } else {
                    $http.post(LOGGING_ENDPOINT, { type: "ButtonClick", name: "ButtonClick", details: { url: window.location.href } });
                }
            }
        };

        $scope.buttonHover = function() {
            $scope.buttonHovering = true;

            if ($scope.slideHover) {
                $scope.sliding = true;
            }
        };

        $scope.buttonLeave = function() {
            $scope.buttonHovering = false;

            if ($scope.slideHover) {
                $scope.sliding = false;
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
                link: "@?",
                propagate: "@?",
                size: "@?",
                round: "@?",
                typeOnHover: "@?",
                buttonHovering: "=?",
                log: "@?",
                logDetails: "&?"
            },
            transclude: true,
            controller: "buttonController",
            link: function($scope, element, attributes) {
                // For backwards compatibility
                if ($scope.fill) {
                    $(element).addClass("fill");
                }
            }
        };
    }
]);