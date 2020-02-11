import { IEntryCommonService } from "../common/IEntryCommonService";
import { PostSignupViewModel } from './PostSignupViewModel';
import { GENDER } from '../data/Enums';

{
    interface IPostSignupPanelBindings {
        [key: string]: any;

        $party: any;
    }

    const PostSignupPanelBindings: IPostSignupPanelBindings = {
        $party: '=pipParty',
    }

    class PostSignupPanelController {
        public $party: any;
        public picture: any;
        public touchedErrorsWithHint: Function;

        constructor(
            private $scope: ng.IScope,
            pipTranslate: pip.services.ITranslateService,
            pipFormErrors: pip.errors.IFormErrorsService,
            private pipPostSignupViewModel: PostSignupViewModel
        ) {
             "ngInject";

            pipPostSignupViewModel.initModel($scope);
            this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
            this.config.data = {
                id: this.$party.id,
                name: this.$party.name,
                email: this.$party.email,
                about: this.$party.about,
                language: pipTranslate.language,
                birthday: this.$party.birthday,
                gender: this.$party.gender || GENDER.NOT_SPECIFIED,
                location: this.$party.location
            };
        }

        public $postLink() {
            this.config.form = this.$scope.form;
        }

        public get config(): any {
            return this.pipPostSignupViewModel.config;
        }

        public get transaction(): any {
            return this.pipPostSignupViewModel.transaction;
        }

        public get showServerError(): any {
            return this.pipPostSignupViewModel.showServerError;
        }

        public get hideObject(): any {
            return this.pipPostSignupViewModel.hideObject;
        }

        public onPictureChanged($control) {
            if (!this.config.enableAvatar) { return }

            if (this.picture)
                this.picture.save(
                    // Success callback
                    function () {},
                    // Error callback
                    function (error) {
                    }
                );
        }

        public onPictureCreated($event) {
            this.picture = $event.sender;
        }
    }

    const PostSignupPanel: ng.IComponentOptions = {
        bindings: PostSignupPanelBindings,
        templateUrl: 'post_signup/PostSignupPanel.html',
        controller: PostSignupPanelController
    }

    angular.module("pipPostSignupPanel", ['pipFocused', 'pipEntry.Strings'])
        .component('pipPostSignupPanel', PostSignupPanel);
}