import { ExpireChangePasswordViewModel } from './ExpireChangePasswordViewModel';

export interface IExpireChangePasswordDialogService {
    show(params: any, successCallback?: () => void, cancelCallback?: () => void): void;
}

{
    class ExpireChangePasswordDialogService implements IExpireChangePasswordDialogService {
        public constructor(private $mdDialog: angular.material.IDialogService) { };
        public show(params: any, successCallback?: () => void, cancelCallback?: () => void) {
            this.$mdDialog.show({
                targetEvent: params.event,
                templateUrl: 'expire_change_password/ExpireChangePasswordDialog.html',
                controller: ExpireChangePasswordDialogController,
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

    class ExpireChangePasswordDialogController {
        public goBack: any;

        constructor(
            $mdDialog: angular.material.IDialogService,
            private pipExpireChangePasswordViewModel: ExpireChangePasswordViewModel
        ) {
            "ngInject";

            this.goBack = $mdDialog.cancel;
        }

        public get config(): any {
            return this.pipExpireChangePasswordViewModel.config;
        }

        public onChange() {
            this.pipExpireChangePasswordViewModel.onChange(() => {
                this.goBack();
            });
        }

    }

    angular.module('pipEntry.ExpireChangePasswordDialog', ['pipEntry.Common', "pipExpireChangePasswordPanel"])
        .service('pipExpireChangePasswordDialog', ExpireChangePasswordDialogService);

}