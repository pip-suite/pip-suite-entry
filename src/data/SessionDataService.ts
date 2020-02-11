import { ISessionDataService } from './ISessionDataService';
import { IEntryService } from "../common/EntryService";

class SessionData implements ISessionDataService {
    private RESOURCE: string = 'sessions';
    private RESOURCE_USER: string = 'userSessions';
    private RESOURCE_RESTORE: string = 'restoreSessions';

    constructor(
        private $stateParams: angular.ui.IStateParamsService,
        private pipRest: pip.rest.IRestService,
        private pipSession: pip.services.ISessionService
    ) {
        "ngInject";
    }

    public getSessionId(): string {
        let sessionId: string;
        sessionId = this.pipSession.session ? this.pipSession.session.sessionId : null;

        return sessionId;
    }

    public getUserId(): string {
        let userId: string;
        userId = this.pipSession.session ? this.pipSession.session.userId : null;

        return userId;
    }

    public getSessions(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        params = params || {};
        return this.pipRest.getResource(this.RESOURCE).call(params, successCallback, errorCallback);
    }

    public restoreSession(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        params = params || {};
        params.session_id = this.getSessionId();

        return this.pipRest.getResource(this.RESOURCE_RESTORE).call(params, successCallback, errorCallback);
    }

    public getUserSessions(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any> {
        params = params || {};
        params.user_id = this.getUserId();

        return this.pipRest.getResource(this.RESOURCE_USER).get(params, successCallback, errorCallback);
    }

}


angular
    .module('pipSessionData', ['pipRest'])
    .service('pipSessionData', SessionData);