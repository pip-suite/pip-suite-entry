import { EntryPageConfig } from '../common/EntryPageConfig';
import { IEntryCommonService } from "../common/IEntryCommonService";
import { ResetPasswordViewModel } from './ResetPasswordViewModel';

{
    interface IResetPasswordPanelBindings {
        [key: string]: any;


    }

    const ResetPasswordPanelBindings: IResetPasswordPanelBindings = {

    }

    class ResetPasswordPanelController {
        public touchedErrorsWithHint: Function;
        constructor(
            private $scope: ng.IScope,
            private pipFormErrors: pip.errors.IFormErrorsService,
            private pipRest: pip.rest.IRestService,
            private pipResetPasswordViewModel: ResetPasswordViewModel
        ) {
            "ngInject";

            this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
            pipResetPasswordViewModel.initModel($scope);
     
        }

        public $postLink(): void {
            this.config.form = this.$scope.form;
            this.config.data.password = null;
            this.config.data.passwordNew = null;
        }

        public get config(): any {
            return this.pipResetPasswordViewModel.config;
        }

        public get transaction(): any {
            return this.pipResetPasswordViewModel.transaction;
        }

        public get showServerError(): any {
            return this.pipResetPasswordViewModel.showServerError;
        }

        public get hideObject(): any {
            return this.pipResetPasswordViewModel.hideObject;
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
            this.pipResetPasswordViewModel.onShowToast(message, type);
        }

    }

    const ResetPasswordPanel: ng.IComponentOptions = {
        bindings: ResetPasswordPanelBindings,
        controller: ResetPasswordPanelController,
        templateUrl: 'reset_password/ResetPasswordPanel.html'
    }

    angular.module("pipResetPasswordPanel", ['pipFocused', 'pipEntry.Strings'])
        .component('pipResetPasswordPanel', ResetPasswordPanel);
}