/**
 * Miscellaneous angular directives
 * @author Alex Dong (https://github.com/Kiiri)
 */

var app = angular.module("kiiri.angular", ["kiiri.angular.button",
                                           "kiiri.angular.checkbox",
                                           "kiiri.angular.clickoutside",
                                           "kiiri.angular.dropdown",
                                           "kiiri.angular.input",
                                           "kiiri.angular.modal",
                                           "kiiri.angular.textarea",
                                           "kiiri.angular.tooltip"]);

app.service("Helpers", function() {
    this.defaultValue = function($scope, variable, value) {
        if (!$scope[variable]) {
            $scope[variable] = value;
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
});