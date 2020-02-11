import './data';
import './rest';
import './common';
import { VerifyEmailController, VerifyEmailSuccessController } from './verify_email/VerifyEmail';
import { RecoverPasswordController } from './recover_password/RecoverPassword';
import { ResetPasswordController } from './reset_password/ResetPassword';
import { PostSignupController } from './post_signup/PostSignup';
import { SignoutController } from './signout/Signout';
import { ChangePasswordController } from './change_password/ChangePassword';
import { ExpireChangePasswordController } from './expire_change_password/ExpireChangePassword';


{
    const configEntryRoutes = function (
        $stateProvider: any,
        $locationProvider: ng.ILocationProvider,
        $httpProvider: ng.IHttpProvider,
        pipAuthStateProvider: pip.rest.IAuthStateProvider,
        // pipPartyDataProvider: any
    ) {
        // Switch to HTML5 routing mode
        //$locationProvider.html5Mode(true);
        // Configure module routes for all users
        $stateProvider
            .state('recover_password', {
                url: '/recover_password?server_url&email',
                auth: false,
                controllerAs: '$ctrl',
                controller: RecoverPasswordController,
                templateUrl: 'recover_password/RecoverPassword.html'
            })
            .state('change_password', {
                url: '/change_password?server_url&login',
                auth: true,
                controllerAs: '$ctrl',
                controller: ChangePasswordController,
                templateUrl: 'change_password/ChangePassword.html'
            })   
            .state('expire_change_password', {
                url: '/expire_change_password?server_url&login',
                auth: true,
                controllerAs: '$ctrl',
                controller: ExpireChangePasswordController,
                templateUrl: 'expire_change_password/ExpireChangePassword.html'
            })                      
            .state('reset_password', {
                url: '/reset_password?server_url&email&reset_code',
                auth: false,
                controller: ResetPasswordController,
                controllerAs: '$ctrl',
                templateUrl: 'reset_password/ResetPassword.html'
            })
            .state('signout', {
                url: '/signout',
                controller: SignoutController,
                auth: false
            })
            .state('post_signup', {
                url: '/post_signup?party_id',
                auth: true,
                controller: PostSignupController,
                controllerAs: '$ctrl',
                templateUrl: 'post_signup/PostSignup.html'
            })
            .state('verify_email', {
                url: '/verify_email?server_url&email&code&language',
                auth: true,
                controller: VerifyEmailController,
                controllerAs: '$ctrl',
                templateUrl: 'verify_email/VerifyEmail.html'
            })
            .state('verify_email_success', {
                url: '/verify_email_success',
                auth: true,
                controller: VerifyEmailSuccessController,
                controllerAs: '$ctrl',
                templateUrl: 'verify_email/VerifyEmailSuccess.html'
            });

        // Set default paths and states
        pipAuthStateProvider.signinState = 'signin';
        pipAuthStateProvider.signoutState = 'signout';
    }

    angular.module('pipEntry', [
        'ui.router', 'ngMessages', 'ngCookies', 'LocalStorageModule',

        'pipControls', 'pipLocations', 'pipErrors',
        'pipTranslate', 'pipCommonRest',

        'pipEntry.Strings',
        'pipEntry.Data', 'pipEntry.Rest',
        'pipEntry.Common', 'pipEntry.Signin', 'pipEntry.Signup',
        'pipEntry.PostSignup', 'pipEntry.VerifyEmail',
        'pipEntry.RecoverPassword', 'pipEntry.ResetPassword',
        'pipEntry.ResetPasswordDialog', 'pipEntry.RecoverPasswordDialog',
        'pipEntry.ChangePassword', 'pipEntry.ChangePasswordDialog',        
        'pipEntry.ExpireChangePassword', 'pipEntry.ExpireChangePasswordDialog',     
        'pipEntry.Templates'
    ])
        .config(configEntryRoutes);
}

export * from './data';