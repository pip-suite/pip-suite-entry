(function (angular) {
    'use strict';

    var thisModule = angular.module('pipAboutSystem', ['pipTranslate']); // 'pipRest'

    thisModule.config(
        function ($stateProvider, pipTranslateProvider, pipAuthStateProvider) {

            // Configure module routes
            pipAuthStateProvider
                .state('about_system', {
                    url: '/about_system?party_id',
                    controller: 'pipAboutSystemController',
                    templateUrl: 'about_system.html',
                    auth: true
                });

            // Set translation strings for the module
            pipTranslateProvider.translations('en', {});

            pipTranslateProvider.translations('ru', {});

        });

    thisModule.controller('pipAboutSystemController',
        function ($scope, pipNavService, pipBreadcrumb) {

            pipNavService.sidenav.show();
            pipNavService.appbar.parts = {
                    logo: false,
                    icon: false,
                    title: 'breadcrumb',
                };
            pipBreadcrumb.items = [ { title: 'About System' }];

            // todo: use pipNavService

            // pipAppBar.showMenuNavIcon();
            // pipAppBar.showTitleBreadcrumb('ABOUT_SYSTEM', []);
            // pipAppBar.showLocalActions([], []);

            // pipAppBar.showShadow();
        }
    );

})(window.angular);
