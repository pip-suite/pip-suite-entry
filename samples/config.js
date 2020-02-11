(function () {
    'use strict';

    var thisModule = angular.module('pipSampleConfig',
        ['pipEntry', 'pipNav', 'pipCommonRest']);

    // Configure application services before start
    thisModule.config(
        function ($mdIconProvider, $urlRouterProvider, pipAuthStateProvider, pipEntryProvider,
            pipBreadcrumbProvider, pipActionsProvider,
            pipTranslateProvider, pipSideNavProvider, pipNavMenuProvider, pipRestProvider) {

            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            pipSideNavProvider.type = 'sticky';
            // Set global constants
            pipBreadcrumbProvider.text = 'Entry Sample Application';
            pipActionsProvider.globalSecondaryActions = [
                { name: 'global.signout', title: 'SIGNOUT', state: 'signout' }
            ];

            // Configure REST API
            pipRestProvider.serverUrl = 'http://alpha.pipservices.net';
            $urlRouterProvider.otherwise('/welcome');

            //configure Entry
            pipEntryProvider.showIcon = true;
            pipEntryProvider.appbarIcon = 'icons:person';
            pipEntryProvider.showLanguage = true;
            pipEntryProvider.appbarTitle = 'Entry sample';
            pipEntryProvider.isPostSignup = false;
            pipEntryProvider.useEmailAsLogin = true;
            pipEntryProvider.passwordExpire = true;
            // pipEntryProvider.entryHideObject = {
            //     signup: true
            // };

            // String translations
            pipTranslateProvider.translations('en', {
                SAMPLE_APPLICATION: 'Sample application',
                ABOUT_ME: 'About Me',
                ABOUT_SYSTEM: 'About system',
                SIGNOUT: 'Sign out'
            });

            pipTranslateProvider.translations('ru', {
                SAMPLE_APPLICATION: 'Пример приложения',
                ABOUT_ME: 'Обо мне',
                ABOUT_SYSTEM: 'О системе',
                SIGNOUT: 'Выйти'
            });

            // Configure default states
            pipAuthStateProvider.unauthorizedState = 'signin';
            pipAuthStateProvider.authorizedState = 'about_me';
            pipEntryProvider.enableAvatar = false;

            // Configure navigation menu
            pipNavMenuProvider.sections = [
                {
                    links: [
                        { title: 'ABOUT_ME', url: '/about_me' },
                        { title: 'ABOUT_SYSTEM', url: '/about_system' }
                    ]
                },
                {
                    links: [
                        { title: 'VERIFY', url: '/verify_email' },
                        { title: 'SIGNOUT', url: '/signout' }
                    ]
                }
            ];

            // Set translation strings for the module
            pipTranslateProvider.translations('en', {
                'VERIFY': 'Verify'
            });
            pipTranslateProvider.translations('ru', {
                'VERIFY': 'Проверить эл. почту'
            });

        }
    );

})();

