;(function() {
    /**
     * Angular timepicker directive
     *
     * @author Alex Dong (https://github.com/Kiiri)
     */

    var timepicker = angular.module("kiiri.angular.timepicker", []);

    timepicker.controller("timepickerController", ["$element", "$filter", "$scope", "Helpers",
        function ($element, $filter, $scope, Helpers) {
            "use strict";

            Helpers.defaultValue($scope, "maxStartLeft", 12.5 * 24);
            Helpers.defaultValue($scope, "minEndLeft", 12.5 * 24);

            if ($scope.startTime) {
                $scope.currentStartTime = $filter("momentTime")($scope.startTime);
            } else {
                $scope.currentStartTime = $filter("momentTime")("12:00AM");
            }

            if ($scope.endTime) {
                $scope.currentEndTime = $filter("momentTime")($scope.endTime);
            } else {
                $scope.currentEndTime = $filter("momentTime")("12:00AM");
            }

            // Update the cursor positions with grid set to [12.5, 12.5]
            $element.find(".kiiri-timepicker-start-time").css("left", Number($scope.currentStartTime.format("H")) * 12.5);
            $element.find(".kiiri-timepicker-end-time").css("left", Number($scope.currentEndTime.format("H")) * 12.5);

            updateColoredBar();

            $scope.$watch("currentStartPosition", function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    var time = $scope.currentStartPosition.left / 12.5;
                    $scope.currentStartTime = $filter("momentTime")(time + ":00");
                    $scope.minEndLeft = 12.5 * (time + 1) + 37.5;
                    updateColoredBar();
                }
            });

            $scope.$watch("currentEndPosition", function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    var time = ($scope.currentEndPosition.left - 37.5) / 12.5;
                    $scope.currentEndTime = $filter("momentTime")(time + ":00");
                    $scope.maxStartLeft = 12.5 * (time - 1);
                    updateColoredBar();
                }
            });

            function updateColoredBar() {
                var startLeft = Number($element.find(".kiiri-timepicker-start-time").css("left").replace("px", ""));
                var endLeft = Number($element.find(".kiiri-timepicker-end-time").css("left").replace("px", ""));
                var coloredBar = $element.find(".kiiri-timepicker-colored-bar");
                coloredBar.css("left", startLeft);
                coloredBar.css("width", endLeft - startLeft);
            }
        }
    ]);

    timepicker.directive("timepicker", [
        function () {
            "use strict";
            return {
                restrict: "E",
                templateUrl: "src/timepicker/kiiri-timepicker.tpl.html",
                scope: {
                    startTime: "@?",
                    endTime: "@?",
                    currentStartTime: "=?",
                    currentEndTime: "=?"
                },
                controller: "timepickerController"
            };
        }
    ]);

    // Essentially just a wrapper for moment.js
    timepicker.filter("momentTime", function() {
        return function(timeString) {
            return moment(timeString, ["hh:mm a", "hh:mm A", "hh:mma", "hh:mmA", "h:mm a", "h:mm A", "h:mma", "h:mmA",
                                       "HH:mm", "HH:mm", "HH:mm", "HH:mm", "H:mm"]);
        };
    });
})();