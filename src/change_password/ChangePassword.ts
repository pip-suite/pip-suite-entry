import { IEntryCommonService } from "../common/IEntryCommonService";
import { ChangePasswordViewModel } from './ChangePasswordViewModel';
import { IEntryService } from "../common/EntryService";

export class ChangePasswordController {

    constructor(
        $state: ng.ui.IStateService,
        private pipChangePasswordViewModel: ChangePasswordViewModel,
        pipEntryCommon: IEntryCommonService,
        pipEntry: IEntryService,
        pipAuthState: pip.rest.IAuthStateService,
        pipSession: pip.services.ISessionService,
        private $window: ng.IWindowService
    ) {
        "ngInject";

        pipEntryCommon.configureAppBar();

        if (pipEntry.passwordExpire === false || !pipSession.isOpened()) {
            $state.go(pipAuthState.signinState(), {});
        }
    }

    public goBack() {
        this.$window.history.back();
    }

    public get config(): any {
        return this.pipChangePasswordViewModel.config;
    }

    public onChange() {
        this.pipChangePasswordViewModel.onChange();
    }
}

{
    angular.module('pipEntry.ChangePassword', ['pipEntry.Common', 'pipChangePasswordPanel']);

}