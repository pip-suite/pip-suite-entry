import { EntryModel } from '../common/EntryModel';
import { IEntryCommonService } from "../common/IEntryCommonService";
import { IEntryDataService } from '../data/IEntryDataService';
import { IEntryService } from "../common/EntryService";

export class ExpireChangePasswordModel extends EntryModel {
    constructor(
        pipEntryCommon: IEntryCommonService,
        pipTransaction: pip.services.ITransactionService,
        private $rootScope: ng.IRootScopeService,
        private $location: ng.ILocationService,
        private $state: ng.ui.IStateService,
        private $injector: ng.auto.IInjectorService,
        private pipAuthState: pip.rest.IAuthStateService,
        private pipFormErrors: pip.errors.IFormErrorsService,
        private pipRest: pip.rest.IRestService,
        private pipTranslate: pip.services.ITranslateService,
        private pipEntryData: IEntryDataService,
        private pipEntry: IEntryService,
        private pipToasts: pip.controls.IToastService
    ) {
        "ngInject";

        super(pipEntryCommon);
        this.transaction = pipTransaction.create('entry.expire_change_password');

    }

    public init($scope): void {
        this.initModel($scope);
        this.setElementVisability();
    }

    private setElementVisability(): void {
        this.hideObject.subTitle = new Boolean(this.hideObject.subTitle) == true;
        this.hideObject.title = new Boolean(this.hideObject.title) == true;
        this.hideObject.server = new Boolean(this.hideObject.server) == true;
        this.hideObject.hint = new Boolean(this.hideObject.hint) == true;
        this.hideObject.progress = new Boolean(this.hideObject.progress) == true;
    }

    public onShowToast(message: string, type: string): void {
        if (!message) return;
        message = this.pipTranslate.translate(message);
        type = type || 'message';

        if (type == 'message') {
            this.pipToasts.showMessage(message, null, null, null);
            return;
        }
        if (type == 'error') {
            this.pipToasts.showError(message, null, null, null, null);
            return;
        }
    }

    public onChange(callback?: () => void): void {
        if (this.config.form.$invalid) {
            this.pipFormErrors.resetFormErrors(this.config.form, true);

            return;
        }

        const transactionId = this.transaction.begin('PROCESSING');
        if (!transactionId) return;
        if (!this.pipRest.lockServerUrl) {
            this.pipRest.serverUrl = this.config.data.serverUrl;
        }

        this.pipEntryData.expireChangePassword({
            login: this.config.data.login,
            old_password: this.config.data.password,
            new_password: this.config.data.passwordNew,
            user_id: this.pipEntryData.getUserId()
        },
            (data: any) => {
                this.pipFormErrors.resetFormErrors(this.config.form, false);
                if (this.transaction.aborted(transactionId)) return;

                const message = String() + 'EXPIRE_CHANGE_PWD_SUCCESS_TEXT';
                this.onShowToast(message, 'message');
                this.transaction.end();
                if (callback) callback();
                this.pipEntry.signout(
                    () => {
                        this.$state.go('signin', {
                            server_url: this.config.data.serverUrl,
                            login: this.config.data.login
                        });
                    }
                );

            },
            (error: any) => {
                this.transaction.end(error);
                this.pipFormErrors.resetFormErrors(this.config.form, true);
                this.pipFormErrors.setFormError(
                    this.config.form, error, {
                        'NO_LOGIN': 'login', // Missing account login
                        'WRONG_LOGIN': 'login', // Account  was not found
                        'LOGIN_NOT_FOUND': 'login', // Account  was not found
                        'WRONG_PASSWORD': 'password', // Invalid password
                        'act_execute': 'form', // Unknown error
                        '-1': 'form' // server not response
                    }
                );
            }
        );
    }

}