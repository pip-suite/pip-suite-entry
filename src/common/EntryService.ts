import { IPastSessions, AuthSessionData } from './EntryPageConfig';
import { SessionData } from '../data/SessionData';
import { EmailSettings } from '../data/EmailSettings';
import { EntryHideObject } from './EntryHideObject';

export interface IEntryService {
    appbarTitle: string;
    appbarIcon: string;
    showIcon: boolean;
    showLanguage: boolean;
    adminOnly: boolean;
    fixedServerUrl: boolean;
    enableAvatar: boolean;
    useEmailAsLogin: boolean;
    isPostSignup: boolean;
    passwordExpire: boolean;
    entryHideObject: EntryHideObject;

    openSession(data: SessionData, remember?: boolean): void;
    getUserId(data: SessionData): string;
    // restoreSession(callback: Function): void;
    reopenSession(): void;
    closeSession(): void;
    signout(successCallback?: () => void): void
}

export interface IEntryProvider {
    appbarTitle: string;
    appbarIcon: string;
    showIcon: boolean;
    showLanguage: boolean;
    adminOnly: boolean;
    fixedServerUrl: boolean;
    enableAvatar: boolean;
    useEmailAsLogin: boolean;
    isPostSignup: boolean;
    passwordExpire: boolean;
    entryHideObject: EntryHideObject;
}

export class EntryConfig {
    public appbarTitle: string;
    public appbarIcon: string;
    public showIcon: boolean;
    public showLanguage: boolean;
    public adminOnly: boolean;
    public fixedServerUrl: boolean;
    public enableAvatar: boolean;
    public useEmailAsLogin: boolean;
    public isPostSignup: boolean;
    public entryHideObject: EntryHideObject;
    // control expare password by change_pwd_time field
    public passwordExpire: boolean;
}

class EntryService implements IEntryService {
    private sessionState: string;

    constructor(
        private config: EntryConfig,
        private pipRest: pip.rest.IRestService,
        private localStorageService: any,
		private $cookies: any,
        private $cookieStore: any,
        private pipSession: pip.services.ISessionService,
        private pipIdentity: pip.services.IIdentityService,
        private pipTimer: pip.services.ITimerService,
        private pipTranslate: pip.services.ITranslateService,
        private pipTheme: pip.themes.IThemeService,
        private $timeout: ng.ITimeoutService,
        private pipAuthState: pip.rest.IAuthStateService
    ) {
        "ngInject";

        this.pipSession.addOpenListener((callback: Function) => {
            this.restoreSession(callback);
        });

    }

    private restore(data: AuthSessionData): AuthSessionData {
        let result: AuthSessionData = new AuthSessionData();
        for (let property in data) {
            if (data.hasOwnProperty(property)) {
                if (!_.isObject(data[property])) {
                    result[property] = /* this.$cookieStore.get(property) */ this.$cookies.get(property) || this.localStorageService.get(property);
                } else {
                    result[property] = data[property];
                }
            }
        }

        return result;
    }

    private storeToLocal(data: any): void {
        for (let property in data) {
            if (data.hasOwnProperty(property) && !_.isObject(data[property])) {
                this.localStorageService.set(property, data[property]);
            }
        }
    }

    private removeLocal(data: any): void {
        for (let property in data) {
            if (data.hasOwnProperty(property) && !_.isObject(data[property])) {
                this.localStorageService.remove(property);
            }
        }
    }

    private storeToCookie(data: any): void {
        for (let property in data) {
            if (data.hasOwnProperty(property) && !_.isObject(data[property])) {
                // this.$cookieStore.put(property, data[property]);
				this.$cookies.put(property, data[property], {path: '/'});
            }
        }
    }

    private removeCookie(data: any): void {
        for (let property in data) {
            if (data.hasOwnProperty(property) && !_.isObject(data[property])) {
                // this.$cookieStore.remove(property);
				this.$cookies.remove(property);
            }
        }
    }

    private storeKnownServer(value: string): void {
        if (!value) return;
        
        // this.$cookieStore.put(value, value);
		this.$cookies.put(value, value, {path: '/'});
        this.localStorageService.set(value, value);
    }

    public get appbarIcon(): string {
        return this.config.appbarIcon;
    }

    public get appbarTitle(): string {
        return this.config.appbarTitle;
    }

