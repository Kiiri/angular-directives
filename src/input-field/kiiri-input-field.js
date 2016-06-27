/**
 * Angular customizable input field. Although any 'type' can be specified, the only
 * types that really make sense for this directive are 'text' and 'password', and 'text'
 * is the default type. Allows the setting of a defaultValue, among other things.
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var input = angular.module("kiiri.angular.input", []);

input.controller("inputController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "guid", Helpers.guid());
        Helpers.defaultValue($scope, "fill", false);
        Helpers.defaultValue($scope, "invalid", false);
        Helpers.defaultValue($scope, "type", "text");
        Helpers.defaultValue($scope, "placeholder", "");
        Helpers.defaultValue($scope, "isDisabled", false);
        Helpers.defaultValue($scope, "stripe", "");
        Helpers.defaultValue($scope, "onEnter", angular.noop);

        if ($scope.defaultValue) {
            $scope.value = $scope.defaultValue;
        }

        $scope.clearInvalid = function() {
            $scope.invalid = false;
        };

        $scope.geolocate = function() {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var geolocation = new google.maps.LatLng(
                    position.coords.latitude, position.coords.longitude);
                    var circle = new google.maps.Circle({
                        center: geolocation,
                        radius: position.coords.accuracy
                    });
                    $scope.autocomplete.setBounds(circle.getBounds());
                });
            }
        };
    }
]);

input.directive("inputField", [
    function () {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/input-field/kiiri-input-field.tpl.html",
            scope: {
                defaultValue: "@?",
                isDisabled: "=?",
                fill: "=?",
                icon: "@?",
                kiiriIcon: "@?",
                invalid: "=?",
                name: "@?",
                placeholder: "@?",
                type: "@?",
                value: "=",
                onEnter: "&?",
                stripe: "@?",
                size: "@?",
                onMapSelect: "=?"
            },
            controller: "inputController",
            link: function($scope, element, attributes) {
                // For backwards compatibility
                if ($scope.fill) {
                    $(element).addClass("fill");
                }

                if ($scope.type === "address") {
                    $(element).find("input").attr("id", $scope.guid);

                    if (google) {
                        // Create the autocomplete object, restricting the search
                        // to geographical location types.
                        $scope.autocomplete = new google.maps.places.Autocomplete(document.getElementById($scope.guid), { types: ['geocode'] });
                        // When the user selects an address from the dropdown,
                        // populate the address fields in the form.
                        google.maps.event.addListener($scope.autocomplete, 'place_changed', function() {
                            ($scope.onMapSelect || angular.noop)($scope.autocomplete.getPlace());
                        });
                    }
                }
            }
        };
    }
]);