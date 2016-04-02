/**
 * Directive used to automatically call a given function when a user clicks outside
 * of the assigned element. Mainly used in conjunction with modals and togglable panels.
 * Note: If you link this to some panel that's opened via a button, don't forget to
 * stop the click from propagating ($event.stopPropagation()), else the panel will be
 * immediately closed.
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var clickOutside = angular.module("kiiri.angular.clickoutside", []);

clickOutside.directive("clickoutside", ["$document", "Helpers",
    function ($document, Helpers) {
        "use strict";
        return {
            restrict: "A",
            scope: {
                onClickOutside: "=?",
                isEnabled: "=?",
                clickoutside: "&?"
            },
            link: function($scope, element, attributes) {
                // If the element has an id, hook onto that id, else generate a guid to use as an id for the element
                if (attributes.id) {
                    $scope.mainElementId = attributes.id;
                } else {
                    $scope.mainElementId = Helpers.guid();
                    $(element).attr("id", $scope.mainElementId);
                }

                var onClick = function(clickEvent) {
                    // If the directive is disabled, just return
                    if ($scope.isEnabled === false) {
                        return;
                    }

                    // The click event has no target, so just return
                    if (!clickEvent || !clickEvent.target) {
                        return;
                    }

                    // Loop from the clicked element all the way up until the top of the dom hierarchy
                    for (var element = clickEvent.target; element; element = element.parentNode) {
                        var id = element.id;

                        // The click event is inside the container, so just return
                        if (id !== undefined && id === $scope.mainElementId) {
                            return;
                        }
                    }

                    $scope.$apply(function() {
                        if ($scope.onClickOutside) {
                            $scope.onClickOutside();
                        }

                        if ($scope.clickoutside) {
                            $scope.clickoutside();
                        }
                    });
                };

                $document.on("click", onClick);

                // If the directive is destroyed, remove the click handler as well
                $scope.$on("$destroy", function() {
                    $document.off("click", onClick);
                });
            }
        };
    }
]);