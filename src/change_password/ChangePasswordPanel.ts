import { EntryPageConfig } from '../common/EntryPageConfig';
import { IEntryCommonService } from "../common/IEntryCommonService";
import { ChangePasswordViewModel } from './ChangePasswordViewModel';

{
    interface IChangePasswordPanelBindings {
        [key: string]: any;


    }

    const ChangePasswordPanelBindings: IChangePasswordPanelBindings = {

    }

    class ChangePasswordPanelController {
        public touchedErrorsWithHint: Function;
        constructor(
            private $scope: ng.IScope,
            private pipFormErrors: pip.errors.IFormErrorsService,
            private pipRest: pip.rest.IRestService,
            private pipChangePasswordViewModel: ChangePasswordViewModel
        ) {
            "ngInject";

            this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
            pipChangePasswordViewModel.initModel($scope);


        }

        public $postLink(): void {
            this.config.form = this.$scope.form;
            this.config.data.password = null;
            this.config.data.passwordNew = null;
        }

        public get config(): any {
            return this.pipChangePasswordViewModel.config;
        }

        public get transaction(): any {
            return this.pipChangePasswordViewModel.transaction;
        }

        public get showServerError(): any {
            return this.pipChangePasswordViewModel.showServerError;
        }

        public get hideObject(): any {
            return this.pipChangePasswordViewModel.hideObject;
        }

        public onShowToast(message: string, type: string): void {
            this.pipChangePasswordViewModel.onShowToast(message, type);
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

        public onChangePassword() {
            this.pipFormErrors.resetFieldsErrors(this.config.form, 'passwordNew');
        }
        
        public onChangePasswordNew() {
            this.pipFormErrors.resetFieldsErrors(this.config.form, 'password');
            this.pipFormErrors.resetFieldsErrors(this.config.form, 'passwordConfirm');
        }
        
        public onChangePasswordConfirm() {
            this.pipFormErrors.resetFieldsErrors(this.config.form, 'passwordNew');
        }
    }

    const ChangePasswordPanel: ng.IComponentOptions = {
        bindings: ChangePasswordPanelBindings,
        controller: ChangePasswordPanelController,
        templateUrl: 'change_password/ChangePasswordPanel.html'
    }

    angular.module("pipChangePasswordPanel", ['pipFocused', 'pipEntry.Strings'])
        .component('pipChangePasswordPanel', ChangePasswordPanel);
}