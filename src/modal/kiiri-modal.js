/**
 * Typical modal directive. It can be controlled through the isOpen scope variable
 * and clicking on the background will close the modal. It can also be configured to
 * call a given function when the modal is closed.
 * Note: If you see your modal content flicker when the DOM is first loaded, you might need
 * to add ng-cloak to your content. Also, if you're opening this via a button, don't forget to
 * stop the click from propagating ($event.stopPropagation()). See the example in
 * examples/kiiri-modal.html
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var modal = angular.module("kiiri.angular.modal", []);

modal.controller("modalController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, 'closeCallback', angular.noop);
        Helpers.defaultValue($scope, 'isOpen', false);

        $scope.closeModal = function() {
            if (!$scope.disableOutsideClick) {
                $scope.isOpen = false;
                $scope.fadeOut = true;
                $scope.closeCallback();
            }
        };
    }
]);

modal.directive("modal", ["$window",
    function ($window) {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/modal/kiiri-modal.tpl.html",
            scope: {
                isOpen: "=",
                closeCallback: "=?",
                overflow: "=?",
                disableOutsideClick: "@?",
                disableScroll: "@?"
            },
            transclude: true,
            controller: "modalController",
            link: function ($scope, element) {
                // Ensures that the modal is centered properly on the screen
                $scope.$watch("isOpen", function(newValue, oldValue) {
                    var width = $(element).find(".modal-frame").width();
                    $(element).find(".modal-frame").css("margin-left", -1 * (width/2));

                    if (newValue !== oldValue) {
                        $scope.fadeOut = !$scope.isOpen;
                    }
                });

                $(document).bind("keydown keypress", function (event) {
                    if($scope.isOpen && (event.keyCode || event.which) === 27) { // 27 = esc key
                        $scope.$apply(function() { $scope.closeModal(); });
                        event.preventDefault();
                    }
                });

                // Forces a scrollbar reset when the window is resized
                angular.element($window).bind("resize", function () {
                    $(element).find(".kiiri-scrollbar-wrapper").mCustomScrollbar("update");
                });
            }
        };
    }
]);