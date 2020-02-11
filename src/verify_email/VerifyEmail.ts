import { IEntryCommonService } from '../common/IEntryCommonService';
import { VerifyEmailViewModel } from './VerifyEmailViewModel';
import { EntryPageConfig } from '../common/EntryPageConfig';

export class VerifyEmailController {
    public showServerError: boolean;
    public touchedErrorsWithHint: Function;
    public form: any;
    public data: any;
    public error: any;
    public serverUrl: string;
    public email: string;
    public showValidateProgress: boolean;

    constructor(
        private $scope: ng.IScope,
        private $window: ng.IWindowService,
        private pipFormErrors: pip.errors.IFormErrorsService,
        private pipVerifyEmailViewModel: VerifyEmailViewModel,
        private pipIdentity: pip.services.IIdentityService,
        private $timeout: ng.ITimeoutService
    ) {
        "ngInject";

        pipVerifyEmailViewModel.initModel(this.$scope);
        this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;

        // postlink hak
        $timeout(() => {
            this.config.form = this.$scope.form;
            if (this.config.data.code && this.config.data.email) {
                this.showValidateProgress = true;
                this.pipVerifyEmailViewModel.onVerify(
                    (data: any) => {
                        this.pipVerifyEmailViewModel.onContinue();
                    },
                    (error: any) => {
                        this.showValidateProgress = false;
                    }
                );
            } else {
                this.showValidateProgress = false;
            }
        }, 0)
    }

    public goBack(): void {
        // this.$window.history.back();
        this.pipVerifyEmailViewModel.onCancel();
    }

    public get config(): EntryPageConfig {
        return this.pipVerifyEmailViewModel.config;
    }

    public get transaction(): any {
        return this.pipVerifyEmailViewModel.transaction;
    }

    public onVerify() {
        this.pipVerifyEmailViewModel.onVerify();
    }

    public onRecover() {
        this.pipVerifyEmailViewModel.onRecover();
    }
}

export class VerifyEmailSuccessController {
    constructor(
        $scope: ng.IScope,
        private pipVerifyEmailViewModel: VerifyEmailViewModel
    ) {
        pipVerifyEmailViewModel.initModel($scope);
    }

    public onContinue() {
        this.pipVerifyEmailViewModel.onContinue();
    }
}

angular.module('pipEntry.VerifyEmail', []);