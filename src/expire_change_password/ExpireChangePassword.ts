import { IEntryCommonService } from "../common/IEntryCommonService";
import { ExpireChangePasswordViewModel } from './ExpireChangePasswordViewModel';
import { IEntryService } from "../common/EntryService";

export class ExpireChangePasswordController {

    constructor(
        $state: ng.ui.IStateService,
        private pipExpireChangePasswordViewModel: ExpireChangePasswordViewModel,
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
        return this.pipExpireChangePasswordViewModel.config;
    }

    public onChange() {
        this.pipExpireChangePasswordViewModel.onChange();
    }
}

{
    angular.module('pipEntry.ExpireChangePassword', ['pipEntry.Common', 'pipExpireChangePasswordPanel']);

}