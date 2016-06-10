;(function() {
    "use strict";

    /**
     * Wrapper and reskinner for jQuery UI datepicker.
     *
     * @author Alex Dong (https://github.com/Kiiri)
     */

    var datepicker = angular.module("kiiri.angular.datepicker", []);

    datepicker.controller("datepickerController", ["$element", "$filter", "$scope", "$timeout", "Helpers",
        function($element, $filter, $scope, $timeout, Helpers) {
            Helpers.defaultValue($scope, "currentDate", $filter("date")(new Date(), "MM/dd/yyyy"));
            Helpers.defaultValue($scope, "currentDatepickerMonth", new Date().getMonth());
            Helpers.defaultValue($scope, "position", "left");

            $timeout(function() {
                $element.find(".kiiri-datepicker-container").datepicker({
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    onSelect: function(date) {
                        $scope.$apply(function() {
                            if (date) {
                                $scope.currentDate = date;
                                $scope.closeDatepicker();
                            }
                        });
                    },
                    onChangeMonthYear: function(year, month) {
                        $scope.selectedDatepickerMonth = month;
                    }
                });
            }, 0);

            $scope.closeDatepicker = function() {
                if ($scope.selectedDatepickerMonth === $scope.currentDatepickerMonth) {
                    $scope.isOpen = false;
                } else {
                    $scope.currentDatepickerMonth = $scope.selectedDatepickerMonth;
                }
            };

            $scope.toggleDatepicker = function() {
                $scope.isOpen = !$scope.isOpen;
            };
        }
    ]);

    datepicker.directive("datepicker", ["$timeout", "Helpers",
        function ($timeout, Helpers) {
            return {
                restrict: "E",
                controller: "datepickerController",
                scope: {
                    currentDate: "=?",
                    fill: "@?",
                    icon: "@?",
                    position: "@?"
                },
                templateUrl: "src/datepicker/kiiri-datepicker.tpl.html"
            };
        }
    ]);
})();