;(function() {
    /**
     * Angular timeslider directive
     *
     * @author Alex Dong (https://github.com/Kiiri)
     */

    var timeslider = angular.module("kiiri.angular.timeslider", []);

    timeslider.controller("timesliderController", ["$element", "$filter", "$scope", "Helpers",
        function ($element, $filter, $scope, Helpers) {
            "use strict";

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

            if ($scope.step) {
                $scope.step = parseInt($scope.step);
            } else {
                $scope.step = 15;
            }

            $element.find(".kiiri-timeslider-bar").slider({
                min: 0,
                max: 1440,
                range: true,
                step: $scope.step,
                values: [momentAsMinutes($scope.currentStartTime), momentAsMinutes($scope.currentEndTime)],
                slide: function(event, ui) {
                    $scope.$apply(function() {
                        $scope.currentStartTime = minutesToMoment(ui.values[0]);
                        $scope.currentEndTime = minutesToMoment(ui.values[1]);
                    });
                }
            });

            function momentAsMinutes(moment) {
                return (moment.hour() * 60) + moment.minute();
            }

            function minutesToMoment(minutes) {
                var hours = Math.floor(minutes / 60);
                return moment({ hour: hours, minute: minutes - (hours * 60) });
            }
        }
    ]);

    timeslider.directive("timeslider", [
        function () {
            "use strict";
            return {
                restrict: "E",
                templateUrl: "src/timeslider/kiiri-timeslider.tpl.html",
                scope: {
                    startTime: "@?",
                    endTime: "@?",
                    currentStartTime: "=?",
                    currentEndTime: "=?",
                    step: "@?"
                },
                controller: "timesliderController"
            };
        }
    ]);

    // Essentially just a wrapper for moment.js
    timeslider.filter("momentTime", function() {
        return function(timeString) {
            return moment(timeString, ["hh:mm a", "hh:mm A", "hh:mma", "hh:mmA", "h:mm a", "h:mm A", "h:mma", "h:mmA",
                                       "HH:mm", "HH:mm", "HH:mm", "HH:mm", "H:mm"]);
        };
    });
})();