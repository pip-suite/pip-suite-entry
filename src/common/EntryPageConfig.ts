import { EntryConfig } from './EntryService';

export class EntryPageConfig extends EntryConfig {
    data: EntryDataConfig;
    showServerUrl: boolean = false;
    serverUrls: string[];
    servers: IPastSessions;
    selected: any;
    filterItem: Function;
    getMatches: Function;
    onServerUrlChanged: Function;
    isEmpty: Function;
    form: any;
}

export class EntryDataConfig {
    login: string;
    serverUrl: string;
    email: string;
    password: string;
    passwordNew?: string;
    remember: boolean;
    adminOnly: boolean;
    name: string;
    code: string;
    resetCode: string;
}

// export angular events
// export const AuthSessionOpenedEvent = 'pipSessionOpened';
// export const AuthSessionClosedEvent = 'pipSessionClosed';
// export const AutoPullChangesEvent = 'pipAutoPullChanges';

export class SigninParams {
    public email?: string;
    public login: string;
    public serverUrl: string;
    public password?: string;
    public remember?: boolean;
    public adminOnly?: boolean;
}

export class SignupParams {
    public login: string;
    public email?: string;
    public name?: string;
    public serverUrl: string;
    public password?: string;
    public remember?: boolean;
    public adminOnly?: boolean;
    public language?: string;
    public theme?: string; 
    public time_zone?: string;
}

export class AuthSessionData {
    serverUrl: string = undefined;
    sessionId: string = undefined;
    userId: string = undefined;
}


export class PastSession { 
    public login: string;
    public serverUrl: string;
}


export interface IPastSessions {
    [key: string]: PastSession
}
