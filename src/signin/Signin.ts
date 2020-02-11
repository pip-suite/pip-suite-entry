/// <reference path="../../typings/tsd.d.ts" />
import { IEntryService } from "../common/EntryService";
import { IEntryCommonService } from "../common/IEntryCommonService";

export const isSignin = 'isSignin';

{
    class SigninController {
        public fixedServerUrl: boolean = false;
        constructor(
            $scope: ng.IScope,
            $rootScope: ng.IRootScopeService,
            pipEntry: IEntryService,
            pipEntryCommon: IEntryCommonService,
            pipSession: pip.services.ISessionService
        ) {
            "ngIngect";

            pipEntryCommon.configureAppBar();
            // if (!$rootScope[isSignin] && pipSession.isOpened()) { // ??
            //     pipEntry.signout(); // hack for set language
            // }
            $rootScope[isSignin] = false;
            this.fixedServerUrl = $scope['fixedServerUrl'];
        }
    }

    const SigninConfig = ($stateProvider, pipAuthStateProvider) => {

        $stateProvider
            .state('signin', {
                url: '/signin?login&server_url&redirect_to&language&email',
                auth: false,
                controller: SigninController,
                controllerAs: '$ctrl',
                templateUrl: 'signin/Signin.html'
            })
        pipAuthStateProvider.signinState = 'signin';
    }

    angular.module('pipEntry.Signin', ['pipEntry.Common', "pipSigninPanel"])
        .config(SigninConfig)

}