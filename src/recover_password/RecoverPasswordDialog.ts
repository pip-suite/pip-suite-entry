import { RecoverPasswordViewModel } from './RecoverPasswordViewModel';
import { IResetPasswordDialogService } from '../reset_password/ResetPasswordDialog';

export interface IRecoverPasswordDialogService {
    show(params: any, successCallback?: () => void, cancelCallback?: () => void): void;
}

{
    class RecoverPasswordDialogService implements IRecoverPasswordDialogService {
        public constructor(private $mdDialog: angular.material.IDialogService) { };
        public show(params: any, successCallback?: () => void, cancelCallback?: () => void) {
            this.$mdDialog.show({
                targetEvent: params.event,
                templateUrl: 'recover_password/RecoverPasswordDialog.html',
                controller: RecoverPasswordDialogController,
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

    class RecoverPasswordDialogController {
        public goBack: any;

        constructor(
            private pipResetPasswordDialog: IResetPasswordDialogService,
            private pipRecoverPasswordViewModel: RecoverPasswordViewModel,
            private pipFormErrors : pip.errors.IFormErrorsService,
            private $mdDialog: angular.material.IDialogService
        ) {
            "ngInject";

            this.goBack = $mdDialog.cancel;
        }

        public get transaction(): any {
            return this.pipRecoverPasswordViewModel.transaction;
        }

        public get config(): any {
            return this.pipRecoverPasswordViewModel.config;
        }

        public onRecover(): void {
            this.$mdDialog.cancel;
            this.pipRecoverPasswordViewModel.onRecover(
                () => {
                    this.pipResetPasswordDialog.show({});
                }
            );
        }
    }

    angular.module('pipEntry.RecoverPasswordDialog', ['pipEntry.Common', "pipRecoverPasswordPanel",
        'pipEntry.ResetPasswordDialog'
    ])
        .service('pipRecoverPasswordDialog', RecoverPasswordDialogService);

}