import { SingupModel } from './SignupModel';
import { IEntryDataService } from '../data/IEntryDataService';
import { IEntryCommonService } from "../common/IEntryCommonService";
import { IEntryService } from "../common/EntryService";

export class SignupViewModel {
    public model: SingupModel;

    constructor(
        pipEntryCommon: IEntryCommonService,
        pipTransaction: pip.services.ITransactionService,
        $rootScope: ng.IRootScopeService,
        $location: ng.ILocationService,
        $state: ng.ui.IStateService,
        $injector: ng.auto.IInjectorService,
        pipAuthState: pip.rest.IAuthStateService,
        pipFormErrors: pip.errors.IFormErrorsService,
        pipRest: pip.rest.IRestService,
        pipEntry: IEntryService,
        pipEntryData: IEntryDataService,
        pipTranslate: pip.services.ITranslateService
    ) {
        "ngInject";

        this.model = new SingupModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector,
            pipAuthState, pipFormErrors, pipRest, pipEntry, pipEntryData, pipTranslate);
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

    public gotoSignin(gotoSigninPage: any, gotoSigninDialog: any) {
        this.model.gotoSignin(gotoSigninPage, gotoSigninDialog);  
    }

    public onSignup(gotoPostSignup: any) {
        this.model.onSignup(gotoPostSignup);
    }
}

angular.module('pipEntry.Signup')
    .service('pipSignupViewModel', SignupViewModel);