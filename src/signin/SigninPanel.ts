/// <reference path="../../typings/tsd.d.ts" />

import { EntryPageConfig } from '../common/EntryPageConfig';
import { IEntryCommonService } from '../common/IEntryCommonService';
import { SigninViewModel } from './SigninViewModel';

interface ISigninPanelController {
    pipMedia: pip.layouts.IMediaService;

    gotoSignup(): void;
    onSignin(): void;
    gotoRecoverPassword(): void;
    onEnter(event): void;
}

class SigninPanelController implements ISigninPanelController {
    public gotoSignupDialog: Function;
    public gotoRecoverPasswordDialog: Function;
    public gotoSignupPage: any;
    public rememberDefault: boolean;
    public touchedErrorsWithHint: Function;

    constructor(
        private $scope: ng.IScope,
        private $document: ng.IDocumentService,
        private $timeout,
        public pipMedia: pip.layouts.IMediaService,
        private pipSigninViewModel: SigninViewModel,
        private pipRest: pip.rest.IRestService,
        private pipFormErrors: pip.errors.IFormErrorsService
    ) {
        "ngInject";

        pipSigninViewModel.initModel($scope);
        this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
    }

    public $postLink() {
        this.config.form = this.$scope.form;

        this.$timeout(() => {
            if (this.$document && this.$document[0]) {
                var elem = angular.element(this.$document[0].querySelector('input[type=password]:-webkit-autofill'));

                if (elem.length) {
                    elem.parent().addClass('md-input-has-value');
                }
            }
        }, 150);
    }

    public get config(): any {
        return this.pipSigninViewModel.config;
    }

    public get transaction(): any {
        return this.pipSigninViewModel.transaction;
    }

    public get showServerError(): any {
        return this.pipSigninViewModel.showServerError;
    }

    public get hideObject(): any {
        return this.pipSigninViewModel.hideObject;
    }

    public gotoSignup() {
        this.pipSigninViewModel.gotoSignup(this.gotoSignupPage, this.gotoSignupDialog);
    }

    public onSignin() {
        this.pipSigninViewModel.onSignin(this.rememberDefault);
    }

    public gotoRecoverPassword() {
        this.pipSigninViewModel.gotoRecoverPassword(this.gotoRecoverPasswordDialog);
    }

    public onServerUrlChanged() {
        this.config.onServerUrlChanged(this.config.form, this.config.selected.searchURLs);
    }

    public onChanged() {
        this.pipFormErrors.resetFormErrors(this.config.form, false);
        this.pipFormErrors.resetFieldsErrors(this.config.form, null);
        this.pipRest.serverUrl = this.config.selected.searchURLs;
        this.config.data.serverUrl = this.config.selected.searchURLs;
    }

    public onEnter(event): void {
        if (event.keyCode === 13) {
            this.onSignin();
        }
    }
}

interface ISigninBindings {
    [key: string]: any;

    gotoSignupPage: any,
    gotoSignupDialog: any,
    gotoRecoverPasswordDialog: any,
    rememberDefault: any, // set remember check
}

const SigninBindings: ISigninBindings = {
    gotoSignupPage: '=pipGotoSignupPage',
    gotoSignupDialog: '=pipGotoSignupDialog',
    gotoRecoverPasswordDialog: '=pipGotoRecoverPasswordDialog',
    rememberDefault: '=pipRemember', // set remember check
};


class SigninChanges implements ng.IOnChangesObject, ISigninBindings {
    [key: string]: ng.IChangesObject<any>;


    gotoSignupPage: ng.IChangesObject<any>;
    gotoSignupDialog: ng.IChangesObject<Function>;
    gotoRecoverPasswordDialog: ng.IChangesObject<Function>;
    rememberDefault: ng.IChangesObject<boolean>; // set remember check
}

{

    const SigninPanel: ng.IComponentOptions = {
        bindings: SigninBindings,
        templateUrl: 'signin/SigninPanel.html',
        controller: SigninPanelController
    };


    angular.module("pipSigninPanel", ['pipFocused', 'pipEntry.Strings'])
        .component('pipSigninPanel', SigninPanel);

}