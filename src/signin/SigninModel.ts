import { EntryModel } from '../common/EntryModel';
import { IEntryCommonService } from "../common/IEntryCommonService";
import { IEntryService } from "../common/EntryService";
import { AuthSessionData } from '../common/EntryPageConfig';
import { SessionData } from '../data/SessionData';
import { EmailSettings } from '../data/EmailSettings';

export class SinginModel extends EntryModel {
    constructor(
        pipEntryCommon: IEntryCommonService,
        pipTransaction: pip.services.ITransactionService,
        private $rootScope: ng.IRootScopeService,
        private $location: ng.ILocationService,
        private $state: ng.ui.IStateService,
        private $injector: ng.auto.IInjectorService,
        private pipErrorPageConfigService: pip.errors.IErrorPageConfigService,
        private pipAuthState: pip.rest.IAuthStateService,
        private pipEntry: IEntryService,
        private pipFormErrors: pip.errors.IFormErrorsService,
        private pipNavService: pip.nav.INavService,
        private pipRest: pip.rest.IRestService,
    ) {
        "ngInject";
        
        super(pipEntryCommon);

        this.transaction = pipTransaction.create('entry.signin');
    }

    public init($scope) {
        this.initModel($scope);
        this.setElementVisability();
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

    private checkSupported(): boolean {
        let pipSystemInfo: any = this.$injector.has('pipSystemInfo') ? this.$injector.get('pipSystemInfo') : null;
        if (!pipSystemInfo) {
            return true;
        }

        if (!this.pipErrorPageConfigService || !this.pipErrorPageConfigService.configs || 
            !this.pipErrorPageConfigService.configs.Unsupported || !this.pipErrorPageConfigService.configs.Unsupported.Active) {

            return true;
        }

        let browser: string = pipSystemInfo.browserName;
        let version: string = pipSystemInfo.browserVersion;
        version = version.split(".")[0];

        let supported = this.pipErrorPageConfigService.configs.Unsupported.Params && this.pipErrorPageConfigService.configs.Unsupported.Params.supported ? this.pipErrorPageConfigService.configs.Unsupported.Params.supported : null;
        if (!supported) {

            return true;
        }

        if (browser && supported[browser] && version >= supported[browser]) {
            return true;
        }

        this.pipEntry.signout();
        this.$state.go(pip.errors.ErrorsUnsupportedState); 
        return false;
    }

    public gotoSignup(gotoSignupPage: any, gotoSignupDialog: any): void {
        if (!gotoSignupPage && !gotoSignupDialog) {
            this.$state.go('signup', {
                server_url: this.config.data.serverUrl,
                login: this.config.data.login
            });
            return;
        }
        if (gotoSignupPage) {
            this.$state.go(gotoSignupPage);
            return;
        }
        if (gotoSignupDialog) {
            gotoSignupDialog();
            return;
        }
    }

    public gotoRecoverPassword(gotoRecoverPasswordDialog: any): void {

        if (!gotoRecoverPasswordDialog) {
            this.$state.go('recover_password', {
                server_url: this.config.data.serverUrl,
                login: this.config.data.login
            });
            return;
        }
        if (gotoRecoverPasswordDialog) {
            gotoRecoverPasswordDialog();
            return;
        }
    }

    private inSigninComplete(data: SessionData): void {
        if (this.checkSupported()) {
            let passwordExpire: boolean = false;
            // check password change
            if (this.pipEntry.passwordExpire && data.user && data.user.change_pwd_time) {
                let expireDate = new Date(data.user.change_pwd_time);
                let nowDate = new Date();
                
                passwordExpire = expireDate.getTime() < nowDate.getTime();
            }
            if (passwordExpire) {
                this.pipAuthState.go('change_password', {
                    login: this.config.data.login,
                    server_url: this.pipRest.serverUrl
                    // redirect_to: this.pipAuthState.params.redirect_to
                });
            } else if (this.pipAuthState.params.redirect_to) {
                if (this.pipAuthState.params.toState) {
                    if (this.pipAuthState.params.toState != this.pipAuthState.signinState) {
                        this.pipAuthState.go(this.pipAuthState.params.toState, this.pipAuthState.params.toParams)
                    } else {
                        this.pipAuthState.goToAuthorized({});
                    }
                } else {
                    if (decodeURIComponent(this.pipAuthState.params.redirect_to) != '/signin') {
                        this.$location.url(decodeURIComponent(this.pipAuthState.params.redirect_to));
                    } else {
                        this.pipAuthState.goToAuthorized({});
                    }
                }
            } else {
                this.pipAuthState.goToAuthorized({});
            }

            this.pipNavService.sidenav.show();
        }
    }

    private checkEmailVerification(data: SessionData): boolean {
        return data.user && data.user.settings &&
            data.user.settings['verified_email'] && data.user.settings['verified_email'] == "true";
    }

    public onSignin(rememberDefault: boolean): void {
        if (this.config.form.$invalid) {
            this.pipFormErrors.resetFormErrors(this.config.form, true);
            return;
        }

        let transactionId: string = this.transaction.begin('ENTERING');
        if (!transactionId) return;

         this.$rootScope['isSignin'] = true;

        if (this.hideObject.remember && !!rememberDefault) {
            this.config.data.remember = true;
        }

        if (!this.pipRest.lockServerUrl) {
            this.pipRest.serverUrl = this.config.data.serverUrl;
        }

        let session: AuthSessionData = new AuthSessionData();
        this.pipRest.setHeaders({
            'session-id': undefined,
            'user-id': undefined,
            'account-id': undefined
        });

        this.pipRest.getResource('signin').call({ 
            login: this.config.data.login,
            password: this.config.data.password
        },
            (data: SessionData) => {
                this.pipFormErrors.resetFormErrors(this.config.form, false);
                if (this.transaction.aborted(transactionId)) return;

                this.pipEntry.openSession(data, this.config.data.remember);
                if (this.checkEmailVerification(data)) {
                    this.inSigninComplete(data);
                    this.transaction.end();
                } else {
                    this.pipRest.getResource('email_settings').get(
                        {
                            user_id: data.user.id
                        },
                        (setting: EmailSettings) => {
                            if (setting && setting.verified && setting.email == data.user.login) {
                                this.inSigninComplete(data);
                            } else {
                                this.pipAuthState.go('verify_email', { email: data.user.login || data.user['email'], serverUrl: this.pipRest.serverUrl });
                            }
                            this.transaction.end();
                        }, 
                        (error: any) => {
                            this.$rootScope['isSignin'] = false;
                            this.pipFormErrors.resetFormErrors(this.config.form, true);
                            this.pipFormErrors.setFormError(this.config.form, error, {
                                'WRONG_LOGIN': 'login', // Account was not found
                                'NO_LOGIN': 'login', // Missing account login
                                'LOGIN_NOT_FOUND': 'login', // Missing account login
                                'WRONG_PASSWORD': 'password', // Missing password
                                'ACCOUNT_LOCKED': 'form',
                                'act_execute': 'form', // Unknown error
                                '-1': 'form' // server not response
                            });
                            this.transaction.end({
                                message: error
                            });
                        });
                }
                
            },
            (error: any) => {
                this.$rootScope['isSignin'] = false;
                this.pipFormErrors.resetFormErrors(this.config.form, true);
                this.pipFormErrors.setFormError(this.config.form, error, {
                    'WRONG_LOGIN': 'login', // Account was not found
                    'NO_LOGIN': 'login', // Missing account login
                    'LOGIN_NOT_FOUND': 'login', // Missing account login
                    'WRONG_PASSWORD': 'password', // Missing password
                    'act_execute': 'form', // Unknown error
                    '-1': 'form' // server not response
                });
                this.transaction.end({
                    message: error
                });
            });
    }
}