
var uuid = angular.module("kiiri.angular.uuid", []);

uuid.directive("uuid", ["$document", "Helpers",
    function ($document, Helpers) {
        "use strict";
        return {
            restrict: "A",
            scope: {
                uuid: "=?"
            },
            link: function($scope, element, attributes) {
                $scope.uuid = Helpers.guid();
                $(element).attr("id", $scope.uuid);
            }
        };
    }
]);