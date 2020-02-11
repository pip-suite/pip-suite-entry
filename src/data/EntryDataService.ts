import { SessionData } from './SessionData';
import { IEntryDataService } from './IEntryDataService';
import { IEntryService } from "../common/EntryService";

class EntryData implements IEntryDataService {
    constructor(
        private $stateParams: angular.ui.IStateParamsService,
        private pipRest: pip.rest.IRestService,
        private pipEntry: IEntryService,
        private pipSession: pip.services.ISessionService
    ) {
        "ngInject";
    }

    public getUserId(): string {
        let userId: string;
        userId = this.pipSession.session ? this.pipSession.session.userId : null;

        return userId;
    }

    public signup(params: any, successCallback?: (user: SessionData) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        return this.pipRest.getResource('signup').call(params, successCallback, errorCallback);
    }

    public recoverPassword(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        return this.pipRest.getResource('recoverPassword').call(
            {
                login: params.login
            }, successCallback, errorCallback);
    }

    public resetPassword(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        return this.pipRest.getResource('resetPassword').call(
            {
                login: params.login,
                code: params.code,
                password: params.password
            }, successCallback, errorCallback);
    }

    public expireChangePassword(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        let param = params || {};
        param.user_id = this.getUserId();

        return this.pipRest.getResource('changePassword').save(param, successCallback, errorCallback);
    }

    public requestEmailVerification(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        return this.pipRest.getResource('requestEmailVerification').call(
            {
     //           user_id: this.getUserId(),
                login: params.login
            }, successCallback, errorCallback);
    }

    public verifyEmail(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        return this.pipRest.getResource('verifyEmail').call(params, successCallback, errorCallback);
    }

    public readEmailSettings(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        let param = params || {};
        param.user_id = param.user_id ? param.user_id : this.getUserId();  

        return this.pipRest.getResource('email_settings').get(params, successCallback, errorCallback);
    }

    public signupValidate(login: string, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        return this.pipRest.getResource('signupValidate').get(
            {
                login: login
            }, successCallback, errorCallback);
    }

    public saveSettingsKey(section: string, key: string, value: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        return this.pipRest.getResource('settings').save(
            {
                section: section,
                key: key
            },
            { value: value },
            (data: any) => {
                if (successCallback) {
                    successCallback(data);
                }
            },
            (error: any) => {
                if (errorCallback) {
                    errorCallback(error);
                }
            });
    }

}


angular
    .module('pipEntryData', ['pipRest'])
    .service('pipEntryData', EntryData);


