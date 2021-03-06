/**
 * Miscellaneous angular directives
 * @author Alex Dong (https://github.com/Kiiri)
 */

var app = angular.module("kiiri.angular", ["kiiri.angular.autocomplete",
                                           "kiiri.angular.backgroundImage",
                                           "kiiri.angular.button",
                                           "kiiri.angular.checkbox",
                                           "kiiri.angular.clickoutside",
                                           "kiiri.angular.datepicker",
                                           "kiiri.angular.dropdown",
                                           "kiiri.angular.fillBar",
                                           "kiiri.angular.gallery",
                                           "kiiri.angular.input",
                                           "kiiri.angular.imageDrop",
                                           "kiiri.angular.imageinput",
                                           "kiiri.angular.imageOnload",
                                           "kiiri.angular.menu",
                                           "kiiri.angular.modal",
                                           "kiiri.angular.oauth",
                                           "kiiri.angular.pagination",
                                           "kiiri.angular.qrcodescanner",
                                           "kiiri.angular.radio",
                                           "kiiri.angular.scrollbar",
                                           "kiiri.angular.scrollposition",
                                           "kiiri.angular.selector",
                                           "kiiri.angular.sidepanel",
                                           "kiiri.angular.switch",
                                           "kiiri.angular.textarea",
                                           "kiiri.angular.timeslider",
                                           "kiiri.angular.tooltip",
                                           "kiiri.angular.tooltipAcorn",
                                           "kiiri.angular.uuid"]);

app.value("LOGGING_ENDPOINT", null);

/*
 * Extends angular's default $q service to support success and error chaining.
 * Adapted from: http://tiny/eujp44y8/stacques1679howc
 */
app.config(['$provide', function ($provide) {
    $provide.decorator('$q', ['$delegate', function ($delegate) {
        var defer = $delegate.defer;
        $delegate.defer = function () {
            var deferred = defer();
            deferred.promise.success = function (fn) {
                deferred.promise.then(function(response) {
                    fn(response);
                });
                return deferred.promise;
            };
            deferred.promise.error = function (fn) {
                deferred.promise.then(null, function(response) {
                    fn(response);
                });
                return deferred.promise;
            };
            return deferred;
        };
        return $delegate;
    }]);
}]);

app.service("Helpers", function() {
    this.defaultValue = function($scope, variable, value, func) {
        if (!$scope[variable]) {
            $scope[variable] = value;
        } else if (func) {
            $scope[variable] = func($scope[variable]);
        }
    };

    /**
    * Generates a GUID string.
    * @returns {String} The generated GUID.
    * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
    * @author Slavik Meltser (slavik@meltser.info).
    * @link http://slavik.meltser.info/?p=142
    */
    this.guid = function() {
        function _p8(s) {
            var p = (Math.random().toString(16)+"000000000").substr(2,8);
            return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    this.weekdayNumberToWeekday = function(weekdayNumber) {
        return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][weekdayNumber];
    };
});

// http://stackoverflow.com/questions/15417125/submit-form-on-pressing-enter-with-angularjs
app.directive("ngEnter", function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});

app.filter("truncate", ['$filter',
    function($filter) {
        return function(input, limit) {
            if (input) {
                if (input.length <= limit) {
                    return input;
                } else {
                    return $filter("limitTo")(input, limit).trim() + "...";
                }
            }
        };
    }
]);