/// <reference path="../../typings/tsd.d.ts" />
import { IEntryService } from '../common/EntryService';


export class SignoutController {

    constructor(
        pipAuthState: pip.rest.IAuthStateService,
        pipEntry: IEntryService
    ) {
        "ngInject";

       pipEntry.signout();
        pipAuthState.goToUnauthorized({});
    }
}

angular.module('pipEntry.Signout', []);





