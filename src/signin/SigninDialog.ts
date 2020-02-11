/// <reference path="../../typings/tsd.d.ts" />
import { IEntryService } from "../common/EntryService";

interface ISigninDialogService {
    show(params: any, successCallback ? : () => void, cancelCallback ? : () => void): void;
}

class SigninDialogService implements ISigninDialogService {

    public constructor(private $mdDialog: angular.material.IDialogService) {}
    public show(params: any, successCallback ? : () => void, cancelCallback ? : () => void) {
        this.$mdDialog.show({
                targetEvent: params.event,
                templateUrl: 'signin/SigninDialog.html',
                controller: SigninDialogController,
                locals: {
                    params: params
                },
                clickOutsideToClose: false
            })
            .then(() => {
                if (successCallback) {
                    successCallback();
                }
            }, () => {
                if (cancelCallback) {
                    cancelCallback();
                }
            });
    }
}

export interface ISigninDialogController {
    pipGotoSignupDialog: Function;
    pipGotoRecoverPasswordDialog: Function;
}

class SigninDialogController implements ISigninDialogController {
    public pipGotoSignupDialog: Function;
    public pipGotoRecoverPasswordDialog: Function;

    constructor(
        private pipSignupDialog,
        private pipRecoverPasswordDialog,
        private pipEntry: IEntryService,
    ) {
        "ngInject";
        
        //pipEntry.signout();
        this.pipGotoSignupDialog = () => {
            this.gotoSignupDialog();
        }
        this.pipGotoRecoverPasswordDialog = () => {
            this.gotoRecoverPasswordDialog();
        }
    }

    private gotoSignupDialog() {
        this.pipSignupDialog.show({});
    }

    private gotoRecoverPasswordDialog() {
        this.pipRecoverPasswordDialog.show({});
    }
}

{

    angular.module('pipEntry.SigninDialog', [
            'pipEntry.Common',
            'pipSigninPanel',
            'pipEntry.SignupDialog',
            'pipEntry.RecoverPasswordDialog'
        ])
        .service('pipSigninDialog', SigninDialogService);

}