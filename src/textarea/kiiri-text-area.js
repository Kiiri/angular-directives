/**
 * Angular customizable text area. The textarea will automatically resize depending on
 * the amount of content.
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var textarea = angular.module("kiiri.angular.textarea", ["monospaced.elastic"]);

textarea.controller("textareaController", ["$scope", "$timeout", "Helpers",
    function ($scope, $timeout, Helpers) {
        "use strict";
        Helpers.defaultValue($scope, "value", "");

        // This is to fix some issues with the size calculation when the textarea
        // is initially hidden
        $timeout(function() {
            $scope.$broadcast("elastic:adjust");
        }, 0);
    }
]);

textarea.directive("textArea", [
    function () {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/textarea/kiiri-text-area.tpl.html",
            scope: {
                "fill": "=?",
                "invalid": "=?",
                "name": "@?",
                "placeholder": "@?",
                "value": "=",
                "max": "@?"
            },
            controller: "textareaController"
        };
    }
]);