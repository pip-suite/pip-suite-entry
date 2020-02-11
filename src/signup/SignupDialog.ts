import { IEntryService } from "../common/EntryService";

interface ISignupDialogService {
    show(params: any, successCallback ? : () => void, cancelCallback ? : () => void): void;
}

class SignupDialogService implements ISignupDialogService {

    public constructor(private $mdDialog: angular.material.IDialogService) {}
    public show(params: any, successCallback ? : () => void, cancelCallback ? : () => void) {
        this.$mdDialog.show({
                targetEvent: params.event,
                templateUrl: 'signup/SignupDialog.html',
                controller: SignupDialogController,
                controllerAs: '$ctrl',
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

interface ISignupDialogController {
    pipGotoSigninDialog: Function;
    pipGotoPostSignupDialog: Function;
}

class SignupDialogController implements ISignupDialogController {
    public pipGotoSigninDialog: Function;
    public pipGotoPostSignupDialog: Function;

    constructor(
        private pipSigninDialog,
        private pipPostSignupDialog,
        private pipEntry: IEntryService,
    ) {
        "ngInject";
        
        pipEntry.signout();
        this.pipGotoSigninDialog = () => {
            this.gotoSigninDialog();
        }
        this.pipGotoPostSignupDialog = (user) => {
            this.gotoPostSignupDialog(user);
        }
    }

    private gotoSigninDialog() {
        this.pipSigninDialog.show({});
    }

    private gotoPostSignupDialog(user) {
        this.pipPostSignupDialog.show({
            $party: user
        });
    }
}

{

    angular.module('pipEntry.SignupDialog', [
            'pipEntry.Common',
            "pipSignupPanel",
            'pipEntry.SigninDialog',
            'pipEntry.PostSignupDialog'
        ])
        .service('pipSignupDialog', SignupDialogService)
}