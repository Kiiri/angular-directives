
var menu = angular.module("kiiri.angular.menu", []);

menu.controller("menuController", ["$log", "$scope", "Helpers",
    function ($log, $scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "width", "200px");
        Helpers.defaultValue($scope, "closeOnClick", true);

        $scope.closeMenu = function() {
            $scope.open = false;
        };

        $scope.menuItemClicked = function(item) {
            if (item.url) {
                window.location.href = item.url;
            } else if (item.click) {
                item.click();
            } else {
                $log.error("Neither URL nor click was defined for the menu item");
            }

            if ($scope.closeOnClick && $scope.closeOnClick !== "false") {
                $scope.closeMenu();
            }
        };
    }
]);

/**
 * Items should be in the following format:
 * [
 *    {
 *       name: "Load Google Search",
 *       url: "https://www.google.com"
 *    },
 *    {
 *       name: "Toggle Action",
 *       click: function() { doSomething(); }
 *    }
 * ]
 */
menu.directive("menu", [
    function () {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/menu/kiiri-menu.tpl.html",
            scope: {
                open: "=",
                items: "=",
                width: "@?",
                top: "@?",
                left: "@?",
                right: "@?",
                bottom: "@?",
                closeOnClick: "@?"
            },
            controller: "menuController"
        };
    }
]);