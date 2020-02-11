import { RecoverPasswordModel } from './RecoverPasswordModel';

export class RecoverPasswordViewModel {
    public model: RecoverPasswordModel;

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
        private pipTranslate: pip.services.ITranslateService,
        private pipEntryData: any,
        private pipToasts: any
    ) {
        "ngInject";

        this.model = new RecoverPasswordModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state,
            $injector, pipAuthState, pipFormErrors, pipRest, pipTranslate, pipEntryData, pipToasts);
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

    public initModel($scope): void {
        this.model.init($scope);
    }

    public onRecover(gotoReset: any): void {
        this.model.onRecover(gotoReset);
    }
}

angular.module('pipEntry.RecoverPassword')
    .service('pipRecoverPasswordViewModel', RecoverPasswordViewModel);