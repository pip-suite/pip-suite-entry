import { EntryPageConfig } from '../common/EntryPageConfig';
import { IEntryCommonService } from "../common/IEntryCommonService";
import { ExpireChangePasswordViewModel } from './ExpireChangePasswordViewModel';

{
    interface IExpireChangePasswordPanelBindings {
        [key: string]: any;


    }

    const ExpireChangePasswordPanelBindings: IExpireChangePasswordPanelBindings = {

    }

    class ExpireChangePasswordPanelController {
        public touchedErrorsWithHint: Function;
        constructor(
            private $scope: ng.IScope,
            private pipFormErrors: pip.errors.IFormErrorsService,
            private pipRest: pip.rest.IRestService,
            private pipExpireChangePasswordViewModel: ExpireChangePasswordViewModel
        ) {
            "ngInject";

            this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
            pipExpireChangePasswordViewModel.initModel($scope);
   

        }

        public $postLink(): void {
            this.config.form = this.$scope.form;
            this.config.data.password = null;
            this.config.data.passwordNew = null;
        }

        public get config(): any {
            return this.pipExpireChangePasswordViewModel.config;
        }

        public get transaction(): any {
            return this.pipExpireChangePasswordViewModel.transaction;
        }

        public get showServerError(): any {
            return this.pipExpireChangePasswordViewModel.showServerError;
        }

        public get hideObject(): any {
            return this.pipExpireChangePasswordViewModel.hideObject;
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

        public onShowToast(message: string, type: string): void {
            this.pipExpireChangePasswordViewModel.onShowToast(message, type);
        }

    }

    const ExpireChangePasswordPanel: ng.IComponentOptions = {
        bindings: ExpireChangePasswordPanelBindings,
        controller: ExpireChangePasswordPanelController,
        templateUrl: 'expire_change_password/ExpireChangePasswordPanel.html'
    }

    angular.module("pipExpireChangePasswordPanel", ['pipFocused', 'pipEntry.Strings'])
        .component('pipExpireChangePasswordPanel', ExpireChangePasswordPanel);
}