/**
 * Angular directive used to show the results of the results of an ajax autocomplete
 * call. It will make the request to the given endpoint with the input field value in the
 * given 'searchField' and save the results in "results". See the example in
 * examples/kiiri-autocomplete.html
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var autocomplete = angular.module("kiiri.angular.autocomplete", ["kiiri.angular.clickoutside"]);

autocomplete.controller("autocompleteController", ["$scope", "$http", "$timeout", "Helpers",
    function ($scope, $http, $timeout, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "isResultsHidden", true);
        Helpers.defaultValue($scope, "numAutocompleting", 0);
        Helpers.defaultValue($scope, "emailClicked", angular.noop);
        Helpers.defaultValue($scope, "searchClicked", angular.noop);
        Helpers.defaultValue($scope, "initialResults", []);
        Helpers.defaultValue($scope, "isDisabled", false);
        Helpers.defaultValue($scope, "onEnter", angular.noop);
        Helpers.defaultValue($scope, "searchEnabled", false);
        Helpers.defaultValue($scope, "emailEnabled", false);
        Helpers.defaultValue($scope, "method", "POST");
        Helpers.defaultValue($scope, "placeholder", "");
        Helpers.defaultValue($scope, "results", []);

        $scope.latestResponse = new Date();

        if ($scope.initialResults) {
            if ($scope.resultField) {
                $scope.results = $scope.initialResults[$scope.resultField];
            } else {
                $scope.results = $scope.resultField;
            }
        }

        $scope.$watch("search", function() {
            if (!$scope.disabled && !$scope.isResultsHidden) {
                if ($scope.search) {
                    $scope.numAutocompleting += 1;
                    var currentDate = new Date();

                    var data = {};
                    data[$scope.searchField] = $scope.search;

                    if ($scope.authenticityToken) {
                        data.authenticity_token = $scope.authenticityToken;
                    }

                    $http({
                        method: $scope.method,
                        url: $scope.endpoint,
                        data: data
                    }).success(function(response) {
                        if (currentDate > $scope.latestResponse) {
                            if ($scope.resultField) {
                                $scope.results = response[$scope.resultField];
                            } else {
                                $scope.results = response;
                            }

                            $scope.latestResponse = currentDate;
                        }
                    }).error(function(response) {
                    }).finally(function() {
                        $scope.numAutocompleting -= 1;
                    });
                } else if ($scope.initialResults) {
                    if ($scope.resultField) {
                        $scope.results = $scope.initialResults[$scope.resultField];
                    } else {
                        $scope.results = $scope.resultField;
                    }
                }
            }
        });

        $scope.searchNotEmail = function() {
            return $scope.search.indexOf("@") === -1;
        };

        $scope.clearDisabled = function() {
            $scope.isDisabled = false;
            $scope.search = "";

            $timeout(function() {
                $("#" + $scope.identifier + " input").click();
                $("#" + $scope.identifier + " input").focus();
            }, 10);
        };

        $scope.hideResults = function() {
            $scope.isResultsHidden = true;
        };
    }
]);

autocomplete.directive("autocomplete", [
    function () {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/autocomplete/kiiri-autocomplete.tpl.html",
            scope: {
                search: '=?',
                placeholder: '@?',
                endpoint: '@',
                method: '@?',
                searchField: "@",
                resultField: "@?",
                results: '=?',
                resultClicked: '=?',
                isResultsHidden: '=?',
                emailClicked: '=?',
                searchClicked: '=?',
                initialResults: '=?',
                isDisabled: '=?',
                onEnter: '=?',
                searchEnabled: '=?',
                emailEnabled: '=?',
                authenticityToken: "@?",
                emailIcon: "@?",
                searchIcon: "@?"
            },
            transclude: true,
            controller: "autocompleteController"
        };
    }
]);

autocomplete.directive('autocompleteResult', [
    function () {
        'use strict';
        return {
            restrict: 'A',
            link: function (scope, elem, attrs, ctrl, $transclude) {
                var newScope = scope.$parent.$parent.$new();
                newScope.result = scope.$eval(attrs.result);
                $transclude(newScope, function (clone) {
                    elem.append(clone);
                });
            }
        };
    }
]);