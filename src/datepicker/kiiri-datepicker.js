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
            Helpers.defaultValue($scope, "currentDatepickerMonth", new Date().getMonth());
            Helpers.defaultValue($scope, "position", "left");

            if (!$scope.defaultBlank) {
                if ($scope.utc) {
                    Helpers.defaultValue($scope, "currentDate", $filter("date")(new Date(), "MM/dd/yyyy", "UTC"));
                } else {
                    Helpers.defaultValue($scope, "currentDate", $filter("date")(new Date(), "MM/dd/yyyy"));
                }

                if ($scope.currentDateObject) {
                    if ($scope.utc) {
                        $scope.currentDate = $filter("date")($scope.currentDateObject, "MM/dd/yyyy", "UTC");
                    } else {
                        $scope.currentDate = $filter("date")($scope.currentDateObject, "MM/dd/yyyy");
                    }
                } else {
                    $scope.currentDateObject = moment($scope.currentDate, "MM/DD/YYYY").toDate();
                }
            }

            $timeout(function() {
                var parameters = {
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    onSelect: function(date) {
                        $scope.$apply(function() {
                            if (date) {
                                $scope.currentDate = date;
                                $scope.currentDateObject = moment($scope.currentDate, "MM/DD/YYYY").toDate();
                                $scope.closeDatepicker();
                            }
                        });
                    },
                    onChangeMonthYear: function(year, month) {
                        $scope.selectedDatepickerMonth = month;
                    }
                };

                if ($scope.minDate) {
                    parameters.minDate = $scope.minDate;
                }

                if ($scope.maxDate) {
                    parameters.maxDate = $scope.maxDate;
                }

                if ($scope.beforeShowDay) {
                    parameters.beforeShowDay = $scope.beforeShowDay;
                }

                if ($scope.defaultDate) {
                    parameters.defaultDate = $scope.defaultDate;
                }

                $element.find(".kiiri-datepicker-container").datepicker(parameters);
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

            $scope.$watch("currentDate", function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    if ($scope.utc && ($filter("date")($scope.currentDateObject, "MM/dd/yyyy", "UTC") !== $scope.currentDate)) {
                        $element.find(".kiiri-datepicker-container").datepicker("setDate", moment($scope.currentDate, "MM/DD/YYYY").toDate());
                    } else if ($filter("date")($scope.currentDateObject, "MM/dd/yyyy") !== $scope.currentDate) {
                        $element.find(".kiiri-datepicker-container").datepicker("setDate", moment($scope.currentDate, "MM/DD/YYYY").toDate());
                    }
                }
            });
        }
    ]);

    datepicker.directive("datepicker", ["$timeout", "Helpers",
        function ($timeout, Helpers) {
            return {
                restrict: "E",
                controller: "datepickerController",
                scope: {
                    currentDate: "=?",
                    currentDateObject: "=?",
                    isOpen: "=?",
                    fill: "@?",
                    icon: "@?",
                    position: "@?",
                    kiiriIcon: "@?",
                    minDate: "=?",
                    maxDate: "=?",
                    beforeShowDay: "=?",
                    defaultDate: "=?",
                    placeholder: "@?",
                    defaultBlank: "@?",
                    utc: "@?"
                },
                templateUrl: "src/datepicker/kiiri-datepicker.tpl.html"
            };
        }
    ]);
})();