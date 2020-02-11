import { ExpireChangePasswordModel } from './ExpireChangePasswordModel';
import { IEntryService } from "../common/EntryService";

export class ExpireChangePasswordViewModel {
    public model: ExpireChangePasswordModel;

    constructor(
        pipEntryCommon: any,
        pipTransaction: pip.services.ITransactionService,
        $rootScope: ng.IRootScopeService,
        $location: ng.ILocationService,
        $state: ng.ui.IStateService,
        $injector: ng.auto.IInjectorService,
        pipAuthState: pip.rest.IAuthStateService,
        pipFormErrors: pip.errors.IFormErrorsService,
        pipRest: pip.rest.IRestService,
        pipEntry: IEntryService,
        private pipTranslate: pip.services.ITranslateService,
        private pipEntryData: any,
        private pipToasts: any
    ) {
        "ngInject";

        this.model = new ExpireChangePasswordModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state,
            $injector, pipAuthState, pipFormErrors, pipRest, pipTranslate, pipEntryData, pipEntry, pipToasts);
    }

    public get transaction(): pip.services.Transaction {
        return this.model.transaction;
    }

    public get hideObject(): any {
        return this.model.hideObject;
    }

    public get showServerError(): any {
        return this.model.showServerError;
    }

    public get config(): any {
        return this.model.config;
    }

    public initModel($scope) {
        this.model.init($scope);
    }

    public onShowToast(message, type) {
        this.model.onShowToast(message, type);
    }

    public onChange(callback?: () => void) {
        this.model.onChange(callback);
    }
}

angular.module('pipEntry.ExpireChangePassword')
    .service('pipExpireChangePasswordViewModel', ExpireChangePasswordViewModel);