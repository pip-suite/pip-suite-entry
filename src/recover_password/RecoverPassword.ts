import { IEntryCommonService } from "../common/IEntryCommonService";
import { RecoverPasswordViewModel } from './RecoverPasswordViewModel';
import { IResetPasswordDialogService } from '../reset_password/ResetPasswordDialog';

export class RecoverPasswordController {
    constructor(
        private $scope: ng.IScope,
        private pipRecoverPasswordViewModel: RecoverPasswordViewModel,
        private pipResetPasswordDialog: IResetPasswordDialogService,
        pipEntryCommon: IEntryCommonService,
        private $state: ng.ui.IStateService,
        private pipAuthState: pip.rest.IAuthStateService,
        private pipFormErrors: pip.errors.IFormErrorsService,
        private $window: ng.IWindowService
    ) {
        "ngInject";

        pipEntryCommon.configureAppBar();
    }

    public goBack(): void {
        this.$state.go(this.pipAuthState.signinState());
    }

    public get transaction(): any {
        return this.pipRecoverPasswordViewModel.transaction;
    }

    public get config(): any {
        return this.pipRecoverPasswordViewModel.config;
    }

    public onRecover(): void {
        this.pipRecoverPasswordViewModel.onRecover(
            () => {
                this.pipResetPasswordDialog.show(
                    {},
                    () => {
                        // reinit recovery panel
                        this.$scope.$broadcast('RecoverPasswordInit');
                    },
                    () => {
                        // reinit recovery panel
                        this.$scope.$broadcast('RecoverPasswordInit');
                    }
                );
            }
        );
    }
}

{
    angular.module('pipEntry.RecoverPassword', ['pipEntry.Common', 'pipRecoverPasswordPanel', 'pipEntry.ResetPasswordDialog']);
}