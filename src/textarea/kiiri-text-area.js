/**
 * Angular customizable text area. The textarea will automatically resize depending on
 * the amount of content.
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var textarea = angular.module("kiiri.angular.textarea", ["monospaced.elastic"]);

textarea.controller("textareaController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";
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
                "value": "="
            },
            controller: "textareaController"
        };
    }
]);