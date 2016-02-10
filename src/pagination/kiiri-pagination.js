
;(function() {
    "use strict";

    /**
     * Pagination display angular directive
     *
     * @author Alex Dong (https://github.com/Kiiri)
     */

    var pagination = angular.module("kiiri.angular.pagination", []);

    pagination.controller("paginationController", ["$scope", "Helpers",
        function ($scope, Helpers) {
            Helpers.defaultValue($scope, "currentPage", 1);
            Helpers.defaultValue($scope, "pageDisplay", []);

            $scope.back = back;
            $scope.next = next;
            $scope.setPage = setPage;
            $scope.setPageDisplay = setPageDisplay;

            $scope.$watch("totalPages", setPageDisplay);
            $scope.$watch("currentPage", setPageDisplay);

            function back() {
                if ($scope.currentPage > 1) {
                    $scope.currentPage -= 1;
                }
            }

            function next() {
                if ($scope.currentPage < $scope.totalPages) {
                    $scope.currentPage += 1;
                }
            }

            function setPage(pageNumber) {
                $scope.currentPage = pageNumber;
            }

            function setPageDisplay() {
                $scope.pageDisplay = [];

                for (var i = 1; i <= $scope.totalPages; i++) {
                    if (i === 1 || i === $scope.totalPages || $scope.currentPage - 1 === i || $scope.currentPage === i || $scope.currentPage + 1 === i) {
                        $scope.pageDisplay.push(i);
                    } else if (i === 2 && $scope.currentPage === 4) {
                        $scope.pageDisplay.push(i);
                    } else if (i === $scope.totalPages - 1 && $scope.currentPage === $scope.totalPages - 3) {
                        $scope.pageDisplay.push(i);
                    }
                }
            }
        }
    ]);

    pagination.directive("pagination", [
        function () {
            return {
                restrict: "E",
                templateUrl: "src/pagination/kiiri-pagination.tpl.html",
                scope: {
                    currentPage: "=?",
                    totalPages: "="
                },
                controller: "paginationController"
            };
        }
    ]);
})();