import { VerifyEmailModel } from './VerifyEmailModel';
import { IEntryDataService } from '../data/IEntryDataService';
import { IEntryService } from "../common/EntryService";

export class VerifyEmailViewModel {
    public model: VerifyEmailModel;

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
        pipEntryData: IEntryDataService,
        pipIdentity: pip.services.IIdentityService,
        pipEntry: IEntryService
    ) {
        "ngInject";

        this.model = new VerifyEmailModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state,
            $injector, pipAuthState, pipFormErrors, pipRest, pipEntryData, pipIdentity, pipEntry);
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

    public onVerify(successCallback?: (data: any) => void, errorCallback?: (error: any) => void) {
        this.model.onVerify(successCallback, errorCallback);
    }

    public onRecover() {
        this.model.onRecover();
    }

    public onContinue() {
        this.model.onContinue();
    }

    public onCancel() {
        this.model.onCancel();
    }
}

angular.module('pipEntry.VerifyEmail')
    .service('pipVerifyEmailViewModel', VerifyEmailViewModel);