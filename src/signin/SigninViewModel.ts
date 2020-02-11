import { SinginModel } from './SigninModel';
import { IEntryCommonService } from "../common/IEntryCommonService";
import { IEntryService } from "../common/EntryService";

export class SigninViewModel {
    public model: SinginModel;

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
        pipNavService: pip.nav.INavService,
        pipRest: pip.rest.IRestService
    ) {
        this.model = new SinginModel(
            pipEntryCommon,
            pipTransaction,
            $rootScope,
            $location,
            $state,
            $injector,
            pipErrorPageConfigService,
            pipAuthState,
            pipEntry,
            pipFormErrors,
            pipNavService,
            pipRest
        );
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

    public gotoSignup(gotoSignupPage: any, gotoSignupDialog: any) {
        this.model.gotoSignup(gotoSignupPage, gotoSignupDialog);
    }

    public gotoRecoverPassword(gotoRecoverPasswordDialog: any) {
        this.model.gotoRecoverPassword(gotoRecoverPasswordDialog);
    }

    public onSignin(rememberDefault: boolean) {
        this.model.onSignin(rememberDefault);
    }
}

angular.module('pipEntry.Signin')
    .service('pipSigninViewModel', SigninViewModel);