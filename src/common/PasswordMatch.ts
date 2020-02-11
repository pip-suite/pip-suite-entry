/// <reference path="../../typings/tsd.d.ts" />

function compareOldPassword($parse: ng.IParseService): ng.IDirective {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelCtrl) {
            ngModelCtrl['$validators'].ERROR_compareTo = function (modelValue, viewValue) {
                if (ngModelCtrl['$isEmpty'](modelValue)) {
                    return true;
                }

                let otherModelValue;
                let otherModelValueGetter = $parse(attrs.compareTo);

                if (!modelValue || !!otherModelValue) return true;

                if (otherModelValueGetter) {
                    otherModelValue = otherModelValueGetter(scope);

                    return modelValue != otherModelValue;
                } else {
                    return true;
                }
            }
        }
    };
}
function compareNewPassword($parse: ng.IParseService): ng.IDirective {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelCtrl) {
            ngModelCtrl['$validators'].ERROR_compareTo = function (modelValue, viewValue) {
                if (ngModelCtrl['$isEmpty'](modelValue)) {
                    return true;
                }
                let otherModelValue;
                let otherModelValueGetter = $parse(attrs.compareTo1);

                if (!modelValue || !!otherModelValue) return true;

                if (otherModelValueGetter) {
                    otherModelValue = otherModelValueGetter(scope);

                    return modelValue != otherModelValue;
                } else {
                    return true;
                }
            }
        }
    };
}
function comparePasswordMatch($parse: ng.IParseService): ng.IDirective {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelCtrl) {
            ngModelCtrl['$validators'].ERROR_compareTo = function (modelValue, viewValue) {
                if (ngModelCtrl['$isEmpty'](modelValue)) {
                    return true;
                }
                let otherModelValue;
                let otherModelValueGetter = $parse(attrs.compareTo2);

                if (!modelValue || !!otherModelValue) return true;

                if (otherModelValueGetter) {
                    otherModelValue = otherModelValueGetter(scope);

                    return modelValue == otherModelValue;
                } else {
                    return true;
                }
            }
        }
    };
}
angular.module('pipPasswordMatch', [])
    .directive('pipCompareOldPassword', compareOldPassword)
    .directive('pipCompareNewPassword', compareNewPassword)
    .directive('pipComparePasswordMatch', comparePasswordMatch);