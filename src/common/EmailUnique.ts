/// <reference path="../../typings/tsd.d.ts" />
import { IEntryDataService } from '../data/IEntryDataService';

{
    class LinkEmailUnique {
        private oldEmail: string;

        constructor(
            $scope: ng.IScope,
            $element: ng.IRootElementService,
            $attrs: ng.IAttributes,
            ngModel: any,
            $http: ng.IHttpService,
            pipEntryData: IEntryDataService
        ) {
            "ngInject";
            
            this.oldEmail = $attrs['pipEmailUnique'];

            $scope.$watch($attrs['ngModel'], _.throttle((newValue) => {
                const oldHint = ngModel.$validators.emailUnique;
                if (!newValue || newValue.length == 0 || this.oldEmail == newValue) {
                    ngModel.$setValidity('emailUnique', oldHint);
                    return;
                }
                
                if (!newValue) ngModel.$setValidity('emailUnique', true);

                pipEntryData.signupValidate(newValue,
                    (data) => {
                        ngModel.$setValidity('emailUnique', true);
                    },
                    (err) => {
                        ngModel.$setValidity('emailUnique', false);
                    });
            }, 500));
        }
    }

    angular.module('pipEmailUnique', ['ngResource', 'pipEntryData'])
        .directive('pipEmailUnique',
            (
                $http: ng.IHttpService,
                pipEntryData: any
            ) => {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    link: function (
                        $scope: ng.IScope,
                        $element: ng.IRootElementService,
                        $attrs: ng.IAttributes,
                        ngModel: any
                    ) {
                        new LinkEmailUnique($scope, $element, $attrs, ngModel, $http, pipEntryData);
                    }
                };
            }
        );
}