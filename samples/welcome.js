(function (angular) {
    'use strict';

    var thisModule = angular.module('pipWelcome', ['ui.router', 'pipTranslate']);

    thisModule.config(
        function ($stateProvider, pipTranslateProvider) {

            // Configure module routes
            $stateProvider
                .state('welcome', {
                    url: '/welcome',
                    controller: 'pipWelcomeController',
                    templateUrl: 'welcome.html',
                    auth: false
                });

            // Set translation strings for the module
            pipTranslateProvider.translations('en', {});
            pipTranslateProvider.translations('ru', {});

        });

    thisModule.controller('pipWelcomeController',
        function ($scope, pipNavService) {
            console.log('pipWelcomeController');
            pipNavService.sidenav.hide();
            // pipNavService.appbar.showLanguage();

            // todo: use pipNavService

            // pipAppBar.hideNavIcon();
            // pipAppBar.showAppTitleText('SAMPLE_APPLICATION', false);
            // pipAppBar.showLanguage();
            // pipAppBar.showShadow();
        }
    );
})(window.angular);
