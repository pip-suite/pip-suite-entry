import { EntryModel } from '../common/EntryModel';
import { IEntryCommonService } from "../common/IEntryCommonService";
import { IEntryDataService } from '../data/IEntryDataService';
import { IEntryService } from "../common/EntryService";

export class VerifyEmailModel extends EntryModel {
    private regestryVerifyEmailKey: string = 'verified_email';

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
        private pipEntryData: IEntryDataService,
        private pipIdentity: pip.services.IIdentityService,
        private pipEntry: IEntryService
    ) {
        "ngInject";

        super(pipEntryCommon);
        this.transaction = pipTransaction.create('entry.verify_email');
    }

    public init($scope) {
        this.initModel($scope);
        this.setElementVisability();
        this.pipEntryCommon.configureAppBar();
    }

    private setElementVisability() {
        this.hideObject.remember = new Boolean(this.hideObject.remember) == true;
        this.hideObject.title = new Boolean(this.hideObject.title) == true;
        this.hideObject.server = new Boolean(this.hideObject.server) == true;
        this.hideObject.forgotPassword = new Boolean(this.hideObject.forgotPassword) == true;
        this.hideObject.signup = new Boolean(this.hideObject.signup) == true;
        this.hideObject.hint = new Boolean(this.hideObject.hint) == true;
        this.hideObject.progress = new Boolean(this.hideObject.progress) == true;
    }

    public onVerify(successCallback?: (data: any) => void, errorCallback?: (error: any) => void) {
        if (this.config.form.$invalid) {
            this.pipFormErrors.resetFormErrors(this.config.form, true);
            return;
        }

        var transactionId = this.transaction.begin('PROCESSING');
        if (!transactionId) return;

        if (!this.pipRest.lockServerUrl) {
            this.pipRest.serverUrl = this.config.data.serverUrl;
        }

        this.pipEntryData.verifyEmail({
            login: this.config.data.login,
            email: this.config.data.email || this.config.data.login,
            code: this.config.data.code
        },
            (data) => {
                this.pipFormErrors.resetFormErrors(this.config.form, false);
                if (this.transaction.aborted(transactionId)) return;

                let userId = this.pipEntryData.getUserId();
                if (successCallback) successCallback(data);

                this.transaction.end();
                this.pipEntryData.saveSettingsKey(
                    userId,
                    this.regestryVerifyEmailKey,
                    true,
                    (data) => {
                        let identity: any = this.pipIdentity.identity;
                        if (identity && identity.user) {
                            if (!identity.user.settings) identity.user.settings = {};

                            identity.user.settings[this.regestryVerifyEmailKey] = "true";
                            this.pipIdentity.identity = identity;
                        }
                        this.onContinue();
                    },
                (error: any) => {
                    this.transaction.end(error)
                });

            },
            (error) => {
                this.transaction.end(error);
                this.pipFormErrors.resetFormErrors(this.config.form, true);
                this.pipFormErrors.setFormError(
                    this.config.form, error, {
                        'WRONG_LOGIN_EMAIL': 'login', // Account was not found
                        'NO_LOGIN_EMAIL': 'login', // Missing account login
                        'NO_EMAIL': 'login', // Missing account login
                        'INVALID_CODE': 'code', // Invalid password recovery code
                        'act_execute': 'form', // Unknown error
                        '-1': 'form' // server not response
                    }
                );
                if (errorCallback) errorCallback(error);
            }
        );
    }

    public onRecover() {
        if (!this.config.data.login) {

            return;
        }

        const tid = this.transaction.begin('PROCESSING');
        if (!tid) return;

        this.pipEntryData.requestEmailVerification({
            login: this.config.data.login
        },
            (data) => {
                if (this.transaction.aborted(tid)) return;
                this.config.data.code = null
                this.transaction.end();
            },
            (error) => {
                this.transaction.end(error);
            }
        );
    }
// todo 
    public onContinue() {
        if (this.pipAuthState.params.redirect_to) {
            this.$location.url(this.pipAuthState.params.redirect_to);
        } else {
            this.pipAuthState.goToAuthorized(this.config && this.config.data ? this.config.data : {});
        }
    }

    public onCancel() {
        this.pipEntry.signout();
        this.pipAuthState.goToUnauthorized({});
    }
}