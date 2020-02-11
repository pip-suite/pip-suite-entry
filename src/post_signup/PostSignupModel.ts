import { EntryModel } from '../common/EntryModel';
import { IEntryCommonService } from "../common/IEntryCommonService";
import { IEntryDataService } from '../data/IEntryDataService';
import { IEntryService } from "../common/EntryService";

export class PostSignupModel extends EntryModel {
    constructor(
        pipEntryCommon: IEntryCommonService,
        pipTransaction: pip.services.ITransactionService,
        private $rootScope: ng.IRootScopeService,
        private $location: ng.ILocationService,
        private $state: ng.ui.IStateService,
        private $injector: ng.auto.IInjectorService,
        private pipErrorPageConfigService: pip.errors.IErrorPageConfigService,
        private pipAuthState: pip.rest.IAuthStateService,
        private pipFormErrors: pip.errors.IFormErrorsService,
        private pipEntry: IEntryService,
        private pipRest: pip.rest.IRestService,
        private pipTranslate: pip.services.ITranslateService,
        private pipEntryData: IEntryDataService,
        private pipToasts: pip.controls.IToastService
    ) {
        "ngInject";

        super(pipEntryCommon);
        this.transaction = pipTransaction.create('entry.signin');
    }

    public init($scope) {
        this.initModel($scope);
        this.setElementVisability();
    }

    private setElementVisability() {
        this.hideObject.subTitle = new Boolean(this.hideObject.subTitle) == true;
        this.hideObject.title = new Boolean(this.hideObject.title) == true;
        this.hideObject.successTitle = new Boolean(this.hideObject.successTitle) == true;
        this.hideObject.progress = new Boolean(this.hideObject.progress) == true;
    }

    private checkSupported(): boolean {
        let pipSystemInfo: any = this.$injector.has('pipSystemInfo') ? this.$injector.get('pipSystemInfo') : null;
        if (!pipSystemInfo) {
            return true;
        }

        if (!this.pipErrorPageConfigService || !this.pipErrorPageConfigService.configs || 
            !this.pipErrorPageConfigService.configs.Unsupported || !this.pipErrorPageConfigService.configs.Unsupported.Active) {

            return true;
        }

        let browser: string = pipSystemInfo.browserName;
        let version: string = pipSystemInfo.browserVersion;
        version = version.split(".")[0];

        let supported = this.pipErrorPageConfigService.configs.Unsupported.Params && this.pipErrorPageConfigService.configs.Unsupported.Params.supported ? this.pipErrorPageConfigService.configs.Unsupported.Params.supported : null;
        if (!supported) {

            return true;
        }

        if (browser && supported[browser] && version >= supported[browser]) {
            return true;
        }

        this.pipEntry.signout();
        this.$state.go(pip.errors.ErrorsUnsupportedState); 
        return false;
    }

    public onPostSignupSubmit(callback?: () => void) {
        if (this.config.form.$invalid) {
            this.pipFormErrors.resetFormErrors(this.config.form, true);
            return;
        }

        var transactionId = this.transaction.begin('PROCESSING');
        if (!transactionId) return;

        if (callback) callback();
        // this.pipPartyData.createParty(
        //     this.config.data,
        //     (party) => {
        //         this.pipFormErrors.resetFormErrors(this.config.form, false);
        //         if (this.transaction.aborted(transactionId)) return;

        //         this.transaction.end();

        //         if (this.checkSupported()) {
        //             this.pipAuthState.goToAuthorized({
        //                 party_id: party.id
        //             });
        //         }

        //     },
        //     (error) => {
        //         this.transaction.end(error);
        //         this.pipFormErrors.resetFormErrors(this.config.form, true);
        //         this.pipFormErrors.setFormError(
        //             this.config.form, error, {
        //                 1000: 'form', // Unknown error
        //                 1110: 'form', // Account is locked
        //                 1111: 'form', // Number of attempts exceeded. Account was locked
        //                 1112: 'form', // Account is not active
        //                 '-1': 'form' // server not response
        //             }
        //         );
        //     }
        // );
    }
}