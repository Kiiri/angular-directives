/**
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var scrollbar = angular.module("kiiri.angular.scrollbar", []);

scrollbar.directive("scrollbar", ["Helpers", "$timeout",
    function (Helpers, $timeout) {
        "use strict";
        return {
            restrict: "A",
            templateUrl: "src/scrollbar/kiiri-scrollbar.tpl.html",
            scope: {
                maxHeight: "@?",
                disabled: "@?"
            },
            transclude: true,
            link: function($scope, element) {
                if (!$scope.disabled) {
                    $(element).addClass("kiiri-scrollbar-wrapper");
                    $(element).mCustomScrollbar();
                }
            }
        };
    }
]);