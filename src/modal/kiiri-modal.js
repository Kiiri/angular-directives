/**
 * Typical modal directive. It can be controlled through the isOpen scope variable
 * and clicking on the background will close the modal. It can also be configured to
 * call a given function when the modal is closed.
 * Note: If you see your modal content flicker when the DOM is first loaded, you might have
 * to add ng-cloak to your content. See the example in examples/kiiri-modal.html
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var modal = angular.module('kiiri.angular.modal', []);

modal.controller('modalController', ['$scope', 'Helpers',
    function ($scope, Helpers) {
        'use strict';
        Helpers.defaultValue($scope, 'closeCallback', angular.noop);

        $scope.closeModal = function() {
            $scope.isOpen = false;
            $scope.closeCallback();
        };
    }
]);

modal.directive('modal', [
    function () {
        'use strict';
        return {
            restrict: 'AE',
            templateUrl: "src/modal/kiiri-modal.tpl.html",
            scope: {
                isOpen: '=',
                closeCallback: '=?',
                overflow: '=?'
            },
            transclude: true,
            controller: "modalController",
            link: function ($scope, element) {
                // Ensures that the modal is centered properly on the screen
                $scope.$watch('isOpen', function() {
                    var width = $(element).find(".modal-frame").width();
                    $(".modal-frame").css("margin-left", -1 * (width/2));
                });
            }
        };
    }
]);