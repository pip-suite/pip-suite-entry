import { EntryModel } from '../common/EntryModel';
import { IEntryService } from "../common/EntryService";
import { IEntryCommonService } from "../common/IEntryCommonService";
import { IEntryDataService } from '../data/IEntryDataService';
import { AuthSessionData } from '../common/EntryPageConfig';
import { SessionData } from '../data/SessionData';
import { EmailSettings } from '../data/EmailSettings';

export class SingupModel extends EntryModel {
    private session: AuthSessionData;
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
        private pipEntry: IEntryService,
        private pipEntryData: IEntryDataService,
        private pipTranslate: pip.services.ITranslateService
    ) {
        "ngInject";

        super(pipEntryCommon);
        this.transaction = pipTransaction.create('entry.signup');
    }

    public init($scope) {
        this.initModel($scope);
        this.setElementVisability();
    }

    private setElementVisability() {
        this.hideObject.agreement = new Boolean(this.hideObject.agreement) == true;
        this.hideObject.title = new Boolean(this.hideObject.title) == true;
        this.hideObject.server = new Boolean(this.hideObject.server) == true;
        this.hideObject.passwordConfirm = new Boolean(this.hideObject.passwordConfirm) == true;
        this.hideObject.signin = new Boolean(this.hideObject.signin) == true;
        this.hideObject.hint = new Boolean(this.hideObject.hint) == true;
        this.hideObject.progress = new Boolean(this.hideObject.progress) == true;
    }

    public gotoSignin(gotoSigninPage: any, gotoSigninDialog: any) {
        if (!gotoSigninPage && !gotoSigninDialog) {
            this.$state.go(this.pipAuthState.signinState(), {});
            return;
        }
        if (gotoSigninPage) {
            this.$state.go(gotoSigninPage);
            return;
        }
        if (gotoSigninDialog) {
            gotoSigninDialog();
            return;
        }
    }

    public onSignup(gotoPostSignup: any) {
        if (this.config.form.$invalid) {
            this.pipFormErrors.resetFormErrors(this.config.form, true);
            return;
        }
        const transactionId = this.transaction.begin('PROCESSING');
        if (!transactionId) return;

        if (!this.pipRest.lockServerUrl) {
            this.pipRest.serverUrl = this.config.data.serverUrl;
        }
        // todo theme name take from parametr
        this.pipRest.getResource('signup').call({
            serverUrl: this.config.data.serverUrl,
            name: this.config.data.name,
            login: this.config.useEmailAsLogin ? this.config.data.email : this.config.data.login,
            email: this.config.data.email,
            password: this.config.data.password,
            language: this.pipTranslate.language || 'en',
            theme: 'default', // todo this.$rootScope['theme'] || 'blue' // pipTheme.theme || 'blue'
            time_zone: null
        },
            (data: SessionData) => {
                this.pipFormErrors.resetFormErrors(this.config.form, false);
                if (this.transaction.aborted(transactionId)) return;

                this.pipEntry.openSession(data);
                this.transaction.end();

                /*this.pipSettingsData.saveSettingsKey(
                    this.pipEntry.getUserId(data),
                    this.regestryVerifyEmailKey,
                    false);*/
                    this.pipEntryData.saveSettingsKey(
                        this.pipEntry.getUserId(data),
                        this.regestryVerifyEmailKey,
                        false);
                

                if (this.config.isPostSignup) {
                    if (!gotoPostSignup) {
                        this.pipAuthState.go('post_signup', {
                            party_id: this.pipEntry.getUserId(data)
                        });
                    } else {
                        gotoPostSignup(data);
                    }
                } else {
                    this.pipRest.getResource('email_settings').get(
                        {
                            user_id: data.user.id
                        },
                        (setting: EmailSettings) => {
                            if (setting && setting.verified && setting.email == data.user.login) {
                                this.pipAuthState.goToAuthorized({});
                            } else {
                                this.pipAuthState.go('verify_email', {
                                    email: data.user.login || data.user['email'], serverUrl: this.pipRest.serverUrl 
                                });
                            }
                            this.transaction.end();
                        }, 
                        (error: any) => {
                            this.pipFormErrors.resetFormErrors(this.config.form, true);
                            this.pipFormErrors.setFormError(
                                this.config.form, error, {
                                    'WRONG_LOGIN': 'signupLogin', // Account was not found
                                    'NO_LOGIN': 'signupLogin', // Missing account login
                                    'ALREADY_EXIST': 'signupLogin', // account is already exist
                                    'WRONG_PASSWORD': 'password', // Missing password
                                    'NO_EMAIL': 'userEmail',
                                    'NO_NAME': 'signupFullName',
                                    'act_execute': 'form', // Unknown error
                                    '-1': 'form' // server not response
                                }
                            );
                            this.transaction.end(error);
                        });


                }
            },
            (error: any) => {
                // todo error by login
                this.pipFormErrors.resetFormErrors(this.config.form, true);
                this.pipFormErrors.setFormError(
                    this.config.form, error, {
                        'WRONG_LOGIN': 'signupLogin', // Account was not found
                        'NO_LOGIN': 'signupLogin', // Missing account login
                        'ALREADY_EXIST': 'signupLogin', // account is already exist
                        'WRONG_PASSWORD': 'password', // Missing password
                        'NO_EMAIL': 'userEmail',
                        'NO_NAME': 'signupFullName',
                        'act_execute': 'form', // Unknown error
                        '-1': 'form' // server not response
                    }
                );
                this.transaction.end(error);
            }
        );
    };
}