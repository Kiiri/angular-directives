/**
 * Angular wrapper for existing qrcode scanner library.
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var qrcodeScanner = angular.module("kiiri.angular.qrcodescanner", []);

qrcodeScanner.controller("qrcodeScannerController", ["$scope", "Helpers",
    function ($scope, Helpers) {
        "use strict";

        Helpers.defaultValue($scope, "identifier", Helpers.guid());
        Helpers.defaultValue($scope, "onSuccess", angular.noop);
        Helpers.defaultValue($scope, "onError", angular.noop);
        Helpers.defaultValue($scope, "onVideoError", angular.noop);
        Helpers.defaultValue($scope, "paused", false);
        Helpers.defaultValue($scope, "pauseOnSuccess", true);

        $(window).ready(function() {
            $("#" + $scope.identifier).html5_qrcode(
                function success(data) {
                    $scope.$apply(function() {
                        if ($scope.paused) { return; }

                        if ($scope.pauseOnSuccess) {
                            $scope.paused = true;
                        }

                        $scope.onSuccess(data);
                    });
                },
                function error(message) {
                    $scope.$apply(function() {
                        if ($scope.paused) { return; }

                        $scope.onError(message);
                    });
                },
                function videoError(message) {
                    $scope.$apply(function() {
                        if ($scope.paused) { return; }

                        $scope.onVideoError(message);
                    });
                }
            );
        });
    }
]);

qrcodeScanner.directive("qrcodeScanner", [
    function () {
        "use strict";
        return {
            restrict: "E",
            templateUrl: "src/qrcode-scanner/kiiri-qrcode-scanner.tpl.html",
            scope: {
                onSuccess: "=?",
                onError: "=?",
                onVideoError: "=?",
                paused: "=?",
                pauseOnSuccess: "=?"
            },
            controller: "qrcodeScannerController"
        };
    }
]);