    public get showIcon(): boolean {
        return this.config.showIcon;
    }

    public get showLanguage(): boolean {
        return this.config.showLanguage;
    }

    public get adminOnly(): boolean {
        return this.config.adminOnly;
    }

    public get fixedServerUrl(): boolean {
        return this.config.fixedServerUrl;
    }

    public get passwordExpire(): boolean {
        return this.config.passwordExpire;
    }

    public get entryHideObject(): EntryHideObject {
        return this.config.entryHideObject;
    }

    public get enableAvatar(): boolean {
        return this.config.enableAvatar;
    }

    public get useEmailAsLogin(): boolean {
        return this.config.useEmailAsLogin;
    }

    public get isPostSignup(): boolean {
        return this.config.isPostSignup;
    }

    public openSession(data: SessionData, remember?: boolean): void {
        let session: AuthSessionData = new AuthSessionData();
        session.sessionId = data ? data.id : null;
        session.userId = this.getUserId(data);
        session.serverUrl = this.pipRest.serverUrl;

        if (!session.sessionId) {
            throw new Error('Error: session Id not found');
        }

        if (!session.userId) {
            throw new Error('Error: user Id not found');
        }

        this.sessionState = 'open';

        // Set default headers for subsequent HTTP requests
        this.pipRest.setHeaders({
            'x-session-id': session.sessionId
        });

        // Save ids into local storage
        if (remember) {
            let servers: IPastSessions = this.localStorageService.get('servers') || <IPastSessions>{};
            servers[session.serverUrl] = {
                serverUrl: session.serverUrl,
                login: data.user.login
            };
            this.localStorageService.set('servers', servers);
            this.storeToLocal(session);
        }

        this.storeKnownServer(session.serverUrl)

        // Remove from cookie store
        this.storeToCookie(session);
        // Send broadcast
 
        this.pipIdentity.identity = data;
        this.pipSession.open(session);
        this.pipTranslate.use(data.user.language);

        if (data.user.theme && data.user.theme != this.pipTheme.theme) {
            this.pipTheme.use(data.user.theme);
        }
    }

    public getUserId(data: SessionData): string {
        if (!data) {
            return null;
        }
        let id: string;
        id = data.user_id ? data.user_id : data.user ? data.user.id : null;

        return id;
    }

    private checkEmailVerification(data: SessionData): boolean {
        return (data.user && data.user.settings &&
            data.user.settings['verified_email'] && data.user.settings['verified_email'] == "true");
    }

    private restoreSessionComplete(data: SessionData, callback: Function): void {
        if (angular.isFunction(callback)) {
            callback()
        }
        this.pipIdentity.identity = data;
        this.pipTranslate.use(data.user.language);        
    }

    private restoreSession(callback: Function): void {
        if (this.sessionState === 'open') {
            if (angular.isFunction(callback)) {
                callback()
            }

            return;
        }

        let session: AuthSessionData = new AuthSessionData();
        session = this.restore(session);

        if (!session || !session.sessionId) {
            this.signout(() => {
                this.pipAuthState.goToUnauthorized({});
            });

            return;
        }

        this.pipRest.getResource('restoreSessions').call(
            {
                session_id: session.sessionId
            },
            (data: SessionData) => {
                if (!data || !data.id) {
                    this.signout(() => {
                        this.pipAuthState.goToUnauthorized({});
                    });

                    return;
                }

                session.userId = this.getUserId(data);
                session.serverUrl = this.pipRest.serverUrl;
                //  cookie store
                this.storeToCookie(session);

                if (this.checkEmailVerification(data)) {
                    this.restoreSessionComplete(data, callback);
                } else {
                    this.pipRest.getResource('email_settings').get(
                        {
                            user_id: data.user.id
                        },
                        (setting: EmailSettings) => {
                            if (setting && setting.verified && setting.email == data.user.login) {
                                this.restoreSessionComplete(data, callback);
                            } else {
                                this.restoreSessionComplete(data, () => {
                                    if (callback) callback();
                                    this.pipAuthState.go('verify_email', { email: data.user.login || data.user['email'], serverUrl: this.pipRest.serverUrl });
                                });
                            }
                        }, 
                        (error: any) => {

                        });
                }
            },
            (error: any) => {
                if (angular.isFunction(callback)) {
                    callback(error);
                }

                this.signout(() => {
                    this.pipAuthState.goToUnauthorized({});
                });
            });
    }

