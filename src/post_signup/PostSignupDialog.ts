import { PostSignupViewModel } from './PostSignupViewModel';

export interface IPostSignupDialogService {
    show(params: any, successCallback?: () => void, cancelCallback?: () => void): void;
}

{
    class PostSignupDialogService implements IPostSignupDialogService {
        public constructor(private $mdDialog: angular.material.IDialogService) { };
        public show(params: any, successCallback?: () => void, cancelCallback?: () => void) {
            this.$mdDialog.show({
                targetEvent: params.event,
                templateUrl: 'post_signup/PostSignupDialog.html',
                controller: PostSignupDialogController,
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

    class PostSignupDialogController {
        public $party: any;
        public goBack: any;

        constructor(
            $mdDialog: angular.material.IDialogService,
            params: any,
            private pipPostSignupViewModel: PostSignupViewModel
        ) {
            "ngInject";

            this.goBack = $mdDialog.cancel;
            this.$party = params.$party;
        }

        public onPostSignupSubmit() {
            this.pipPostSignupViewModel.onPostSignupSubmit(() => {
                this.goBack();
            });
        }

        public get transaction() {
            return this.pipPostSignupViewModel.transaction;
        }
    }

    angular.module('pipEntry.PostSignupDialog', ['pipEntry.Common', "pipPostSignupPanel"])
        .service('pipPostSignupDialog', PostSignupDialogService);

}