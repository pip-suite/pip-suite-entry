import { EntryPageConfig } from './EntryPageConfig';
import { IEntryCommonService } from "./IEntryCommonService";
import { EntryHideObject } from './EntryHideObject';

export class EntryModel {
    public config: EntryPageConfig;
    public hideObject: EntryHideObject;
    public showServerError: boolean = true;
    public transaction: pip.services.Transaction;

    constructor(
        public pipEntryCommon: IEntryCommonService,
    ) { 
        "ngInject";
        
    }

    protected initModel($scope) {
        this.config = this.pipEntryCommon.initScope($scope);
        this.config.form = this.config.form || $scope.form;
        this.hideObject = this.config.entryHideObject; 
    }
}