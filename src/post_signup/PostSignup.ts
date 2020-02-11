import { PostSignupViewModel } from './PostSignupViewModel';

export class PostSignupController implements ng.IController {
	public $onInit() {}
	
    constructor(
        private $window: ng.IWindowService,
        public $party: any,
        private pipPostSignupViewModel: PostSignupViewModel
    ) {
        "ngInject";

    }

    public onPostSignupSubmit() {
        this.pipPostSignupViewModel.onPostSignupSubmit();
    }

    public get transaction(): any {
        return this.pipPostSignupViewModel.transaction;
    }
}

{
    angular.module('pipEntry.PostSignup', ['pipEntry.Common', "pipPostSignupPanel"])
        .controller('pipPostSignupController', PostSignupController);
}