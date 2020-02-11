import { PostSignupModel } from './PostSignupModel';
import { IEntryService } from "../common/EntryService";
import { IEntryDataService } from '../data/IEntryDataService';
import { IEntryCommonService } from "../common/IEntryCommonService";

export class PostSignupViewModel {
    public model: PostSignupModel;

    constructor(
        pipEntryCommon: IEntryCommonService,
        pipTransaction: pip.services.ITransactionService,
        $rootScope: ng.IRootScopeService,
        $location: ng.ILocationService,
        $state: ng.ui.IStateService,
        $injector: ng.auto.IInjectorService,
        pipErrorPageConfigService: pip.errors.IErrorPageConfigService,
        pipAuthState: pip.rest.IAuthStateService,
        pipEntry: IEntryService,
        pipFormErrors: pip.errors.IFormErrorsService,
        pipRest: pip.rest.IRestService,
        private pipTranslate: pip.services.ITranslateService,
        private pipEntryData: IEntryDataService,
        private pipToasts: pip.controls.IToastService
    ) {
        "ngInject";

        this.model = new PostSignupModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector,
            pipErrorPageConfigService, pipAuthState, pipFormErrors, pipEntry, pipRest, pipTranslate, pipEntryData, pipToasts);
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

    public onPostSignupSubmit(callback?: () => void) {
        this.model.onPostSignupSubmit(callback);
    }
}

angular.module('pipEntry.PostSignup')
    .service('pipPostSignupViewModel', PostSignupViewModel);