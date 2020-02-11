import { IEntryService } from "./EntryService";
import { IEntryCommonService } from "./IEntryCommonService";
import { EntryPageConfig, IPastSessions, AuthSessionData } from './EntryPageConfig';

class EntryCommonService implements IEntryCommonService {
    private _config: EntryPageConfig = new EntryPageConfig();

    constructor(
        private $rootScope: ng.IRootScopeService,
        private $state: ng.ui.IState,
        private pipAppBar: pip.nav.IAppBarService,
        private pipNavService: pip.nav.INavService,
        private pipRest: pip.rest.IRestService,
        private pipEntry: IEntryService,
        private pipFormErrors: pip.errors.IFormErrorsService,
        private pipIdentity: pip.services.IIdentityService,
        private pipTranslate: pip.services.ITranslateService,
        private localStorageService: any
    ) {
        "ngInject";

    }

    private getLastUsedLogin(serverUrl: string): string {
        let servers: IPastSessions = <IPastSessions>this.localStorageService.get('servers');
        if (servers && servers[serverUrl]) {
            return servers[serverUrl].login;
        }

        return undefined;
    }

    private getPastSessions(): IPastSessions {
        let servers: IPastSessions = this.localStorageService.get('servers') || <IPastSessions>{};

        return servers;
    }

    private getUsedServerUrls(): string[] {
        let servers: IPastSessions = this.localStorageService.get('servers') || <IPastSessions>{};
        let serverUrls: string[] = [];
        let serverUrl: string;

        for (var prop in servers) {
            if (servers.hasOwnProperty(prop)) {
                serverUrl = servers[prop].serverUrl;
                if (serverUrl) {
                    serverUrls.push(serverUrl);
                }
            }
        }

        return serverUrls;
    }

    public configureAppBar(): void {
        this.pipNavService.sidenav.hide();
        this.pipNavService.actions.hide();
        this.pipNavService.appbar.part('menu', false);
        if (this.pipEntry.showLanguage) {
            this.pipNavService.appbar.part('actions', 'language');
        }
        if (this.pipEntry.appbarTitle) {
            this.pipNavService.appbar.part('title', 'breadcrumb');
        } else {
            this.pipNavService.appbar.part('title', false);
        }
        this.pipNavService.breadcrumb.text = this.pipEntry.appbarTitle;
        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.hide();
        this.pipNavService.search.close();
        this.pipAppBar.part('icon', this.pipEntry.showIcon);
        if (this.pipEntry.showIcon) {
            this.pipNavService.icon.showIcon(this.pipEntry.appbarIcon);
        }

    };

    public initScope($scope): EntryPageConfig {
        this._config.appbarTitle = this.pipEntry.appbarTitle;
        this._config.showIcon = this.pipEntry.showIcon;
        this._config.showLanguage = this.pipEntry.showLanguage;
        this._config.adminOnly = this.pipEntry.adminOnly;
        this._config.fixedServerUrl = this.pipEntry.fixedServerUrl;
        this._config.enableAvatar = this.pipEntry.enableAvatar;
        this._config.useEmailAsLogin = this.pipEntry.useEmailAsLogin;
        this._config.entryHideObject = this.pipEntry.entryHideObject;

        let language: string = this.$state.params.language;
        if (language) this.pipTranslate.use(language);

        let email: string = null;
        if (this._config.useEmailAsLogin) {
            email = this.$state.params.email ? decodeURIComponent(this.$state.params.email) : this.$state.params.login ? decodeURIComponent(this.$state.params.login) : null;
        } else {
            email = this.$state.params.email ? decodeURIComponent(this.$state.params.email) : null;
        }
  
        let login: string = null;
        login = (this.$state.params.login) ? decodeURIComponent(this.$state.params.login) : null;

        if (this.$state['current'].auth) {
            if (this.pipIdentity.identity && this.pipIdentity.identity.user) {
                email = this.pipIdentity.identity.user.email || this.pipIdentity.identity.user.login;
                login = this.pipIdentity.identity.user.login;
            }
        }

        this._config.data = {
            serverUrl: this.$state.params.server_url ? decodeURIComponent(this.$state.params.server_url) : this.pipRest.serverUrl,
            login: login,
            email: email,
            password: '',
            remember: false,
            adminOnly: this._config.adminOnly,
            name: (this.$state.name != 'signup' && this.$state.params.name) ? this.$state.params.name : null,
            code: this.$state.params.code || null,
            resetCode: this.$state.params.reset_code || null
        };
        if (this._config.data.email && !this._config.data.login) {
            this._config.data.login = this._config.data.email;
        }
        if (!this._config.data.serverUrl) {
            throw new Error('Server url can not be empty!');
        }

        this._config.showServerUrl = false;
        this._config.fixedServerUrl = false;
        this._config.data.serverUrl = this._config.data.serverUrl || this.pipRest.serverUrl;

        // Fixed server url shall disable changing URL by the user
        if (this.pipEntry.fixedServerUrl) {
            this._config.data.serverUrl = this.pipRest.serverUrl;
            this._config.fixedServerUrl = true;
        }

        if (this.$state.name != 'signup') {
            this._config.data.login = this._config.data.login || this.getLastUsedLogin(this._config.data.serverUrl);
        }
        this._config.serverUrls = this.getUsedServerUrls();
        this._config.servers = this.getPastSessions();

        this._config.selected = {};
        this._config.selected.searchURLs = this._config.data.serverUrl;

        // Set login from history
        if (!this.$state['current'].auth) {
            if (this._config.data.serverUrl && !this._config.data.login && this.$state.name != 'signup') {
                let server: any = this._config.servers[this._config.data.serverUrl];
                this._config.data.login = (server || {}).login;
            }
        }

        this._config.filterItem = (item) => { return this.filterItem(item) };
        this._config.getMatches = (query) => { return this.getMatches(query) };
        this._config.onServerUrlChanged = (form?: any, url?: string) => { this.onServerUrlChanged(form, url) };
        this._config.isEmpty = _.isEmpty;

        return _.cloneDeep(this._config);
    }

    private filterItem(item): any {
        let result = (this._config.selected.searchURLs && item
            && item.toLowerCase().indexOf(this._config.selected.searchURLs.toLowerCase()) >= 0);
        return result;
    }

    private getMatches(query: string): any {
        if (!query)
            return this._config.showServerUrl;

        this._config.data.serverUrl = query;
        this._config.selected.searchURLs = query;
        return _.filter(this._config.serverUrls, this._config.filterItem);
    }

    private onServerUrlChanged(form?: any, url?: string) {
        form = form ? form : this._config.form;
        url = url ? url : this._config.selected.searchURLs;

        if (!url) return;
        let server = this._config.servers[url];

        if (server && this.$state.name != 'signup') {
            this._config.data.login = server.login;
            this.pipRest.serverUrl = url;
            this._config.data.serverUrl = url;
        }

        if (form) {
            this.pipFormErrors.resetFormErrors(form, false);
            this.pipFormErrors.resetFieldsErrors(form, null);
        }
    }
}

angular.module('pipEntry.CommonService', [])
    .service('pipEntryCommon', EntryCommonService);
