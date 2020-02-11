/**
 * @file About Me page for sample application
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipAboutMe', ['pipTranslate', 'pipRest', 'pipSideNav']);

    thisModule.config(
        function (pipTranslateProvider, pipAuthStateProvider) {

            // Configure module routes
            pipAuthStateProvider
                .state('about_me', {
                    url: '/about_me',
                    controller: 'pipAboutMeController',
                    templateUrl: 'about_me.html',
                    auth: false
                });

            // Set translation strings for the module
            pipTranslateProvider.translations('en', {
                // Todo: Add here string resources for english
            });

            pipTranslateProvider.translations('ru', {
                // Todo: Add here string resources for russian
            });

        });

    thisModule.controller('pipAboutMeController',
        function ($scope, pipNavService, pipBreadcrumb, pipFormErrors, pipRest, pipEntryData) {

            pipNavService.sidenav.show();
            pipNavService.appbar.parts = {
                logo: false,
                icon: false,
                title: 'breadcrumb',
            };
            pipBreadcrumb.items = [{ title: 'About me' }];



            // $scope.data = {
            //     serverUrl: pipRest.serverUrl,
            //     login: null,
            //     email: null,
            //     password: '',
            //     remember: false,
            //     name: null,
            //     code: null
            // };

            // $scope.showServerUrl = false;

            // $scope.selected = {};

            // $scope.isEmpty = _.isEmpty;


            // $scope.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
            // $scope.showServerError = true;
            // $scope.onSignin = onSignin;
            // $scope.onEnter = onEnter;

            // return

            // function onSignin() {
            //     if ($scope.form.$invalid) {
            //         pipFormErrors.resetFormErrors($scope.form, true);
            //         return;
            //     }

            //     pipEntryData.verifyEmail({
            //         login: $scope.data.login,
            //         code: $scope.data.code
            //     },
            //         (data) => {
            //             pipFormErrors.resetFormErrors($scope.form, false);
            //             console.log('data', data);
            //         },
            //         (error) => {
                        
            //             pipFormErrors.resetFormErrors($scope.form, true);
            //             console.log('error', error, _.cloneDeep($scope.form));
            //             pipFormErrors.setFormError(
            //                 $scope.form, error, {
            //                     WRONG_LOGIN: 'login', // Account was not found
            //                     LOGIN_NOT_FOUND: 'login',
            //                     NO_LOGIN: 'login', // Missing account login
            //                     INVALID_CODE: 'code', // Invalid password recovery code
            //                 act_execute: 'form', // Unknown error
            //                     '-1': 'form' // server not response
            //                 }
            //             );
            //         }
            //     );
            // }

            // function onEnter(event) {
            //     if (event.keyCode === 13) {
            //         onSignin();
            //     }
            // }


        }
    );

})(window.angular);
