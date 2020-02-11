import { EntryPageConfig } from '../common/EntryPageConfig';
import { IEntryCommonService } from '../common/IEntryCommonService';
import { SignupViewModel } from './SignupViewModel';
import { IEntryDataService } from '../data/IEntryDataService';

{
    class SignupPanelController {
        public gotoSigninPage: any;
        public gotoSigninDialog: any;
        public gotoPostSignup: any;
        public touchedErrorsWithHint: Function;
        public isQuery: boolean = false;
        public error: string;

        constructor(
            private $scope: ng.IScope,
            public pipMedia: pip.layouts.IMediaService,
            public pipFormErrors: pip.errors.IFormErrorsService,
            public pipEntryData: IEntryDataService,
            private pipRest: pip.rest.IRestService,
            private pipSignupViewModel: SignupViewModel
        ) {
            "ngInject";

            this.pipSignupViewModel.initModel(this.$scope);
            this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
        }

        public $postLink() {
            this.config.form = this.$scope.form;
        }

        public get config(): any {
            return this.pipSignupViewModel.config;
        }

        public get transaction(): any {
            return this.pipSignupViewModel.transaction;
        }

        public get showServerError(): any {
            return this.pipSignupViewModel.showServerError;
        }

        public get hideObject(): any {
            return this.pipSignupViewModel.hideObject;
        }

        public gotoSignin() {
            this.pipSignupViewModel.gotoSignin(this.gotoSigninPage, this.gotoSigninDialog);
        }

        public onSignup() {
            this.pipSignupViewModel.onSignup(this.gotoPostSignup);
        }

        public onEnter(event: any) {
            if (event.keyCode === 13) {
                this.onSignup();
            }
        }

        public onChangeEmail(field: string) {
            if (!this.config.data.email) { return }
            if (this.isQuery) return;
            this.error = null;
            
            this.isQuery = true;
            this.pipEntryData.signupValidate(this.config.data.email,
                (data) => {
                    if (this.config.form && this.config.form[field]) {
                        this.config.form[field].$setValidity('emailUnique', true);
                    }
                    this.isQuery = false;
                },
                (err) => {
                    if (err && err.status == 400 && err.data && err.data.code == 'LOGIN_ALREADY_USED') {
                        if (this.config.form && this.config.form[field]) {
                            this.config.form[field].$setValidity('emailUnique', false);
                        }
                    } else {
                        let code: string = err.code || (err.data || {}).code || null;
                        if (!code && err.status) code = err.status;

                        if (code == '-1') {
                            this.error = 'ERROR_' + code;


                        } else {
                            // if undefined error for this form or code === undefined/null, go to unhandled error page
                            if (err.data && err.data.message) {
                                this.error = err.data.message;
                            } else if (err.message) {
                                this.error = err.message;
                            } else if (err.name) {
                                this.error = err.name;
                            } else this.error = err;
                        }
                    }

                    this.isQuery = false;
                });
        }

        public onServerUrlChanged() {
            this.error = null;
            this.config.onServerUrlChanged(this.config.form, this.config.selected.searchURLs);
        }
    
        public onChanged() {
            this.pipFormErrors.resetFormErrors(this.config.form, false);
            this.pipFormErrors.resetFieldsErrors(this.config.form, null);
            this.pipRest.serverUrl = this.config.selected.searchURLs;
            this.config.data.serverUrl = this.config.selected.searchURLs;
        }
        public isError(error: any): boolean {
            return error.required || error.email || error.emailUnique || error.ERROR_WRONG_LOGIN || error.ERROR_NO_LOGIN
        }
    }

    interface ISignupPanelBindings {
        [key: string]: any;

        gotoPostSignup: any;
        gotoSigninPage: any;
        gotoSigninDialog: any;
    }

    const SignupPanelBindings: ISignupPanelBindings = {
        gotoPostSignup: '=pipPostSignup',
        gotoSigninPage: '=pipGotoSigninPage',
        gotoSigninDialog: '=pipGotoSigninDialog',
    }

    class SignupPanelBindingsChanges implements ng.IOnChangesObject, ISignupPanelBindings {
        [key: string]: ng.IChangesObject<any>;

        gotoPostSignup: ng.IChangesObject<boolean>;
        gotoSigninPage: ng.IChangesObject<Function>;
        gotoSigninDialog: ng.IChangesObject<boolean>;
    }

    const SignupPanel: ng.IComponentOptions = {
        bindings: SignupPanelBindings,
        controller: SignupPanelController,
        templateUrl: 'signup/SignupPanel.html'
    }

    angular.module("pipSignupPanel", ['pipFocused', 'pipEntry.Strings'])
        .component('pipSignupPanel', SignupPanel);
}