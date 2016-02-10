/**
 * Opens up a popup window for oauth authentication (i.e. facebook/twitter). Expects the callback window to use window.opener
 * to call $window.oauthCallback with the oauth result. The result will then be piped into the callback function given.
 *
 * @author Alex Dong (https://github.com/Kiiri)
 */

var oauth = angular.module("kiiri.angular.oauth", []);

oauth.directive("oauth", ["$window", "$q",
    function ($window, $q) {
        "use strict";
        return {
            restrict: "A",
            scope: {
                url: "@",
                promise: "=?",
                successCallback: "=?",
                errorCallback: "=?"
            },
            link: function ($scope, element) {
                element.bind("click", function() {
                    var width = 600, height = 400;
                    var left = (screen.width / 2) - (width / 2);
                    var top = (screen.height / 2) - (2 * height / 3);
                    var features = 'menubar=no,toolbar=no,status=no,width=' + width + ',height=' + height + ',toolbar=no,left=' + left + ',top=' + top;
                    var loginWindow = $window.open($scope.url, '_blank', features);
                    loginWindow.focus();

                    // These has to be called on every click, so that $window.oauthCallback and $window.oauthErrorCallback
                    // are bound to the expected callbacks
                    $window.oauthCallback = function(response) {
                        if ($scope.promise) { $scope.promise.resolve({ url: $scope.url, data: response }); }
                        ($scope.successCallback || angular.noop)({ url: $scope.url, data: response });
                    };

                    $window.oauthErrorCallback = function(response) {
                        if ($scope.promise) { $scope.promise.reject({ url: $scope.url, data: response }); }
                        ($scope.errorCallback || angular.noop)({ url: $scope.url, data: response });
                    };
                });
            }
        };
    }
]);