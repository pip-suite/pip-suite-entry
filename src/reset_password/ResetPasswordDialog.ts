import { ResetPasswordViewModel } from './ResetPasswordViewModel';

export interface IResetPasswordDialogService {
    show(params: any, successCallback?: () => void, cancelCallback?: () => void): void;
}

{
    class ResetPasswordDialogService implements IResetPasswordDialogService {
        public constructor(private $mdDialog: angular.material.IDialogService) { };
        public show(params: any, successCallback?: () => void, cancelCallback?: () => void) {
            this.$mdDialog.show({
                targetEvent: params.event,
                templateUrl: 'reset_password/ResetPasswordDialog.html',
                controller: ResetPasswordDialogController,
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

    class ResetPasswordDialogController {
        public goBack: any;

        constructor(
            $mdDialog: angular.material.IDialogService,
            private pipResetPasswordViewModel: ResetPasswordViewModel
        ) {
            "ngInject";

            this.goBack = $mdDialog.cancel;
        }

        public get config(): any {
            return this.pipResetPasswordViewModel.config;
        }

        public onReset() {
            this.pipResetPasswordViewModel.onReset(() => {
                this.goBack();
            });
        }

        public onCancel() {
            this.goBack();
        }

    }

    angular.module('pipEntry.ResetPasswordDialog', ['pipEntry.Common', "pipResetPasswordPanel"])
        .service('pipResetPasswordDialog', ResetPasswordDialogService);

}