    public reopenSession(): void {
        let session: AuthSessionData = new AuthSessionData();
        session = this.restore(session);

        if (!session || !session.sessionId) {
            this.signout(() => {
                this.pipAuthState.goToUnauthorized({});
            });

            return;
        }

        this.sessionState = 'reopen';
        // Set default headers for subsequent HTTP requests
        this.pipRest.setHeaders({
            'x-session-id': session.sessionId
        });

        if ((!this.pipRest.lockServerUrl || !this.pipRest.serverUrl) && session.serverUrl) {
            this.pipRest.serverUrl = session.serverUrl;
        }

        this.pipSession.open(session);
    }

    public closeSession(): void {
        let session: AuthSessionData = new AuthSessionData();
        session.sessionId = null;
        session.userId = null;
        session.serverUrl = null;

        this.pipRest.setHeaders({
            'x-session-id': undefined
        });
        this.pipIdentity.identity = null;
        // Remove ids into local storage
        this.removeLocal(session);
        // Remove from cookie store
        this.removeCookie(session);
        // Stop timer
        this.pipTimer.stop();
        // Send broadcast
        this.pipSession.close();
    }

    public signout(successCallback?: () => void): void {
        if (this.pipSession.isOpened()) {
            this.pipRest.getResource('signout').call({}, successCallback, successCallback);
        }

        this.closeSession();
    }
}


class EntryProvider implements IEntryProvider {
    private _service: IEntryService;
    private config: EntryConfig;

    constructor() {
        this.config = new EntryConfig();
        this.config.appbarTitle = '';
        this.config.appbarIcon = '';
        this.config.adminOnly = false;
        this.config.showIcon = false;
        this.config.showLanguage = true;
        this.config.adminOnly = false;
        this.config.fixedServerUrl = null;
        this.config.passwordExpire = false;
        this.config.enableAvatar = false;
        this.config.useEmailAsLogin = false;
        this.config.isPostSignup = true;
        this.config.entryHideObject = new EntryHideObject();
    }

    public set appbarIcon(newAppbarIcon: string) {
        this.config.appbarIcon = newAppbarIcon;
    }

    public set appbarTitle(newAppbarTitle: string) {
        this.config.appbarTitle = newAppbarTitle;
    }

    public set showIcon(newShowIcon: boolean) {
        this.config.showIcon = newShowIcon;
    }

    public set showLanguage(newShowLanguage: boolean) {
        this.config.showLanguage = newShowLanguage;
    }

    public set adminOnly(newAdminOnly: boolean) {
        this.config.adminOnly = newAdminOnly;
    }

    public set fixedServerUrl(newFixedServerUrl: boolean) {
        this.config.fixedServerUrl = newFixedServerUrl;
    }

    public set passwordExpire(value: boolean) {
        this.config.passwordExpire = value;
    }

    public set entryHideObject(entryHideObject: EntryHideObject) {
        this.config.entryHideObject = entryHideObject;
    }

    public set enableAvatar(value: boolean) {
        this.config.enableAvatar = value;
    }

    public set useEmailAsLogin(value: boolean) {
        this.config.useEmailAsLogin = value;
    }

    public set isPostSignup(value: boolean) {
        this.config.isPostSignup = value;
    }

    public $get(
        pipRest: pip.rest.IRestService,
        localStorageService: any,
		$cookies: any,
        $cookieStore: any,
        pipSession: pip.services.ISessionService,
        pipIdentity: pip.services.IIdentityService,
        pipTimer: pip.services.ITimerService,
        pipTranslate: pip.services.ITranslateService,
        pipTheme: pip.themes.IThemeService,
        $timeout: ng.ITimeoutService,
        pipAuthState: pip.rest.IAuthStateService
    ) {
        "ngInject";
        if (_.isNull(this._service) || _.isUndefined(this._service)) {
            this._service = new EntryService(this.config, pipRest, localStorageService, $cookies, $cookieStore,
                pipSession, pipIdentity, pipTimer, pipTranslate, pipTheme, $timeout, pipAuthState);
        }

        return this._service;
    }
}

angular.module('pipEntry.Service', [])
    .provider('pipEntry', EntryProvider);