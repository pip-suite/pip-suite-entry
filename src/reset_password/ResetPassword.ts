import { IEntryCommonService } from "../common/IEntryCommonService";
import { ResetPasswordViewModel } from './ResetPasswordViewModel';

export class ResetPasswordController {

    constructor(
        private pipResetPasswordViewModel: ResetPasswordViewModel,
        pipEntryCommon: IEntryCommonService,
        private $window: ng.IWindowService
    ) {
        "ngInject";

        pipEntryCommon.configureAppBar();
    }

    public goBack() {
        this.$window.history.back();
    }

    public get config(): any {
        return this.pipResetPasswordViewModel.config;
    }

    public onReset() {
        this.pipResetPasswordViewModel.onReset();
    }
}

{
    angular.module('pipEntry.ResetPassword', ['pipEntry.Common', 'pipResetPasswordPanel',
        'pipEmailUnique'
    ]);

}