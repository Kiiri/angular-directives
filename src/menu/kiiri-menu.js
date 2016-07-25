
var menu = angular.module("kiiri.angular.menu", []);

menu.controller("menuController", ["$log", "$scope", "Helpers",
    function ($log, $scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "width", "200px");
        Helpers.defaultValue($scope, "closeOnClick", true);

        $scope.closeMenu = function() {
            $scope.open = false;
        };

        $scope.menuItemClicked = function(index) {
            if ($scope.items[index].disabled) {
                return;
            }

            if ($scope.selectItem) {
                for (var i = 0; i < $scope.items.length; i++) {
                    $scope.items[i].selected = (i === index);
                }

                $scope.selected = $scope.items[index];
            }

            var item = $scope.items[index];

            if (item.url) {
                window.location.href = item.url;
            } else if (item.click) {
                item.click($scope.clickTarget);
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
                closeOnClick: "@?",
                clickTarget: "=?",
                selectItem: "@?",
                selected: "=?",
                triggerId: "@?"
            },
            controller: "menuController",
            link: function($scope, element, attributes) {
                if ($scope.top) {
                    element.css("top", $scope.top);
                }

                if ($scope.left) {
                    element.css("left", $scope.left);
                }

                if ($scope.bottom) {
                    element.css("bottom", $scope.bottom);
                }

                if ($scope.right) {
                    element.css("right", $scope.right);
                }
            }
        };
    }
]);