import { EntryPageConfig } from '../common/EntryPageConfig';
import { IEntryCommonService } from "../common/IEntryCommonService";
import { RecoverPasswordViewModel } from './RecoverPasswordViewModel';

{
    interface IRecoverPasswordPanelBindings {
        [key: string]: any;

    }

    const RecoverPasswordPanelBindings: IRecoverPasswordPanelBindings = {

    }

    class RecoverPasswordPanelController {
        public touchedErrorsWithHint: Function;
        constructor(
            private $scope: ng.IScope,
            private pipFormErrors: pip.errors.IFormErrorsService,
            private pipRest: pip.rest.IRestService,
            private pipRecoverPasswordViewModel: RecoverPasswordViewModel
        ) {
            "ngInject";
            
            this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
            pipRecoverPasswordViewModel.initModel($scope);

            this.$scope.$on('RecoverPasswordInit', () => {
                this.config.form = this.$scope.form;
            });
        }

        public $postLink(): void {
            this.config.form = this.$scope.form;
            this.config.data.password = null;
            this.config.data.passwordNew = null;
        }

        public get config(): any {
            return this.pipRecoverPasswordViewModel.config;
        }

        public get transaction(): any {
            return this.pipRecoverPasswordViewModel.transaction;
        }

        public get showServerError(): any {
            return this.pipRecoverPasswordViewModel.showServerError;
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

        public get hideObject(): any {
            return this.pipRecoverPasswordViewModel.hideObject;
        }
    }

    const RecoverPasswordPanel: ng.IComponentOptions = {
        bindings: RecoverPasswordPanelBindings,
        controller: RecoverPasswordPanelController,
        templateUrl: 'recover_password/RecoverPasswordPanel.html'
    }

    angular.module("pipRecoverPasswordPanel", ['pipFocused', 'pipEntry.Strings'])
        .component('pipRecoverPasswordPanel', RecoverPasswordPanel);
}