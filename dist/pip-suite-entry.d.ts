declare module pip.entry {

export class ChangePasswordController {
    private pipChangePasswordViewModel;
    private $window;
    constructor($state: ng.ui.IStateService, pipChangePasswordViewModel: ChangePasswordViewModel, pipEntryCommon: IEntryCommonService, pipEntry: IEntryService, pipAuthState: pip.rest.IAuthStateService, pipSession: pip.services.ISessionService, $window: ng.IWindowService);
    goBack(): void;
    readonly config: any;
    onChange(): void;
}

export interface IChangePasswordDialogService {
    show(params: any, successCallback?: () => void, cancelCallback?: () => void): void;
}

export class ChangePasswordModel extends EntryModel {
    private $rootScope;
    private $location;
    private $state;
    private $injector;
    private pipAuthState;
    private pipFormErrors;
    private pipRest;
    private pipTranslate;
    private pipEntryData;
    private pipEntry;
    private pipToasts;
    constructor(pipEntryCommon: IEntryCommonService, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipAuthState: pip.rest.IAuthStateService, pipFormErrors: pip.errors.IFormErrorsService, pipRest: pip.rest.IRestService, pipTranslate: pip.services.ITranslateService, pipEntryData: IEntryDataService, pipEntry: IEntryService, pipToasts: pip.controls.IToastService);
    init($scope: any): void;
    private setElementVisability();
    onShowToast(message: string, type: string): void;
    onChange(callback?: () => void): void;
}


export class ChangePasswordViewModel {
    private pipTranslate;
    private pipEntryData;
    private pipToasts;
    model: ChangePasswordModel;
    constructor(pipEntryCommon: any, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipAuthState: pip.rest.IAuthStateService, pipFormErrors: pip.errors.IFormErrorsService, pipRest: pip.rest.IRestService, pipEntry: IEntryService, pipTranslate: pip.services.ITranslateService, pipEntryData: any, pipToasts: any);
    readonly transaction: pip.services.Transaction;
    readonly hideObject: any;
    readonly showServerError: any;
    readonly config: any;
    initModel($scope: any): void;
    onShowToast(message: any, type: any): void;
    onChange(callback?: () => void): void;
}

export class Account {
    roles: string[];
    theme: string;
    language: string;
    time_zone: string;
    create_time: string;
    change_pwd_time: string;
    login: string;
    name: string;
    id: string;
    custom_hdr?: any;
    custom_dat?: any;
    settings?: any;
}

export class EmailSettings {
    name?: string;
    email?: string;
    language?: string;
    verified?: boolean;
    id?: string;
}


export class GENDER {
    static MALE: 'male';
    static FEMALE: 'female';
    static NOT_SPECIFIED: 'n/s';
}

export interface IEntryDataService {
    getUserId(): string;
    signup(params: any, successCallback?: (user: SessionData) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    recoverPassword(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    resetPassword(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    expireChangePassword(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    requestEmailVerification(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    verifyEmail(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    signupValidate(login: string, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    saveSettingsKey(section: string, key: string, value: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
}


export interface ISessionDataService {
    getSessionId(): string;
    getUserId(): string;
    getSessions(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    restoreSession(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
    getUserSessions(params: any, successCallback?: (data: any) => void, errorCallback?: (error: any) => void): angular.IPromise<any>;
}

export class Role {
}

export class Session {
    user_id: string;
    user_name: string;
    address: string;
    client: string;
    request_time: string;
    open_time: string;
    active: boolean;
    id: string;
}

export class SessionData extends Session {
    user: Account;
    data: any;
    change_pwd_time?: string;
}




export class EntryHideObject {
    remember?: boolean;
    title?: boolean;
    server?: boolean;
    forgotPassword?: boolean;
    signup?: boolean;
    hint?: boolean;
    progress?: boolean;
    subTitle?: boolean;
    successTitle?: boolean;
    subTitle1?: boolean;
    subTitle2?: boolean;
    agreement?: boolean;
    passwordConfirm?: boolean;
    signin?: boolean;
    resetSubTitle?: boolean;
    changePwdTitle?: boolean;
    changePwdSubTitle?: boolean;
}


export class EntryModel {
    pipEntryCommon: IEntryCommonService;
    config: EntryPageConfig;
    hideObject: EntryHideObject;
    showServerError: boolean;
    transaction: pip.services.Transaction;
    constructor(pipEntryCommon: IEntryCommonService);
    protected initModel($scope: any): void;
}

export class EntryPageConfig extends EntryConfig {
    data: EntryDataConfig;
    showServerUrl: boolean;
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
export class SigninParams {
    email?: string;
    login: string;
    serverUrl: string;
    password?: string;
    remember?: boolean;
    adminOnly?: boolean;
}
export class SignupParams {
    login: string;
    email?: string;
    name?: string;
    serverUrl: string;
    password?: string;
    remember?: boolean;
    adminOnly?: boolean;
    language?: string;
    theme?: string;
    time_zone?: string;
}
export class AuthSessionData {
    serverUrl: string;
    sessionId: string;
    userId: string;
}
export class PastSession {
    login: string;
    serverUrl: string;
}
export interface IPastSessions {
    [key: string]: PastSession;
}

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
    reopenSession(): void;
    closeSession(): void;
    signout(successCallback?: () => void): void;
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
    appbarTitle: string;
    appbarIcon: string;
    showIcon: boolean;
    showLanguage: boolean;
    adminOnly: boolean;
    fixedServerUrl: boolean;
    enableAvatar: boolean;
    useEmailAsLogin: boolean;
    isPostSignup: boolean;
    entryHideObject: EntryHideObject;
    passwordExpire: boolean;
}


export interface IEntryCommonService {
    configureAppBar(): void;
    initScope($scope: any): EntryPageConfig;
}


function compareOldPassword($parse: ng.IParseService): ng.IDirective;
function compareNewPassword($parse: ng.IParseService): ng.IDirective;
function comparePasswordMatch($parse: ng.IParseService): ng.IDirective;

export class ExpireChangePasswordController {
    private pipExpireChangePasswordViewModel;
    private $window;
    constructor($state: ng.ui.IStateService, pipExpireChangePasswordViewModel: ExpireChangePasswordViewModel, pipEntryCommon: IEntryCommonService, pipEntry: IEntryService, pipAuthState: pip.rest.IAuthStateService, pipSession: pip.services.ISessionService, $window: ng.IWindowService);
    goBack(): void;
    readonly config: any;
    onChange(): void;
}

export interface IExpireChangePasswordDialogService {
    show(params: any, successCallback?: () => void, cancelCallback?: () => void): void;
}

export class ExpireChangePasswordModel extends EntryModel {
    private $rootScope;
    private $location;
    private $state;
    private $injector;
    private pipAuthState;
    private pipFormErrors;
    private pipRest;
    private pipTranslate;
    private pipEntryData;
    private pipEntry;
    private pipToasts;
    constructor(pipEntryCommon: IEntryCommonService, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipAuthState: pip.rest.IAuthStateService, pipFormErrors: pip.errors.IFormErrorsService, pipRest: pip.rest.IRestService, pipTranslate: pip.services.ITranslateService, pipEntryData: IEntryDataService, pipEntry: IEntryService, pipToasts: pip.controls.IToastService);
    init($scope: any): void;
    private setElementVisability();
    onShowToast(message: string, type: string): void;
    onChange(callback?: () => void): void;
}


export class ExpireChangePasswordViewModel {
    private pipTranslate;
    private pipEntryData;
    private pipToasts;
    model: ExpireChangePasswordModel;
    constructor(pipEntryCommon: any, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipAuthState: pip.rest.IAuthStateService, pipFormErrors: pip.errors.IFormErrorsService, pipRest: pip.rest.IRestService, pipEntry: IEntryService, pipTranslate: pip.services.ITranslateService, pipEntryData: any, pipToasts: any);
    readonly transaction: pip.services.Transaction;
    readonly hideObject: any;
    readonly showServerError: any;
    readonly config: any;
    initModel($scope: any): void;
    onShowToast(message: any, type: any): void;
    onChange(callback?: () => void): void;
}

export class PostSignupController implements ng.IController {
    private $window;
    $party: any;
    private pipPostSignupViewModel;
    $onInit(): void;
    constructor($window: ng.IWindowService, $party: any, pipPostSignupViewModel: PostSignupViewModel);
    onPostSignupSubmit(): void;
    readonly transaction: any;
}

export interface IPostSignupDialogService {
    show(params: any, successCallback?: () => void, cancelCallback?: () => void): void;
}

export class PostSignupModel extends EntryModel {
    private $rootScope;
    private $location;
    private $state;
    private $injector;
    private pipErrorPageConfigService;
    private pipAuthState;
    private pipFormErrors;
    private pipEntry;
    private pipRest;
    private pipTranslate;
    private pipEntryData;
    private pipToasts;
    constructor(pipEntryCommon: IEntryCommonService, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipErrorPageConfigService: pip.errors.IErrorPageConfigService, pipAuthState: pip.rest.IAuthStateService, pipFormErrors: pip.errors.IFormErrorsService, pipEntry: IEntryService, pipRest: pip.rest.IRestService, pipTranslate: pip.services.ITranslateService, pipEntryData: IEntryDataService, pipToasts: pip.controls.IToastService);
    init($scope: any): void;
    private setElementVisability();
    private checkSupported();
    onPostSignupSubmit(callback?: () => void): void;
}


export class PostSignupViewModel {
    private pipTranslate;
    private pipEntryData;
    private pipToasts;
    model: PostSignupModel;
    constructor(pipEntryCommon: IEntryCommonService, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipErrorPageConfigService: pip.errors.IErrorPageConfigService, pipAuthState: pip.rest.IAuthStateService, pipEntry: IEntryService, pipFormErrors: pip.errors.IFormErrorsService, pipRest: pip.rest.IRestService, pipTranslate: pip.services.ITranslateService, pipEntryData: IEntryDataService, pipToasts: pip.controls.IToastService);
    readonly transaction: pip.services.Transaction;
    readonly hideObject: any;
    readonly showServerError: any;
    readonly config: any;
    initModel($scope: any): void;
    onPostSignupSubmit(callback?: () => void): void;
}

export class RecoverPasswordController {
    private $scope;
    private pipRecoverPasswordViewModel;
    private pipResetPasswordDialog;
    private $state;
    private pipAuthState;
    private pipFormErrors;
    private $window;
    constructor($scope: ng.IScope, pipRecoverPasswordViewModel: RecoverPasswordViewModel, pipResetPasswordDialog: IResetPasswordDialogService, pipEntryCommon: IEntryCommonService, $state: ng.ui.IStateService, pipAuthState: pip.rest.IAuthStateService, pipFormErrors: pip.errors.IFormErrorsService, $window: ng.IWindowService);
    goBack(): void;
    readonly transaction: any;
    readonly config: any;
    onRecover(): void;
}

export interface IRecoverPasswordDialogService {
    show(params: any, successCallback?: () => void, cancelCallback?: () => void): void;
}

export class RecoverPasswordModel extends EntryModel {
    private $rootScope;
    private $location;
    private $state;
    private $injector;
    private pipAuthState;
    private pipFormErrors;
    private pipRest;
    private pipTranslate;
    private pipEntryData;
    private pipToasts;
    constructor(pipEntryCommon: IEntryCommonService, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipAuthState: pip.rest.IAuthStateService, pipFormErrors: pip.errors.IFormErrorsService, pipRest: pip.rest.IRestService, pipTranslate: pip.services.ITranslateService, pipEntryData: IEntryDataService, pipToasts: pip.controls.IToastService);
    init($scope: any): void;
    private setElementVisability();
    onRecover(gotoReset: () => void): void;
}


export class RecoverPasswordViewModel {
    private pipTranslate;
    private pipEntryData;
    private pipToasts;
    model: RecoverPasswordModel;
    constructor(pipEntryCommon: any, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipAuthState: pip.rest.IAuthStateService, pipFormErrors: pip.errors.IFormErrorsService, pipRest: pip.rest.IRestService, pipTranslate: pip.services.ITranslateService, pipEntryData: any, pipToasts: any);
    readonly transaction: pip.services.Transaction;
    readonly hideObject: any;
    readonly showServerError: any;
    readonly config: any;
    initModel($scope: any): void;
    onRecover(gotoReset: any): void;
}

export class ResetPasswordController {
    private pipResetPasswordViewModel;
    private $window;
    constructor(pipResetPasswordViewModel: ResetPasswordViewModel, pipEntryCommon: IEntryCommonService, $window: ng.IWindowService);
    goBack(): void;
    readonly config: any;
    onReset(): void;
}

export interface IResetPasswordDialogService {
    show(params: any, successCallback?: () => void, cancelCallback?: () => void): void;
}

export class ResetPasswordModel extends EntryModel {
    private $rootScope;
    private $location;
    private $state;
    private $injector;
    private pipAuthState;
    private pipFormErrors;
    private pipRest;
    private pipTranslate;
    private pipEntryData;
    private pipToasts;
    constructor(pipEntryCommon: IEntryCommonService, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipAuthState: pip.rest.IAuthStateService, pipFormErrors: pip.errors.IFormErrorsService, pipRest: pip.rest.IRestService, pipTranslate: pip.services.ITranslateService, pipEntryData: IEntryDataService, pipToasts: pip.controls.IToastService);
    init($scope: any): void;
    private setElementVisability();
    onShowToast(message: string, type: string): void;
    onReset(callback?: () => void): void;
}


export class ResetPasswordViewModel {
    private pipTranslate;
    private pipEntryData;
    private pipToasts;
    model: ResetPasswordModel;
    constructor(pipEntryCommon: any, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipAuthState: pip.rest.IAuthStateService, pipFormErrors: pip.errors.IFormErrorsService, pipRest: pip.rest.IRestService, pipTranslate: pip.services.ITranslateService, pipEntryData: any, pipToasts: any);
    readonly transaction: pip.services.Transaction;
    readonly hideObject: any;
    readonly showServerError: any;
    readonly config: any;
    initModel($scope: any): void;
    onShowToast(message: any, type: any): void;
    onReset(callback?: () => void): void;
}

function configEntryResources(pipRestProvider: pip.rest.IRestProvider): void;


function configSessionResources(pipRestProvider: pip.rest.IRestProvider): void;

function configSettingsResources(pipRestProvider: pip.rest.IRestProvider): void;

export const isSignin = "isSignin";

export interface ISigninDialogController {
    pipGotoSignupDialog: Function;
    pipGotoRecoverPasswordDialog: Function;
}

export class SinginModel extends EntryModel {
    private $rootScope;
    private $location;
    private $state;
    private $injector;
    private pipErrorPageConfigService;
    private pipAuthState;
    private pipEntry;
    private pipFormErrors;
    private pipNavService;
    private pipRest;
    constructor(pipEntryCommon: IEntryCommonService, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipErrorPageConfigService: pip.errors.IErrorPageConfigService, pipAuthState: pip.rest.IAuthStateService, pipEntry: IEntryService, pipFormErrors: pip.errors.IFormErrorsService, pipNavService: pip.nav.INavService, pipRest: pip.rest.IRestService);
    init($scope: any): void;
    private setElementVisability();
    private checkSupported();
    gotoSignup(gotoSignupPage: any, gotoSignupDialog: any): void;
    gotoRecoverPassword(gotoRecoverPasswordDialog: any): void;
    private inSigninComplete(data);
    private checkEmailVerification(data);
    onSignin(rememberDefault: boolean): void;
}


export class SigninViewModel {
    model: SinginModel;
    constructor(pipEntryCommon: IEntryCommonService, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipErrorPageConfigService: pip.errors.IErrorPageConfigService, pipAuthState: pip.rest.IAuthStateService, pipEntry: IEntryService, pipFormErrors: pip.errors.IFormErrorsService, pipNavService: pip.nav.INavService, pipRest: pip.rest.IRestService);
    readonly transaction: pip.services.Transaction;
    readonly hideObject: any;
    readonly showServerError: any;
    readonly config: any;
    initModel($scope: any): void;
    gotoSignup(gotoSignupPage: any, gotoSignupDialog: any): void;
    gotoRecoverPassword(gotoRecoverPasswordDialog: any): void;
    onSignin(rememberDefault: boolean): void;
}

export class SignoutController {
    constructor(pipAuthState: pip.rest.IAuthStateService, pipEntry: IEntryService);
}



export class SingupModel extends EntryModel {
    private $rootScope;
    private $location;
    private $state;
    private $injector;
    private pipAuthState;
    private pipFormErrors;
    private pipRest;
    private pipEntry;
    private pipEntryData;
    private pipTranslate;
    private session;
    private regestryVerifyEmailKey;
    constructor(pipEntryCommon: IEntryCommonService, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipAuthState: pip.rest.IAuthStateService, pipFormErrors: pip.errors.IFormErrorsService, pipRest: pip.rest.IRestService, pipEntry: IEntryService, pipEntryData: IEntryDataService, pipTranslate: pip.services.ITranslateService);
    init($scope: any): void;
    private setElementVisability();
    gotoSignin(gotoSigninPage: any, gotoSigninDialog: any): void;
    onSignup(gotoPostSignup: any): void;
}


export class SignupViewModel {
    model: SingupModel;
    constructor(pipEntryCommon: IEntryCommonService, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipAuthState: pip.rest.IAuthStateService, pipFormErrors: pip.errors.IFormErrorsService, pipRest: pip.rest.IRestService, pipEntry: IEntryService, pipEntryData: IEntryDataService, pipTranslate: pip.services.ITranslateService);
    readonly transaction: pip.services.Transaction;
    readonly hideObject: any;
    readonly showServerError: any;
    readonly config: any;
    initModel($scope: any): void;
    gotoSignin(gotoSigninPage: any, gotoSigninDialog: any): void;
    onSignup(gotoPostSignup: any): void;
}

export class VerifyEmailController {
    private $scope;
    private $window;
    private pipFormErrors;
    private pipVerifyEmailViewModel;
    private pipIdentity;
    private $timeout;
    showServerError: boolean;
    touchedErrorsWithHint: Function;
    form: any;
    data: any;
    error: any;
    serverUrl: string;
    email: string;
    showValidateProgress: boolean;
    constructor($scope: ng.IScope, $window: ng.IWindowService, pipFormErrors: pip.errors.IFormErrorsService, pipVerifyEmailViewModel: VerifyEmailViewModel, pipIdentity: pip.services.IIdentityService, $timeout: ng.ITimeoutService);
    goBack(): void;
    readonly config: EntryPageConfig;
    readonly transaction: any;
    onVerify(): void;
    onRecover(): void;
}
export class VerifyEmailSuccessController {
    private pipVerifyEmailViewModel;
    constructor($scope: ng.IScope, pipVerifyEmailViewModel: VerifyEmailViewModel);
    onContinue(): void;
}

export class VerifyEmailModel extends EntryModel {
    private $rootScope;
    private $location;
    private $state;
    private $injector;
    private pipAuthState;
    private pipFormErrors;
    private pipRest;
    private pipEntryData;
    private pipIdentity;
    private pipEntry;
    private regestryVerifyEmailKey;
    constructor(pipEntryCommon: IEntryCommonService, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipAuthState: pip.rest.IAuthStateService, pipFormErrors: pip.errors.IFormErrorsService, pipRest: pip.rest.IRestService, pipEntryData: IEntryDataService, pipIdentity: pip.services.IIdentityService, pipEntry: IEntryService);
    init($scope: any): void;
    private setElementVisability();
    onVerify(successCallback?: (data: any) => void, errorCallback?: (error: any) => void): void;
    onRecover(): void;
    onContinue(): void;
    onCancel(): void;
}

export class VerifyEmailViewModel {
    model: VerifyEmailModel;
    constructor(pipEntryCommon: any, pipTransaction: pip.services.ITransactionService, $rootScope: ng.IRootScopeService, $location: ng.ILocationService, $state: ng.ui.IStateService, $injector: ng.auto.IInjectorService, pipAuthState: pip.rest.IAuthStateService, pipFormErrors: pip.errors.IFormErrorsService, pipRest: pip.rest.IRestService, pipEntryData: IEntryDataService, pipIdentity: pip.services.IIdentityService, pipEntry: IEntryService);
    readonly transaction: pip.services.Transaction;
    readonly hideObject: any;
    readonly showServerError: any;
    readonly config: any;
    initModel($scope: any): void;
    onVerify(successCallback?: (data: any) => void, errorCallback?: (error: any) => void): void;
    onRecover(): void;
    onContinue(): void;
    onCancel(): void;
}

}
