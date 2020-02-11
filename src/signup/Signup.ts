import { IEntryCommonService } from "../common/IEntryCommonService";
import { IEntryService } from "../common/EntryService";

{
    class SignupController {
        constructor(
            pipEntryCommon: IEntryCommonService,
            pipEntry: IEntryService,
            $state: ng.ui.IStateService,
            pipAuthState: pip.rest.IAuthStateService
        ) {
            "ngInject";

            pipEntryCommon.configureAppBar();

            if (pipEntry.entryHideObject && pipEntry.entryHideObject.signup === true) {
                $state.go(pipAuthState.signinState(), {});
            }
        }
    }

    const SignupConfig = ($stateProvider, pipAuthStateProvider) => {
        $stateProvider
            .state('signup', {
                url: '/signup?name&login&server_url&redirect_to&language',
                auth: false,
                controller: SignupController,
                controllerAs: '$ctrl',
                templateUrl: 'signup/Signup.html'
            })
    }

    angular
        .module('pipEntry.Signup', [
            'pipEntry.Common',
            // 'pipEmailUnique',
            'pipSignupPanel',
            'pipPasswordMatch'
        ])
        .config(SignupConfig)
}