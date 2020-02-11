import { EntryModel } from '../common/EntryModel';
import { IEntryCommonService } from "../common/IEntryCommonService";
import { IEntryDataService } from '../data/IEntryDataService';

export class RecoverPasswordModel extends EntryModel {
    constructor(
        pipEntryCommon: IEntryCommonService,
        pipTransaction: pip.services.ITransactionService,
        private $rootScope: ng.IRootScopeService,
        private $location: ng.ILocationService,
        private $state: ng.ui.IStateService,
        private $injector: ng.auto.IInjectorService,
        private pipAuthState: pip.rest.IAuthStateService,
        private pipFormErrors : pip.errors.IFormErrorsService,
        private pipRest: pip.rest.IRestService,
        private pipTranslate: pip.services.ITranslateService,
        private pipEntryData: IEntryDataService,
        private pipToasts: pip.controls.IToastService
    ) {
        "ngInject";
        
        super(pipEntryCommon);
        this.transaction = pipTransaction.create('entry.signin');
    }

    public init($scope): void {
        this.initModel($scope);
        this.setElementVisability();
    }

    private setElementVisability(): void {
        this.hideObject.title = new Boolean(this.hideObject.title) == true;
        this.hideObject.subTitle1 = new Boolean(this.hideObject.subTitle1) == true;
        this.hideObject.subTitle2 = new Boolean(this.hideObject.subTitle2) == true;
        this.hideObject.server = new Boolean(this.hideObject.server) == true;
        this.hideObject.hint = new Boolean(this.hideObject.hint) == true;
        this.hideObject.progress = new Boolean(this.hideObject.progress) == true;
    }

    public onRecover(gotoReset: () => void): void {
        if (this.config.form.$invalid) {
            this.pipFormErrors.resetFormErrors(this.config.form, true);
            return;
        }
        const transactionId = this.transaction.begin('PROCESSING');
        if (!transactionId) return;
        
        if (!this.pipRest.lockServerUrl) {
            this.pipRest.serverUrl = this.config.data.serverUrl;
        }
        this.pipEntryData.recoverPassword({
                login: this.config.data.login
            },
            (data: any) => {
                this.pipFormErrors.resetFormErrors(this.config.form, true);
                if (this.transaction.aborted(transactionId)) return;

                this.transaction.end();
                if (!gotoReset) {
                    this.$state.go('reset_password', {
                        server_url: this.config.data.serverUrl,
                        login: this.config.data.login
                    });
                } else {
                    gotoReset();
                }
            },
            (error: any) => {
                this.transaction.end(error);
                this.pipFormErrors.setFormError(
                    this.config.form, error, {
                        'WRONG_LOGIN': 'login', // Account  was not found
                        'NO_LOGIN': 'login', // Missing account login
                        'LOGIN_NOT_FOUND': 'login', // Missing account login
                        'act_execute': 'form', // Unknown error
                        '-1': 'form' // server not response
                    }
                );
                this.pipFormErrors.resetFormErrors(this.config.form, true);
            }
        );
    };
}