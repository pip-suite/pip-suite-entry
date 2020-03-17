((angular) => {
    var thisModule = angular.module('pipSample', [
        // 3rd Party Modules
        'ui.router', 'ui.utils', 'ngResource', 'ngAria', 'ngCookies', 'ngSanitize', 'ngMessages',
        'ngMaterial', 'wu.masonry', 'LocalStorageModule', 'ngAnimate',
        // Application Configuration must go first
        'pipSampleConfig',
        // Modules from WebUI Framework
         'pipControls', 'pipLayout', 'pipNav', 'pipTheme', 'pipTheme.Default',
        'pipEntry', 'pipCommonRest', 
        // Sample Application Modules
        'pipWelcome', 'pipAboutMe', 'pipAboutSystem'
    ]);

    thisModule.controller('pipSampleController',
        function ($scope, $rootScope, pipNavService) {
            // Main sample controller code here...

        }
    );

})(window.angular);

