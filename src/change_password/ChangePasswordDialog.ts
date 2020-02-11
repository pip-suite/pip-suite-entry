import { ChangePasswordViewModel } from './ChangePasswordViewModel';

export interface IChangePasswordDialogService {
    show(params: any, successCallback?: () => void, cancelCallback?: () => void): void;
}

{
    class ChangePasswordDialogService implements IChangePasswordDialogService {
        public constructor(private $mdDialog: angular.material.IDialogService) { };
        public show(params: any, successCallback?: () => void, cancelCallback?: () => void) {
            this.$mdDialog.show({
                targetEvent: params.event,
                templateUrl: 'change_password/ChangePasswordDialog.html',
                controller: ChangePasswordDialogController,
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

    class ChangePasswordDialogController {
        public goBack: any;

        constructor(
            $mdDialog: angular.material.IDialogService,
            private pipChangePasswordViewModel: ChangePasswordViewModel
        ) {
            "ngInject";

            this.goBack = $mdDialog.cancel;
        }

        public get config(): any {
            return this.pipChangePasswordViewModel.config;
        }

        public onChange() {
            this.pipChangePasswordViewModel.onChange(() => {
                this.goBack();
            });
        }

    }

    angular.module('pipEntry.ChangePasswordDialog', ['pipEntry.Common', "pipChangePasswordPanel"])
        .service('pipChangePasswordDialog', ChangePasswordDialogService);

}