import { SessionData } from './SessionData';

export interface IEntryDataService {
    getUserId(): string;

    signup(params: any, successCallback?: (user: SessionData) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    recoverPassword(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    resetPassword(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    expireChangePassword(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    requestEmailVerification(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    verifyEmail(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    signupValidate(login: string, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    // Settings
    saveSettingsKey(section: string, key: string, value: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>
}



