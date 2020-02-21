(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).entry = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChangePasswordController = (function () {
    ChangePasswordController.$inject = ['$state', 'pipChangePasswordViewModel', 'pipEntryCommon', 'pipEntry', 'pipAuthState', 'pipSession', '$window'];
    function ChangePasswordController($state, pipChangePasswordViewModel, pipEntryCommon, pipEntry, pipAuthState, pipSession, $window) {
        "ngInject";
        this.pipChangePasswordViewModel = pipChangePasswordViewModel;
        this.$window = $window;
        pipEntryCommon.configureAppBar();
        if (pipEntry.passwordExpire === false || !pipSession.isOpened()) {
            $state.go(pipAuthState.signinState(), {});
        }
    }
    ChangePasswordController.prototype.goBack = function () {
        this.$window.history.back();
    };
    Object.defineProperty(ChangePasswordController.prototype, "config", {
        get: function () {
            return this.pipChangePasswordViewModel.config;
        },
        enumerable: true,
        configurable: true
    });
    ChangePasswordController.prototype.onChange = function () {
        this.pipChangePasswordViewModel.onChange();
    };
    return ChangePasswordController;
}());
exports.ChangePasswordController = ChangePasswordController;
{
    angular.module('pipEntry.ChangePassword', ['pipEntry.Common', 'pipChangePasswordPanel']);
}
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var ChangePasswordDialogService = (function () {
        ChangePasswordDialogService.$inject = ['$mdDialog'];
        function ChangePasswordDialogService($mdDialog) {
            this.$mdDialog = $mdDialog;
        }
        ;
        ChangePasswordDialogService.prototype.show = function (params, successCallback, cancelCallback) {
            this.$mdDialog.show({
                targetEvent: params.event,
                templateUrl: 'change_password/ChangePasswordDialog.html',
                controller: ChangePasswordDialogController_1,
                controllerAs: '$ctrl',
                locals: {
                    params: params
                },
                clickOutsideToClose: false
            })
                .then(function () {
                if (successCallback) {
                    successCallback();
                }
            }, function () {
                if (cancelCallback) {
                    cancelCallback();
                }
            });
        };
        return ChangePasswordDialogService;
    }());
    var ChangePasswordDialogController_1 = (function () {
        ChangePasswordDialogController_1.$inject = ['$mdDialog', 'pipChangePasswordViewModel'];
        function ChangePasswordDialogController_1($mdDialog, pipChangePasswordViewModel) {
            "ngInject";
            this.pipChangePasswordViewModel = pipChangePasswordViewModel;
            this.goBack = $mdDialog.cancel;
        }
        Object.defineProperty(ChangePasswordDialogController_1.prototype, "config", {
            get: function () {
                return this.pipChangePasswordViewModel.config;
            },
            enumerable: true,
            configurable: true
        });
        ChangePasswordDialogController_1.prototype.onChange = function () {
            var _this = this;
            this.pipChangePasswordViewModel.onChange(function () {
                _this.goBack();
            });
        };
        return ChangePasswordDialogController_1;
    }());
    angular.module('pipEntry.ChangePasswordDialog', ['pipEntry.Common', "pipChangePasswordPanel"])
        .service('pipChangePasswordDialog', ChangePasswordDialogService);
}
},{}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EntryModel_1 = require("../common/EntryModel");
var ChangePasswordModel = (function (_super) {
    __extends(ChangePasswordModel, _super);
    ChangePasswordModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipAuthState', 'pipFormErrors', 'pipRest', 'pipTranslate', 'pipEntryData', 'pipEntry', 'pipToasts'];
    function ChangePasswordModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipTranslate, pipEntryData, pipEntry, pipToasts) {
        "ngInject";
        var _this = _super.call(this, pipEntryCommon) || this;
        _this.$rootScope = $rootScope;
        _this.$location = $location;
        _this.$state = $state;
        _this.$injector = $injector;
        _this.pipAuthState = pipAuthState;
        _this.pipFormErrors = pipFormErrors;
        _this.pipRest = pipRest;
        _this.pipTranslate = pipTranslate;
        _this.pipEntryData = pipEntryData;
        _this.pipEntry = pipEntry;
        _this.pipToasts = pipToasts;
        _this.transaction = pipTransaction.create('entry.change_password');
        return _this;
    }
    ChangePasswordModel.prototype.init = function ($scope) {
        this.initModel($scope);
        this.setElementVisability();
    };
    ChangePasswordModel.prototype.setElementVisability = function () {
        this.hideObject.subTitle = new Boolean(this.hideObject.subTitle) == true;
        this.hideObject.title = new Boolean(this.hideObject.title) == true;
        this.hideObject.server = new Boolean(this.hideObject.server) == true;
        this.hideObject.hint = new Boolean(this.hideObject.hint) == true;
        this.hideObject.progress = new Boolean(this.hideObject.progress) == true;
    };
    ChangePasswordModel.prototype.onShowToast = function (message, type) {
        if (!message)
            return;
        message = this.pipTranslate.translate(message);
        type = type || 'message';
        if (type == 'message') {
            this.pipToasts.showMessage(message, null, null, null);
            return;
        }
        if (type == 'error') {
            this.pipToasts.showError(message, null, null, null, null);
            return;
        }
    };
    ChangePasswordModel.prototype.onChange = function (callback) {
        var _this = this;
        if (this.config.form.$invalid) {
            this.pipFormErrors.resetFormErrors(this.config.form, true);
            return;
        }
        var transactionId = this.transaction.begin('PROCESSING');
        if (!transactionId)
            return;
        if (!this.pipRest.lockServerUrl) {
            this.pipRest.serverUrl = this.config.data.serverUrl;
        }
        this.pipEntryData.expireChangePassword({
            login: this.config.data.login,
            old_password: this.config.data.password,
            new_password: this.config.data.passwordNew,
            user_id: this.pipEntryData.getUserId()
        }, function (data) {
            _this.pipFormErrors.resetFormErrors(_this.config.form, false);
            if (_this.transaction.aborted(transactionId))
                return;
            var message = String() + 'CHANGE_PWD_SUCCESS_TEXT';
            _this.onShowToast(message, 'message');
            _this.transaction.end();
            if (callback)
                callback();
            _this.pipEntry.signout(function () {
                _this.$state.go('signin', {
                    server_url: _this.config.data.serverUrl,
                    login: _this.config.data.login
                });
            });
        }, function (error) {
            _this.transaction.end(error);
            _this.pipFormErrors.resetFormErrors(_this.config.form, true);
            _this.pipFormErrors.setFormError(_this.config.form, error, {
                'NO_LOGIN': 'login',
                'WRONG_LOGIN': 'login',
                'LOGIN_NOT_FOUND': 'login',
                'WRONG_PASSWORD': 'password',
                'act_execute': 'form',
                'UNKNOWN': 'form',
                '-1': 'form'
            });
        });
    };
    return ChangePasswordModel;
}(EntryModel_1.EntryModel));
exports.ChangePasswordModel = ChangePasswordModel;
},{"../common/EntryModel":10}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var ChangePasswordPanelBindings = {};
    var ChangePasswordPanelController = (function () {
        ChangePasswordPanelController.$inject = ['$scope', 'pipFormErrors', 'pipRest', 'pipChangePasswordViewModel'];
        function ChangePasswordPanelController($scope, pipFormErrors, pipRest, pipChangePasswordViewModel) {
            "ngInject";
            this.$scope = $scope;
            this.pipFormErrors = pipFormErrors;
            this.pipRest = pipRest;
            this.pipChangePasswordViewModel = pipChangePasswordViewModel;
            this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
            pipChangePasswordViewModel.initModel($scope);
        }
        ChangePasswordPanelController.prototype.$postLink = function () {
            this.config.form = this.$scope.form;
            this.config.data.password = null;
            this.config.data.passwordNew = null;
        };
        Object.defineProperty(ChangePasswordPanelController.prototype, "config", {
            get: function () {
                return this.pipChangePasswordViewModel.config;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangePasswordPanelController.prototype, "transaction", {
            get: function () {
                return this.pipChangePasswordViewModel.transaction;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangePasswordPanelController.prototype, "showServerError", {
            get: function () {
                return this.pipChangePasswordViewModel.showServerError;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChangePasswordPanelController.prototype, "hideObject", {
            get: function () {
                return this.pipChangePasswordViewModel.hideObject;
            },
            enumerable: true,
            configurable: true
        });
        ChangePasswordPanelController.prototype.onShowToast = function (message, type) {
            this.pipChangePasswordViewModel.onShowToast(message, type);
        };
        ChangePasswordPanelController.prototype.onServerUrlChanged = function () {
            this.config.onServerUrlChanged(this.config.form, this.config.selected.searchURLs);
        };
        ChangePasswordPanelController.prototype.onChanged = function () {
            this.pipFormErrors.resetFormErrors(this.config.form, false);
            this.pipFormErrors.resetFieldsErrors(this.config.form, null);
            this.pipRest.serverUrl = this.config.selected.searchURLs;
            this.config.data.serverUrl = this.config.selected.searchURLs;
        };
        ChangePasswordPanelController.prototype.onChangePassword = function () {
            this.pipFormErrors.resetFieldsErrors(this.config.form, 'passwordNew');
        };
        ChangePasswordPanelController.prototype.onChangePasswordNew = function () {
            this.pipFormErrors.resetFieldsErrors(this.config.form, 'password');
            this.pipFormErrors.resetFieldsErrors(this.config.form, 'passwordConfirm');
        };
        ChangePasswordPanelController.prototype.onChangePasswordConfirm = function () {
            this.pipFormErrors.resetFieldsErrors(this.config.form, 'passwordNew');
        };
        return ChangePasswordPanelController;
    }());
    var ChangePasswordPanel = {
        bindings: ChangePasswordPanelBindings,
        controller: ChangePasswordPanelController,
        templateUrl: 'change_password/ChangePasswordPanel.html'
    };
    angular.module("pipChangePasswordPanel", ['pipFocused', 'pipEntry.Strings'])
        .component('pipChangePasswordPanel', ChangePasswordPanel);
}
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChangePasswordModel_1 = require("./ChangePasswordModel");
var ChangePasswordViewModel = (function () {
    ChangePasswordViewModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipAuthState', 'pipFormErrors', 'pipRest', 'pipEntry', 'pipTranslate', 'pipEntryData', 'pipToasts'];
    function ChangePasswordViewModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipEntry, pipTranslate, pipEntryData, pipToasts) {
        "ngInject";
        this.pipTranslate = pipTranslate;
        this.pipEntryData = pipEntryData;
        this.pipToasts = pipToasts;
        this.model = new ChangePasswordModel_1.ChangePasswordModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipTranslate, pipEntryData, pipEntry, pipToasts);
    }
    Object.defineProperty(ChangePasswordViewModel.prototype, "transaction", {
        get: function () {
            return this.model.transaction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChangePasswordViewModel.prototype, "hideObject", {
        get: function () {
            return this.model.hideObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChangePasswordViewModel.prototype, "showServerError", {
        get: function () {
            return this.model.showServerError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChangePasswordViewModel.prototype, "config", {
        get: function () {
            return this.model.config;
        },
        enumerable: true,
        configurable: true
    });
    ChangePasswordViewModel.prototype.initModel = function ($scope) {
        this.model.init($scope);
    };
    ChangePasswordViewModel.prototype.onShowToast = function (message, type) {
        this.model.onShowToast(message, type);
    };
    ChangePasswordViewModel.prototype.onChange = function (callback) {
        this.model.onChange(callback);
    };
    return ChangePasswordViewModel;
}());
exports.ChangePasswordViewModel = ChangePasswordViewModel;
angular.module('pipEntry.ChangePassword')
    .service('pipChangePasswordViewModel', ChangePasswordViewModel);
},{"./ChangePasswordModel":3}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var LinkEmailUnique_1 = (function () {
        LinkEmailUnique_1.$inject = ['$scope', '$element', '$attrs', 'ngModel', '$http', 'pipEntryData'];
        function LinkEmailUnique_1($scope, $element, $attrs, ngModel, $http, pipEntryData) {
            "ngInject";
            var _this = this;
            this.oldEmail = $attrs['pipEmailUnique'];
            $scope.$watch($attrs['ngModel'], _.throttle(function (newValue) {
                var oldHint = ngModel.$validators.emailUnique;
                if (!newValue || newValue.length == 0 || _this.oldEmail == newValue) {
                    ngModel.$setValidity('emailUnique', oldHint);
                    return;
                }
                if (!newValue)
                    ngModel.$setValidity('emailUnique', true);
                pipEntryData.signupValidate(newValue, function (data) {
                    ngModel.$setValidity('emailUnique', true);
                }, function (err) {
                    ngModel.$setValidity('emailUnique', false);
                });
            }, 500));
        }
        return LinkEmailUnique_1;
    }());
    angular.module('pipEmailUnique', ['ngResource', 'pipEntryData'])
        .directive('pipEmailUnique', ['$http', 'pipEntryData', function ($http, pipEntryData) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function ($scope, $element, $attrs, ngModel) {
                new LinkEmailUnique_1($scope, $element, $attrs, ngModel, $http, pipEntryData);
            }
        };
    }]);
}
},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntryPageConfig_1 = require("./EntryPageConfig");
var EntryCommonService = (function () {
    EntryCommonService.$inject = ['$rootScope', '$state', 'pipAppBar', 'pipNavService', 'pipRest', 'pipEntry', 'pipFormErrors', 'pipIdentity', 'pipTranslate', 'localStorageService'];
    function EntryCommonService($rootScope, $state, pipAppBar, pipNavService, pipRest, pipEntry, pipFormErrors, pipIdentity, pipTranslate, localStorageService) {
        "ngInject";
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.pipAppBar = pipAppBar;
        this.pipNavService = pipNavService;
        this.pipRest = pipRest;
        this.pipEntry = pipEntry;
        this.pipFormErrors = pipFormErrors;
        this.pipIdentity = pipIdentity;
        this.pipTranslate = pipTranslate;
        this.localStorageService = localStorageService;
        this._config = new EntryPageConfig_1.EntryPageConfig();
    }
    EntryCommonService.prototype.getLastUsedLogin = function (serverUrl) {
        var servers = this.localStorageService.get('servers');
        if (servers && servers[serverUrl]) {
            return servers[serverUrl].login;
        }
        return undefined;
    };
    EntryCommonService.prototype.getPastSessions = function () {
        var servers = this.localStorageService.get('servers') || {};
        return servers;
    };
    EntryCommonService.prototype.getUsedServerUrls = function () {
        var servers = this.localStorageService.get('servers') || {};
        var serverUrls = [];
        var serverUrl;
        for (var prop in servers) {
            if (servers.hasOwnProperty(prop)) {
                serverUrl = servers[prop].serverUrl;
                if (serverUrl) {
                    serverUrls.push(serverUrl);
                }
            }
        }
        return serverUrls;
    };
    EntryCommonService.prototype.configureAppBar = function () {
        this.pipNavService.sidenav.hide();
        this.pipNavService.actions.hide();
        this.pipNavService.appbar.part('menu', false);
        if (this.pipEntry.showLanguage) {
            this.pipNavService.appbar.part('actions', 'language');
        }
        if (this.pipEntry.appbarTitle) {
            this.pipNavService.appbar.part('title', 'breadcrumb');
        }
        else {
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
    ;
    EntryCommonService.prototype.initScope = function ($scope) {
        var _this = this;
        this._config.appbarTitle = this.pipEntry.appbarTitle;
        this._config.showIcon = this.pipEntry.showIcon;
        this._config.showLanguage = this.pipEntry.showLanguage;
        this._config.adminOnly = this.pipEntry.adminOnly;
        this._config.fixedServerUrl = this.pipEntry.fixedServerUrl;
        this._config.enableAvatar = this.pipEntry.enableAvatar;
        this._config.useEmailAsLogin = this.pipEntry.useEmailAsLogin;
        this._config.entryHideObject = this.pipEntry.entryHideObject;
        var language = this.$state.params.language;
        if (language)
            this.pipTranslate.use(language);
        var email = null;
        if (this._config.useEmailAsLogin) {
            email = this.$state.params.email ? decodeURIComponent(this.$state.params.email) : this.$state.params.login ? decodeURIComponent(this.$state.params.login) : null;
        }
        else {
            email = this.$state.params.email ? decodeURIComponent(this.$state.params.email) : null;
        }
        var login = null;
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
        if (!this.$state['current'].auth) {
            if (this._config.data.serverUrl && !this._config.data.login && this.$state.name != 'signup') {
                var server = this._config.servers[this._config.data.serverUrl];
                this._config.data.login = (server || {}).login;
            }
        }
        this._config.filterItem = function (item) { return _this.filterItem(item); };
        this._config.getMatches = function (query) { return _this.getMatches(query); };
        this._config.onServerUrlChanged = function (form, url) { _this.onServerUrlChanged(form, url); };
        this._config.isEmpty = _.isEmpty;
        return _.cloneDeep(this._config);
    };
    EntryCommonService.prototype.filterItem = function (item) {
        var result = (this._config.selected.searchURLs && item
            && item.toLowerCase().indexOf(this._config.selected.searchURLs.toLowerCase()) >= 0);
        return result;
    };
    EntryCommonService.prototype.getMatches = function (query) {
        if (!query)
            return this._config.showServerUrl;
        this._config.data.serverUrl = query;
        this._config.selected.searchURLs = query;
        return _.filter(this._config.serverUrls, this._config.filterItem);
    };
    EntryCommonService.prototype.onServerUrlChanged = function (form, url) {
        form = form ? form : this._config.form;
        url = url ? url : this._config.selected.searchURLs;
        if (!url)
            return;
        var server = this._config.servers[url];
        if (server && this.$state.name != 'signup') {
            this._config.data.login = server.login;
            this.pipRest.serverUrl = url;
            this._config.data.serverUrl = url;
        }
        if (form) {
            this.pipFormErrors.resetFormErrors(form, false);
            this.pipFormErrors.resetFieldsErrors(form, null);
        }
    };
    return EntryCommonService;
}());
angular.module('pipEntry.CommonService', [])
    .service('pipEntryCommon', EntryCommonService);
},{"./EntryPageConfig":11}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntryHideObject = (function () {
    function EntryHideObject() {
        this.remember = false;
    }
    return EntryHideObject;
}());
exports.EntryHideObject = EntryHideObject;
},{}],9:[function(require,module,exports){
"use strict";
initEntry.$inject = ['pipEntry', '$rootScope', 'pipSession', 'pipDataCache', 'pipTimer'];
Object.defineProperty(exports, "__esModule", { value: true });
function initEntry(pipEntry, $rootScope, pipSession, pipDataCache, pipTimer) {
    $rootScope.$on(pip.services.SessionOpenedEvent, function (event, data) {
        pipDataCache.clear();
        pipTimer.start();
    });
    $rootScope.$on(pip.services.SessionClosedEvent, function (event, data) {
        pipDataCache.clear();
    });
    pipEntry.reopenSession();
}
angular.module('pipEntry.Service')
    .run(initEntry);
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntryModel = (function () {
    EntryModel.$inject = ['pipEntryCommon'];
    function EntryModel(pipEntryCommon) {
        "ngInject";
        this.pipEntryCommon = pipEntryCommon;
        this.showServerError = true;
    }
    EntryModel.prototype.initModel = function ($scope) {
        this.config = this.pipEntryCommon.initScope($scope);
        this.config.form = this.config.form || $scope.form;
        this.hideObject = this.config.entryHideObject;
    };
    return EntryModel;
}());
exports.EntryModel = EntryModel;
},{}],11:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EntryService_1 = require("./EntryService");
var EntryPageConfig = (function (_super) {
    __extends(EntryPageConfig, _super);
    function EntryPageConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showServerUrl = false;
        return _this;
    }
    return EntryPageConfig;
}(EntryService_1.EntryConfig));
exports.EntryPageConfig = EntryPageConfig;
var EntryDataConfig = (function () {
    function EntryDataConfig() {
    }
    return EntryDataConfig;
}());
exports.EntryDataConfig = EntryDataConfig;
var SigninParams = (function () {
    function SigninParams() {
    }
    return SigninParams;
}());
exports.SigninParams = SigninParams;
var SignupParams = (function () {
    function SignupParams() {
    }
    return SignupParams;
}());
exports.SignupParams = SignupParams;
var AuthSessionData = (function () {
    function AuthSessionData() {
        this.serverUrl = undefined;
        this.sessionId = undefined;
        this.userId = undefined;
    }
    return AuthSessionData;
}());
exports.AuthSessionData = AuthSessionData;
var PastSession = (function () {
    function PastSession() {
    }
    return PastSession;
}());
exports.PastSession = PastSession;
},{"./EntryService":12}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntryPageConfig_1 = require("./EntryPageConfig");
var EntryHideObject_1 = require("./EntryHideObject");
var EntryConfig = (function () {
    function EntryConfig() {
    }
    return EntryConfig;
}());
exports.EntryConfig = EntryConfig;
var EntryService = (function () {
    EntryService.$inject = ['config', 'pipRest', 'localStorageService', '$cookies', '$cookieStore', 'pipSession', 'pipIdentity', 'pipTimer', 'pipTranslate', 'pipTheme', '$timeout', 'pipAuthState'];
    function EntryService(config, pipRest, localStorageService, $cookies, $cookieStore, pipSession, pipIdentity, pipTimer, pipTranslate, pipTheme, $timeout, pipAuthState) {
        "ngInject";
        var _this = this;
        this.config = config;
        this.pipRest = pipRest;
        this.localStorageService = localStorageService;
        this.$cookies = $cookies;
        this.$cookieStore = $cookieStore;
        this.pipSession = pipSession;
        this.pipIdentity = pipIdentity;
        this.pipTimer = pipTimer;
        this.pipTranslate = pipTranslate;
        this.pipTheme = pipTheme;
        this.$timeout = $timeout;
        this.pipAuthState = pipAuthState;
        this.pipSession.addOpenListener(function (callback) {
            _this.restoreSession(callback);
        });
    }
    EntryService.prototype.restore = function (data) {
        var result = new EntryPageConfig_1.AuthSessionData();
        for (var property in data) {
            if (data.hasOwnProperty(property)) {
                if (!_.isObject(data[property])) {
                    result[property] = this.$cookies.get(property) || this.localStorageService.get(property);
                }
                else {
                    result[property] = data[property];
                }
            }
        }
        return result;
    };
    EntryService.prototype.storeToLocal = function (data) {
        for (var property in data) {
            if (data.hasOwnProperty(property) && !_.isObject(data[property])) {
                this.localStorageService.set(property, data[property]);
            }
        }
    };
    EntryService.prototype.removeLocal = function (data) {
        for (var property in data) {
            if (data.hasOwnProperty(property) && !_.isObject(data[property])) {
                this.localStorageService.remove(property);
            }
        }
    };
    EntryService.prototype.storeToCookie = function (data) {
        for (var property in data) {
            if (data.hasOwnProperty(property) && !_.isObject(data[property])) {
                this.$cookies.put(property, data[property], { path: '/' });
            }
        }
    };
    EntryService.prototype.removeCookie = function (data) {
        for (var property in data) {
            if (data.hasOwnProperty(property) && !_.isObject(data[property])) {
                this.$cookies.remove(property);
            }
        }
    };
    EntryService.prototype.storeKnownServer = function (value) {
        if (!value)
            return;
        this.$cookies.put(value, value, { path: '/' });
        this.localStorageService.set(value, value);
    };
    Object.defineProperty(EntryService.prototype, "appbarIcon", {
        get: function () {
            return this.config.appbarIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryService.prototype, "appbarTitle", {
        get: function () {
            return this.config.appbarTitle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryService.prototype, "showIcon", {
        get: function () {
            return this.config.showIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryService.prototype, "showLanguage", {
        get: function () {
            return this.config.showLanguage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryService.prototype, "adminOnly", {
        get: function () {
            return this.config.adminOnly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryService.prototype, "fixedServerUrl", {
        get: function () {
            return this.config.fixedServerUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryService.prototype, "passwordExpire", {
        get: function () {
            return this.config.passwordExpire;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryService.prototype, "entryHideObject", {
        get: function () {
            return this.config.entryHideObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryService.prototype, "enableAvatar", {
        get: function () {
            return this.config.enableAvatar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryService.prototype, "useEmailAsLogin", {
        get: function () {
            return this.config.useEmailAsLogin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryService.prototype, "isPostSignup", {
        get: function () {
            return this.config.isPostSignup;
        },
        enumerable: true,
        configurable: true
    });
    EntryService.prototype.openSession = function (data, remember) {
        var session = new EntryPageConfig_1.AuthSessionData();
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
        this.pipRest.setHeaders({
            'x-session-id': session.sessionId
        });
        if (remember) {
            var servers = this.localStorageService.get('servers') || {};
            servers[session.serverUrl] = {
                serverUrl: session.serverUrl,
                login: data.user.login
            };
            this.localStorageService.set('servers', servers);
            this.storeToLocal(session);
        }
        this.storeKnownServer(session.serverUrl);
        this.storeToCookie(session);
        this.pipIdentity.identity = data;
        this.pipSession.open(session);
        this.pipTranslate.use(data.user.language);
        if (data.user.theme && data.user.theme != this.pipTheme.theme) {
            this.pipTheme.use(data.user.theme);
        }
    };
    EntryService.prototype.getUserId = function (data) {
        if (!data) {
            return null;
        }
        var id;
        id = data.user_id ? data.user_id : data.user ? data.user.id : null;
        return id;
    };
    EntryService.prototype.checkEmailVerification = function (data) {
        return (data.user && data.user.settings &&
            data.user.settings['verified_email'] && data.user.settings['verified_email'] == "true");
    };
    EntryService.prototype.restoreSessionComplete = function (data, callback) {
        if (angular.isFunction(callback)) {
            callback();
        }
        this.pipIdentity.identity = data;
        this.pipTranslate.use(data.user.language);
    };
    EntryService.prototype.restoreSession = function (callback) {
        var _this = this;
        if (this.sessionState === 'open') {
            if (angular.isFunction(callback)) {
                callback();
            }
            return;
        }
        var session = new EntryPageConfig_1.AuthSessionData();
        session = this.restore(session);
        if (!session || !session.sessionId) {
            this.signout(function () {
                _this.pipAuthState.goToUnauthorized({});
            });
            return;
        }
        this.pipRest.getResource('restoreSessions').call({
            session_id: session.sessionId
        }, function (data) {
            if (!data || !data.id) {
                _this.signout(function () {
                    _this.pipAuthState.goToUnauthorized({});
                });
                return;
            }
            session.userId = _this.getUserId(data);
            session.serverUrl = _this.pipRest.serverUrl;
            _this.storeToCookie(session);
            if (_this.checkEmailVerification(data)) {
                _this.restoreSessionComplete(data, callback);
            }
            else {
                _this.pipRest.getResource('email_settings').get({
                    user_id: data.user.id
                }, function (setting) {
                    if (setting && setting.verified && setting.email == data.user.login) {
                        _this.restoreSessionComplete(data, callback);
                    }
                    else {
                        _this.restoreSessionComplete(data, function () {
                            if (callback)
                                callback();
                            _this.pipAuthState.go('verify_email', { email: data.user.login || data.user['email'], serverUrl: _this.pipRest.serverUrl });
                        });
                    }
                }, function (error) {
                });
            }
        }, function (error) {
            if (angular.isFunction(callback)) {
                callback(error);
            }
            _this.signout(function () {
                _this.pipAuthState.goToUnauthorized({});
            });
        });
    };
    EntryService.prototype.reopenSession = function () {
        var _this = this;
        var session = new EntryPageConfig_1.AuthSessionData();
        session = this.restore(session);
        if (!session || !session.sessionId) {
            this.signout(function () {
                _this.pipAuthState.goToUnauthorized({});
            });
            return;
        }
        this.sessionState = 'reopen';
        this.pipRest.setHeaders({
            'x-session-id': session.sessionId
        });
        if ((!this.pipRest.lockServerUrl || !this.pipRest.serverUrl) && session.serverUrl) {
            this.pipRest.serverUrl = session.serverUrl;
        }
        this.pipSession.open(session);
    };
    EntryService.prototype.closeSession = function () {
        var session = new EntryPageConfig_1.AuthSessionData();
        session.sessionId = null;
        session.userId = null;
        session.serverUrl = null;
        this.pipRest.setHeaders({
            'x-session-id': undefined
        });
        this.pipIdentity.identity = null;
        this.removeLocal(session);
        this.removeCookie(session);
        this.pipTimer.stop();
        this.pipSession.close();
    };
    EntryService.prototype.signout = function (successCallback) {
        if (this.pipSession.isOpened()) {
            this.pipRest.getResource('signout').call({}, successCallback, successCallback);
        }
        this.closeSession();
    };
    return EntryService;
}());
var EntryProvider = (function () {
    function EntryProvider() {
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
        this.config.entryHideObject = new EntryHideObject_1.EntryHideObject();
    }
    Object.defineProperty(EntryProvider.prototype, "appbarIcon", {
        set: function (newAppbarIcon) {
            this.config.appbarIcon = newAppbarIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryProvider.prototype, "appbarTitle", {
        set: function (newAppbarTitle) {
            this.config.appbarTitle = newAppbarTitle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryProvider.prototype, "showIcon", {
        set: function (newShowIcon) {
            this.config.showIcon = newShowIcon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryProvider.prototype, "showLanguage", {
        set: function (newShowLanguage) {
            this.config.showLanguage = newShowLanguage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryProvider.prototype, "adminOnly", {
        set: function (newAdminOnly) {
            this.config.adminOnly = newAdminOnly;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryProvider.prototype, "fixedServerUrl", {
        set: function (newFixedServerUrl) {
            this.config.fixedServerUrl = newFixedServerUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryProvider.prototype, "passwordExpire", {
        set: function (value) {
            this.config.passwordExpire = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryProvider.prototype, "entryHideObject", {
        set: function (entryHideObject) {
            this.config.entryHideObject = entryHideObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryProvider.prototype, "enableAvatar", {
        set: function (value) {
            this.config.enableAvatar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryProvider.prototype, "useEmailAsLogin", {
        set: function (value) {
            this.config.useEmailAsLogin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntryProvider.prototype, "isPostSignup", {
        set: function (value) {
            this.config.isPostSignup = value;
        },
        enumerable: true,
        configurable: true
    });
    EntryProvider.prototype.$get = ['pipRest', 'localStorageService', '$cookies', '$cookieStore', 'pipSession', 'pipIdentity', 'pipTimer', 'pipTranslate', 'pipTheme', '$timeout', 'pipAuthState', function (pipRest, localStorageService, $cookies, $cookieStore, pipSession, pipIdentity, pipTimer, pipTranslate, pipTheme, $timeout, pipAuthState) {
        "ngInject";
        if (_.isNull(this._service) || _.isUndefined(this._service)) {
            this._service = new EntryService(this.config, pipRest, localStorageService, $cookies, $cookieStore, pipSession, pipIdentity, pipTimer, pipTranslate, pipTheme, $timeout, pipAuthState);
        }
        return this._service;
    }];
    return EntryProvider;
}());
angular.module('pipEntry.Service', [])
    .provider('pipEntry', EntryProvider);
},{"./EntryHideObject":8,"./EntryPageConfig":11}],13:[function(require,module,exports){
(function () {
    'use strict';
    angular.module('pipEntry.Strings', [])
        .config(['pipTranslateProvider', function (pipTranslateProvider) {
        pipTranslateProvider.translations('en', {
            'FULLNAME': 'First and last name',
            'EMAIL': 'Email',
            'LOGIN': 'Login',
            'PASSWORD': 'Password',
            'LANGUAGE': 'Language',
            'GENDER': 'Gender',
            'BIRTHDAY': 'Birthday',
            'LOCATION': 'Location',
            'VERIFY': 'Verify',
            'CONTINUE': 'Continue',
            'HINT_FULLNAME': "Use your real name, so others know who you are",
            'HINT_PASSWORD': 'Minimum 6 characters',
            'SIGNIN_HINT_PASSWORD': 'Please, type password',
            'HINT_ABOUT': 'Few words about yourself',
            'VERIFY_EMAIL': 'Please, verify your email address. ',
            'HINT_EMAIL': 'Enter your email address, please',
            'VERIFY_LOGIN': 'Please, verify your login address. ',
            'HINT_LOGIN': 'Enter your login, please',
            'SIGNIN_TITLE': 'Sign in',
            'SIGNIN_NOT_MEMBER': 'Not a member?',
            'SIGNIN_REMEMBER': 'Remember',
            'SIGNIN_FORGOT_PASSWORD': 'Forgot password?',
            'SIGNIN_SIGNUP_HERE': ' Sign up here',
            'SIGNUP_TITLE': 'Sign up',
            'SIGNUP_NOT_MEMBER': 'Not a member? Sign up now',
            'SIGNUP_TEXT_11': 'By clicking Sign up, you agree to the',
            'SIGNUP_PRIVACY': 'privacy statement',
            'SIGNUP_TEXT_12': 'and',
            'SIGNUP_SERVICES': 'services agreement',
            'SIGNUP_TEXT_2': 'Do you have an account?',
            'SIGNUP_SIGNIN_HERE': ' Sign in here',
            'SIGNUP_EMAIL_REGISTERED': 'This email is already registered',
            'SIGNUP_LOGIN_REGISTERED': 'This login is already registered',
            'SIGNUP_FULLNAME_WRONG': 'xxxx',
            'SIGNUP_EMAIL_WRONG': 'xxxx',
            'SIGNUP_LOGIN_WRONG': 'xxxx',
            'POST_SIGNUP_TITLE': 'Welcome to Pip.Life',
            'POST_SIGNUP_TEXT_1': 'Your account was successfully created.',
            'POST_SIGNUP_TEXT_2': 'Tell us some more about yourself.',
            'RECOVER_PWD_TITLE': 'Forgot password?',
            'RECOVER_PWD_TEXT_1_LOGIN': "Enter the login you used when you joined and we'll send you instructions to reset your password.",
            'RECOVER_PWD_TEXT_1_EMAIL': "Enter the e-mail you used when you joined and we'll send you instructions to reset your password.",
            'RECOVER_PWD_TEXT_2': 'For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.',
            'RECOVER_PWD_RECOVER': 'Recover password',
            'RESET_PWD_PASSWORD': 'Reset password',
            'RESET_PWD_TEXT_LOGIN': 'Enter the login together with the reset code you received in email from. Remember the code is only active for 24 hours.',
            'RESET_PWD_TEXT_EMAIL': 'Enter the e-mail together with the reset code you received in email from. Remember the code is only active for 24 hours.',
            'RESET_PWD_SUCCESS_TEXT': 'Your password was successfully changed',
            'VERIFY_EMAIL_WAIT': 'Email verification. Please, wait.',
            'VERIFY_EMAIL_TITLE': 'Email verification',
            'VERIFY_EMAIL_TEXT_1': 'Confirm your email address using verification code',
            'VERIFY_EMAIL_TEXT_21': "If you haven't received the code, press ",
            'VERIFY_EMAIL_RESEND': 'resend',
            'VERIFY_EMAIL_TEXT_22': 'to send it again.',
            'VERIFY_EMAIL_SUCCESS_TEXT': 'Your email address was successfully verified. Thank you!',
            'PASSWORD_MATCH': 'Passwords don\'t match',
            'PASSWORD_CONFIRM': 'Confirm the password',
            'PASSWORD_SET': 'Set a password',
            'ENTRY_CHANGE_SERVER': 'Change server',
            'ENTRY_SERVER_URL': 'Server URL',
            'ENTRY_RESET_CODE': 'Reset code',
            'ENTRY_VERIFICATION_CODE': 'Verification code',
            'ENTRY_NEW_PASSWORD': 'New password',
            'ENTRY_SET_PASSWORD': 'Set Password',
            'ENTRY_RESET_PASSWORD': 'Set',
            'ENTRY_FREE': 'Free',
            'ENTRY_REPEAT': 'Repeat',
            'CHANGE_PWD_PASSWORD': 'Change password',
            'EXPIRE_CHANGE_PWD_PASSWORD': 'Change expire password',
            'CHANGE_PWD_TEXT': 'Enter a new password to login.',
            'EXPIRE_CHANGE_PWD_TEXT': 'Your password has expired. Enter a new password to login.',
            'ENTRY_CHANGE_PASSWORD': 'Change',
            'ENTRY_EXPIRE_CHANGE_PASSWORD': 'Change',
            'OLD_PASSWORD': 'Current password',
            'NEW_PASSWORD_SET': 'New password',
            'NEW_PASSWORD_CONFIRM': 'Repeat password',
            'CHANGE_PWD_SUCCESS_TEXT': 'Password changed successfuly',
            'EXPIRE_CHANGE_PWD_SUCCESS_TEXT': 'Password changed successfuly',
            'ERROR_EMAIL_INVALID': 'Enter a valid email',
            'ERROR_LOGIN_INVALID': 'Enter a valid login',
            'ERROR_PASSWORD_INVALID': 'Enter a valid password',
            'MINLENGTH_PASSWORD': 'Minimum password length 6 characters',
            'ERROR_FULLNAME_INVALID': 'Enter full name',
            'ERROR_CODE_INVALID': 'Enter a code from mail',
            'ERROR_CODE_WRONG': 'Wrong recovery code',
            'ERROR_SERVER_INVALID': 'Enter server URL',
            'LANGUAGE_RUSSIAN': 'Russian',
            'LANGUAGE_ENGLISH': 'English',
            'ERROR_ACT_EXECUTE': 'Bad Request. User was not found.',
            'ERROR_WRONG_LOGIN': 'Account was not found',
            'ERROR_LOGIN_NOT_FOUND': 'Account was not found',
            'ERROR_NO_LOGIN': 'Missing account login',
            'ERROR_WRONG_PASSWORD': 'Invalid password',
            'ERROR_WRONG_CODE': 'Invalid password recovery code',
            'ERROR_INVALID_CODE': 'Invalid email verification code',
            'ERROR_NO_EMAIL': 'Missing email',
            'ERROR_NO_NAME': 'Missing account name',
            'ERROR_ALREADY_EXIST': 'User account already exist',
            'ERROR_LOGIN_ALREADY_USED': 'User account already exist',
            'ERROR_ALREADY_EXIST_EMAIL': 'User account already exist',
            'ERROR_WRONG_LOGIN_EMAIL': 'Account was not found',
            'ERROR_NO_LOGIN_EMAIL': 'Missing account login',
            'ERROR_SERVER': 'Server is not responding',
            'ERROR_ACCOUNT_LOCKED': 'Number of attempts exceeded. You account was locked.',
            'ERROR_UNKNOWN': 'Unknown error',
            'PASSWORD_IDENTICAL': 'Old and new passwords are identical'
        });
        pipTranslateProvider.translations('ru', {
            'FULLNAME': 'Имя и фамилия',
            'EMAIL': 'Адрес эл.почты',
            'LOGIN': 'Логин',
            'PASSWORD': 'Пароль',
            'LANGUAGE': 'Язык',
            'GENDER': 'Пол',
            'BIRTHDAY': 'Дата рождения',
            'LOCATION': 'Местонахождение',
            'VERIFY': 'Подтвердить',
            'CONTINUE': 'Продолжить',
            'HINT_FULLNAME': "Пожалуйста, введите свое полное имя - так, как вы хотите чтобы вас видели другие пользователи.",
            'HINT_PASSWORD': 'Минимум 6 символов',
            'SIGNIN_HINT_PASSWORD': 'Введите пароль',
            'HINT_ABOUT': 'Несколько слов о себе',
            'VERIFY_EMAIL': 'Подтвердите адрес своей эл.почты',
            'HINT_EMAIL': 'Введите адрес своей эл.почты',
            'VERIFY_LOGIN': 'Подтвердите свой логин',
            'HINT_LOGIN': 'Введите свой логин',
            'SIGNIN_TITLE': 'Вход в систему',
            'SIGNIN_NOT_MEMBER': 'Еще не зарегистрировались?',
            'SIGNIN_REMEMBER': 'Запомнить',
            'SIGNIN_FORGOT_PASSWORD': 'Забыли пароль?',
            'SIGNIN_SIGNUP_HERE': ' Зарегистрироваться здесь',
            'SIGNUP_TITLE': 'Регистрация',
            'SIGNUP_NOT_MEMBER': 'Новенький? Зарегистрируйтесь сейчас',
            'SIGNUP_TEXT_11': 'Нажимая кнопку регистрация, я соглашаюсь с',
            'SIGNUP_SERVICES': 'договором об услугах',
            'SIGNUP_TEXT_12': 'и',
            'SIGNUP_PRIVACY': 'соглашением о личных данных',
            'SIGNUP_TEXT_2': 'Уже зарегистрировались?',
            'SIGNUP_SIGNIN_HERE': ' Вход здесь',
            'SIGNUP_EMAIL_REGISTERED': 'Введенный адрес эл.почты уже занят',
            'SIGNUP_LOGIN_REGISTERED': 'Введенный логин уже занят',
            'POST_SIGNUP_TITLE': 'Добро пожаловать в Pip.Life',
            'POST_SIGNUP_TEXT_1': 'Ваша учетная запись создана.',
            'POST_SIGNUP_TEXT_2': 'Несклько слов о о себе',
            'RECOVER_PWD_TITLE': 'Забыли пароль?',
            'RECOVER_PWD_TEXT_1_LOGIN': 'Введите логин, который вы использовали при регистрации и мы вышлем вам инструкции как изменить пароль.',
            'RECOVER_PWD_TEXT_1_EMAIL': 'Введите эл. почту, которую вы использовали при регистрации и мы вышлем вам инструкции как изменить пароль.',
            'RECOVER_PWD_TEXT_2': 'По соображениям безопасности мы НЕ храним пароли. Таким образом, мы никогда не пошлем ваш пароль по электронной почте.',
            'RECOVER_PWD_RECOVER': 'Восстановить пароль',
            'RESET_PWD_PASSWORD': 'Изменить пароль',
            'RESET_PWD_TEXT_LOGIN': 'Введите логин вместе с кодом, который вы получили в почтовом сообщении. Помните, что код действителен только 24 часа.',
            'RESET_PWD_TEXT_EMAIL': 'Введите эл. почту вместе с кодом, который вы получили в почтовом сообщении. Помните, что код действителен только 24 часа.',
            'RESET_PWD_SUCCESS_TEXT': 'Ваш пароль успешно изменён',
            'VERIFY_EMAIL_WAIT': 'Верификация эл. почты. Подождите немного.',
            'VERIFY_EMAIL_TITLE': 'Подтверждение адреса эл.почты',
            'VERIFY_EMAIL_TEXT_1': 'Введите код, который вы получили по эл.почте',
            'VERIFY_EMAIL_TEXT_21': "Если вы не получили почтовое сообщение с кодом, нажмите ",
            'VERIFY_EMAIL_RESEND': 'отправить снова',
            'VERIFY_EMAIL_TEXT_22': '.',
            'VERIFY_EMAIL_SUCCESS_TEXT': 'Адрес вашей электронной почты успешно подтвержден. Спасибо!',
            'PASSWORD_MATCH': 'Пароли не совпадают',
            'PASSWORD_CONFIRM': 'Подтвердите пароль',
            'PASSWORD_SET': 'Задайте пароль',
            'ENTRY_CHANGE_SERVER': 'Изменить сервер',
            'ENTRY_SERVER_URL': 'URL сервера',
            'ENTRY_RESET_CODE': 'Код сброса пароля',
            'ENTRY_VERIFICATION_CODE': 'Код проверки электронной почты',
            'ENTRY_NEW_PASSWORD': 'Новый пароль',
            'ENTRY_SET_PASSWORD': 'Изменить пароль',
            'ENTRY_RESET_PASSWORD': 'Изменить',
            'ENTRY_FREE': 'бесплатно',
            'ENTRY_REPEAT': 'Повторить',
            'CHANGE_PWD_PASSWORD': 'Изменение пароля',
            'EXPIRE_CHANGE_PWD_PASSWORD': 'Изменение пароля',
            'CHANGE_PWD_TEXT': 'Для входа введите новый пароль.',
            'EXPIRE_CHANGE_PWD_TEXT': 'Время действия Вашего пароля истекло. Для входа введите новый пароль.',
            'ENTRY_CHANGE_PASSWORD': 'Изменить',
            'ENTRY_EXPIRE_CHANGE_PASSWORD': 'Изменить',
            'OLD_PASSWORD': 'Текущий пароль',
            'NEW_PASSWORD_SET': 'Новый пароль',
            'NEW_PASSWORD_CONFIRM': 'Повторите пароль',
            'CHANGE_PWD_SUCCESS_TEXT': 'Пароль был успешно изменен',
            'EXPIRE_CHANGE_PWD_SUCCESS_TEXT': 'Пароль был успешно изменен',
            'ERROR_EMAIL_INVALID': 'Введите адрес электронной почты',
            'ERROR_LOGIN_INVALID': 'Введите логин',
            'ERROR_PASSWORD_INVALID': 'Введите пароль',
            'MINLENGTH_PASSWORD': 'Минимальная длинна пароля 6 символов',
            'ERROR_FULLNAME_INVALID': 'Введите полное имя',
            'ERROR_CODE_INVALID': 'Введите код',
            'ERROR_CODE_WRONG': 'Неправильный код',
            'ERROR_SERVER_INVALID': 'Введите URL сервера',
            'LANGUAGE_RUSSIAN': 'Русский',
            'LANGUAGE_ENGLISH': 'Английский',
            'ERROR_ACT_EXECUTE': 'Неверный запрос. Пользователь не найден.',
            'ERROR_WRONG_LOGIN': 'Учетная запись пользователя не существует',
            'ERROR_LOGIN_NOT_FOUND': 'Учетная запись пользователя не существует',
            'ERROR_NO_LOGIN': 'Не задан логин',
            'ERROR_WRONG_PASSWORD': 'Не верный пароль',
            'ERROR_WRONG_CODE': 'Не верный код восстановления пароля',
            'ERROR_INVALID_CODE': 'Не верный код верификации электронной почты',
            'ERROR_NO_EMAIL': 'Не задан адресс электронной почты',
            'ERROR_NO_NAME': 'Не задано имя пользователя',
            'ERROR_ALREADY_EXIST': 'Логин уже зарегистрирован',
            'ERROR_LOGIN_ALREADY_USED': 'Логин уже зарегистрирован',
            'ERROR_ALREADY_EXIST_EMAIL': 'Логин уже зарегистрирован',
            'ERROR_WRONG_LOGIN_EMAIL': 'Учетная запись пользователя не существует',
            'ERROR_NO_LOGIN_EMAIL': 'Не задан логин',
            'ERROR_SERVER': 'Сервер не отвечает. Проверьте URL сервера.',
            'ERROR_ACCOUNT_LOCKED': 'Количесво попыток превышено. Ваша учетная запись заблокирована.',
            'ERROR_UNKNOWN': 'Неизвестная ошибка',
            'PASSWORD_IDENTICAL': 'Старый и новый пароль совпадают'
        });
    }]);
})();
},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],15:[function(require,module,exports){
compareOldPassword.$inject = ['$parse'];
compareNewPassword.$inject = ['$parse'];
comparePasswordMatch.$inject = ['$parse'];
function compareOldPassword($parse) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelCtrl) {
            ngModelCtrl['$validators'].ERROR_compareTo = function (modelValue, viewValue) {
                if (ngModelCtrl['$isEmpty'](modelValue)) {
                    return true;
                }
                var otherModelValue;
                var otherModelValueGetter = $parse(attrs.compareTo);
                if (!modelValue || !!otherModelValue)
                    return true;
                if (otherModelValueGetter) {
                    otherModelValue = otherModelValueGetter(scope);
                    return modelValue != otherModelValue;
                }
                else {
                    return true;
                }
            };
        }
    };
}
function compareNewPassword($parse) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelCtrl) {
            ngModelCtrl['$validators'].ERROR_compareTo = function (modelValue, viewValue) {
                if (ngModelCtrl['$isEmpty'](modelValue)) {
                    return true;
                }
                var otherModelValue;
                var otherModelValueGetter = $parse(attrs.compareTo1);
                if (!modelValue || !!otherModelValue)
                    return true;
                if (otherModelValueGetter) {
                    otherModelValue = otherModelValueGetter(scope);
                    return modelValue != otherModelValue;
                }
                else {
                    return true;
                }
            };
        }
    };
}
function comparePasswordMatch($parse) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModelCtrl) {
            ngModelCtrl['$validators'].ERROR_compareTo = function (modelValue, viewValue) {
                if (ngModelCtrl['$isEmpty'](modelValue)) {
                    return true;
                }
                var otherModelValue;
                var otherModelValueGetter = $parse(attrs.compareTo2);
                if (!modelValue || !!otherModelValue)
                    return true;
                if (otherModelValueGetter) {
                    otherModelValue = otherModelValueGetter(scope);
                    return modelValue == otherModelValue;
                }
                else {
                    return true;
                }
            };
        }
    };
}
angular.module('pipPasswordMatch', [])
    .directive('pipCompareOldPassword', compareOldPassword)
    .directive('pipCompareNewPassword', compareNewPassword)
    .directive('pipComparePasswordMatch', comparePasswordMatch);
},{}],16:[function(require,module,exports){
(function () {
    'use strict';
    angular.module('pipEntry.Common', ['pipEntry.CommonService', 'pipEntry.Service']);
})();
},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Account = (function () {
    function Account() {
    }
    return Account;
}());
exports.Account = Account;
},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmailSettings = (function () {
    function EmailSettings() {
    }
    return EmailSettings;
}());
exports.EmailSettings = EmailSettings;
},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EntryData = (function () {
    EntryData.$inject = ['$stateParams', 'pipRest', 'pipEntry', 'pipSession'];
    function EntryData($stateParams, pipRest, pipEntry, pipSession) {
        "ngInject";
        this.$stateParams = $stateParams;
        this.pipRest = pipRest;
        this.pipEntry = pipEntry;
        this.pipSession = pipSession;
    }
    EntryData.prototype.getUserId = function () {
        var userId;
        userId = this.pipSession.session ? this.pipSession.session.userId : null;
        return userId;
    };
    EntryData.prototype.signup = function (params, successCallback, errorCallback) {
        return this.pipRest.getResource('signup').call(params, successCallback, errorCallback);
    };
    EntryData.prototype.recoverPassword = function (params, successCallback, errorCallback) {
        return this.pipRest.getResource('recoverPassword').call({
            login: params.login
        }, successCallback, errorCallback);
    };
    EntryData.prototype.resetPassword = function (params, successCallback, errorCallback) {
        return this.pipRest.getResource('resetPassword').call({
            login: params.login,
            code: params.code,
            password: params.password
        }, successCallback, errorCallback);
    };
    EntryData.prototype.expireChangePassword = function (params, successCallback, errorCallback) {
        var param = params || {};
        param.user_id = this.getUserId();
        return this.pipRest.getResource('changePassword').save(param, successCallback, errorCallback);
    };
    EntryData.prototype.requestEmailVerification = function (params, successCallback, errorCallback) {
        return this.pipRest.getResource('requestEmailVerification').call({
            login: params.login
        }, successCallback, errorCallback);
    };
    EntryData.prototype.verifyEmail = function (params, successCallback, errorCallback) {
        return this.pipRest.getResource('verifyEmail').call(params, successCallback, errorCallback);
    };
    EntryData.prototype.readEmailSettings = function (params, successCallback, errorCallback) {
        var param = params || {};
        param.user_id = param.user_id ? param.user_id : this.getUserId();
        return this.pipRest.getResource('email_settings').get(params, successCallback, errorCallback);
    };
    EntryData.prototype.signupValidate = function (login, successCallback, errorCallback) {
        return this.pipRest.getResource('signupValidate').get({
            login: login
        }, successCallback, errorCallback);
    };
    EntryData.prototype.saveSettingsKey = function (section, key, value, successCallback, errorCallback) {
        return this.pipRest.getResource('settings').save({
            section: section,
            key: key
        }, { value: value }, function (data) {
            if (successCallback) {
                successCallback(data);
            }
        }, function (error) {
            if (errorCallback) {
                errorCallback(error);
            }
        });
    };
    return EntryData;
}());
angular
    .module('pipEntryData', ['pipRest'])
    .service('pipEntryData', EntryData);
},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GENDER = (function () {
    function GENDER() {
    }
    return GENDER;
}());
exports.GENDER = GENDER;
},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role = (function () {
    function Role() {
    }
    return Role;
}());
exports.Role = Role;
},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Session = (function () {
    function Session() {
    }
    return Session;
}());
exports.Session = Session;
},{}],25:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Session_1 = require("./Session");
var SessionData = (function (_super) {
    __extends(SessionData, _super);
    function SessionData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SessionData;
}(Session_1.Session));
exports.SessionData = SessionData;
},{"./Session":24}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SessionData = (function () {
    SessionData.$inject = ['$stateParams', 'pipRest', 'pipSession'];
    function SessionData($stateParams, pipRest, pipSession) {
        "ngInject";
        this.$stateParams = $stateParams;
        this.pipRest = pipRest;
        this.pipSession = pipSession;
        this.RESOURCE = 'sessions';
        this.RESOURCE_USER = 'userSessions';
        this.RESOURCE_RESTORE = 'restoreSessions';
    }
    SessionData.prototype.getSessionId = function () {
        var sessionId;
        sessionId = this.pipSession.session ? this.pipSession.session.sessionId : null;
        return sessionId;
    };
    SessionData.prototype.getUserId = function () {
        var userId;
        userId = this.pipSession.session ? this.pipSession.session.userId : null;
        return userId;
    };
    SessionData.prototype.getSessions = function (params, successCallback, errorCallback) {
        params = params || {};
        return this.pipRest.getResource(this.RESOURCE).call(params, successCallback, errorCallback);
    };
    SessionData.prototype.restoreSession = function (params, successCallback, errorCallback) {
        params = params || {};
        params.session_id = this.getSessionId();
        return this.pipRest.getResource(this.RESOURCE_RESTORE).call(params, successCallback, errorCallback);
    };
    SessionData.prototype.getUserSessions = function (params, successCallback, errorCallback) {
        params = params || {};
        params.user_id = this.getUserId();
        return this.pipRest.getResource(this.RESOURCE_USER).get(params, successCallback, errorCallback);
    };
    return SessionData;
}());
angular
    .module('pipSessionData', ['pipRest'])
    .service('pipSessionData', SessionData);
},{}],27:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("./Session");
require("./Account");
require("./Enums");
require("./Role");
require("./SessionData");
require("./SessionDataService");
require("./ISessionDataService");
require("./EntryDataService");
require("./IEntryDataService");
angular.module('pipEntry.Data', ['pipRest', 'pipEntryData', 'pipSessionData']);
__export(require("./Session"));
__export(require("./Account"));
__export(require("./Enums"));
__export(require("./Role"));
__export(require("./SessionData"));
},{"./Account":17,"./EntryDataService":19,"./Enums":20,"./IEntryDataService":21,"./ISessionDataService":22,"./Role":23,"./Session":24,"./SessionData":25,"./SessionDataService":26}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpireChangePasswordController = (function () {
    ExpireChangePasswordController.$inject = ['$state', 'pipExpireChangePasswordViewModel', 'pipEntryCommon', 'pipEntry', 'pipAuthState', 'pipSession', '$window'];
    function ExpireChangePasswordController($state, pipExpireChangePasswordViewModel, pipEntryCommon, pipEntry, pipAuthState, pipSession, $window) {
        "ngInject";
        this.pipExpireChangePasswordViewModel = pipExpireChangePasswordViewModel;
        this.$window = $window;
        pipEntryCommon.configureAppBar();
        if (pipEntry.passwordExpire === false || !pipSession.isOpened()) {
            $state.go(pipAuthState.signinState(), {});
        }
    }
    ExpireChangePasswordController.prototype.goBack = function () {
        this.$window.history.back();
    };
    Object.defineProperty(ExpireChangePasswordController.prototype, "config", {
        get: function () {
            return this.pipExpireChangePasswordViewModel.config;
        },
        enumerable: true,
        configurable: true
    });
    ExpireChangePasswordController.prototype.onChange = function () {
        this.pipExpireChangePasswordViewModel.onChange();
    };
    return ExpireChangePasswordController;
}());
exports.ExpireChangePasswordController = ExpireChangePasswordController;
{
    angular.module('pipEntry.ExpireChangePassword', ['pipEntry.Common', 'pipExpireChangePasswordPanel']);
}
},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var ExpireChangePasswordDialogService = (function () {
        ExpireChangePasswordDialogService.$inject = ['$mdDialog'];
        function ExpireChangePasswordDialogService($mdDialog) {
            this.$mdDialog = $mdDialog;
        }
        ;
        ExpireChangePasswordDialogService.prototype.show = function (params, successCallback, cancelCallback) {
            this.$mdDialog.show({
                targetEvent: params.event,
                templateUrl: 'expire_change_password/ExpireChangePasswordDialog.html',
                controller: ExpireChangePasswordDialogController_1,
                controllerAs: '$ctrl',
                locals: {
                    params: params
                },
                clickOutsideToClose: false
            })
                .then(function () {
                if (successCallback) {
                    successCallback();
                }
            }, function () {
                if (cancelCallback) {
                    cancelCallback();
                }
            });
        };
        return ExpireChangePasswordDialogService;
    }());
    var ExpireChangePasswordDialogController_1 = (function () {
        ExpireChangePasswordDialogController_1.$inject = ['$mdDialog', 'pipExpireChangePasswordViewModel'];
        function ExpireChangePasswordDialogController_1($mdDialog, pipExpireChangePasswordViewModel) {
            "ngInject";
            this.pipExpireChangePasswordViewModel = pipExpireChangePasswordViewModel;
            this.goBack = $mdDialog.cancel;
        }
        Object.defineProperty(ExpireChangePasswordDialogController_1.prototype, "config", {
            get: function () {
                return this.pipExpireChangePasswordViewModel.config;
            },
            enumerable: true,
            configurable: true
        });
        ExpireChangePasswordDialogController_1.prototype.onChange = function () {
            var _this = this;
            this.pipExpireChangePasswordViewModel.onChange(function () {
                _this.goBack();
            });
        };
        return ExpireChangePasswordDialogController_1;
    }());
    angular.module('pipEntry.ExpireChangePasswordDialog', ['pipEntry.Common', "pipExpireChangePasswordPanel"])
        .service('pipExpireChangePasswordDialog', ExpireChangePasswordDialogService);
}
},{}],30:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EntryModel_1 = require("../common/EntryModel");
var ExpireChangePasswordModel = (function (_super) {
    __extends(ExpireChangePasswordModel, _super);
    ExpireChangePasswordModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipAuthState', 'pipFormErrors', 'pipRest', 'pipTranslate', 'pipEntryData', 'pipEntry', 'pipToasts'];
    function ExpireChangePasswordModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipTranslate, pipEntryData, pipEntry, pipToasts) {
        "ngInject";
        var _this = _super.call(this, pipEntryCommon) || this;
        _this.$rootScope = $rootScope;
        _this.$location = $location;
        _this.$state = $state;
        _this.$injector = $injector;
        _this.pipAuthState = pipAuthState;
        _this.pipFormErrors = pipFormErrors;
        _this.pipRest = pipRest;
        _this.pipTranslate = pipTranslate;
        _this.pipEntryData = pipEntryData;
        _this.pipEntry = pipEntry;
        _this.pipToasts = pipToasts;
        _this.transaction = pipTransaction.create('entry.expire_change_password');
        return _this;
    }
    ExpireChangePasswordModel.prototype.init = function ($scope) {
        this.initModel($scope);
        this.setElementVisability();
    };
    ExpireChangePasswordModel.prototype.setElementVisability = function () {
        this.hideObject.subTitle = new Boolean(this.hideObject.subTitle) == true;
        this.hideObject.title = new Boolean(this.hideObject.title) == true;
        this.hideObject.server = new Boolean(this.hideObject.server) == true;
        this.hideObject.hint = new Boolean(this.hideObject.hint) == true;
        this.hideObject.progress = new Boolean(this.hideObject.progress) == true;
    };
    ExpireChangePasswordModel.prototype.onShowToast = function (message, type) {
        if (!message)
            return;
        message = this.pipTranslate.translate(message);
        type = type || 'message';
        if (type == 'message') {
            this.pipToasts.showMessage(message, null, null, null);
            return;
        }
        if (type == 'error') {
            this.pipToasts.showError(message, null, null, null, null);
            return;
        }
    };
    ExpireChangePasswordModel.prototype.onChange = function (callback) {
        var _this = this;
        if (this.config.form.$invalid) {
            this.pipFormErrors.resetFormErrors(this.config.form, true);
            return;
        }
        var transactionId = this.transaction.begin('PROCESSING');
        if (!transactionId)
            return;
        if (!this.pipRest.lockServerUrl) {
            this.pipRest.serverUrl = this.config.data.serverUrl;
        }
        this.pipEntryData.expireChangePassword({
            login: this.config.data.login,
            old_password: this.config.data.password,
            new_password: this.config.data.passwordNew,
            user_id: this.pipEntryData.getUserId()
        }, function (data) {
            _this.pipFormErrors.resetFormErrors(_this.config.form, false);
            if (_this.transaction.aborted(transactionId))
                return;
            var message = String() + 'EXPIRE_CHANGE_PWD_SUCCESS_TEXT';
            _this.onShowToast(message, 'message');
            _this.transaction.end();
            if (callback)
                callback();
            _this.pipEntry.signout(function () {
                _this.$state.go('signin', {
                    server_url: _this.config.data.serverUrl,
                    login: _this.config.data.login
                });
            });
        }, function (error) {
            _this.transaction.end(error);
            _this.pipFormErrors.resetFormErrors(_this.config.form, true);
            _this.pipFormErrors.setFormError(_this.config.form, error, {
                'NO_LOGIN': 'login',
                'WRONG_LOGIN': 'login',
                'LOGIN_NOT_FOUND': 'login',
                'WRONG_PASSWORD': 'password',
                'act_execute': 'form',
                '-1': 'form'
            });
        });
    };
    return ExpireChangePasswordModel;
}(EntryModel_1.EntryModel));
exports.ExpireChangePasswordModel = ExpireChangePasswordModel;
},{"../common/EntryModel":10}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var ExpireChangePasswordPanelBindings = {};
    var ExpireChangePasswordPanelController = (function () {
        ExpireChangePasswordPanelController.$inject = ['$scope', 'pipFormErrors', 'pipRest', 'pipExpireChangePasswordViewModel'];
        function ExpireChangePasswordPanelController($scope, pipFormErrors, pipRest, pipExpireChangePasswordViewModel) {
            "ngInject";
            this.$scope = $scope;
            this.pipFormErrors = pipFormErrors;
            this.pipRest = pipRest;
            this.pipExpireChangePasswordViewModel = pipExpireChangePasswordViewModel;
            this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
            pipExpireChangePasswordViewModel.initModel($scope);
        }
        ExpireChangePasswordPanelController.prototype.$postLink = function () {
            this.config.form = this.$scope.form;
            this.config.data.password = null;
            this.config.data.passwordNew = null;
        };
        Object.defineProperty(ExpireChangePasswordPanelController.prototype, "config", {
            get: function () {
                return this.pipExpireChangePasswordViewModel.config;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExpireChangePasswordPanelController.prototype, "transaction", {
            get: function () {
                return this.pipExpireChangePasswordViewModel.transaction;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExpireChangePasswordPanelController.prototype, "showServerError", {
            get: function () {
                return this.pipExpireChangePasswordViewModel.showServerError;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExpireChangePasswordPanelController.prototype, "hideObject", {
            get: function () {
                return this.pipExpireChangePasswordViewModel.hideObject;
            },
            enumerable: true,
            configurable: true
        });
        ExpireChangePasswordPanelController.prototype.onServerUrlChanged = function () {
            this.config.onServerUrlChanged(this.config.form, this.config.selected.searchURLs);
        };
        ExpireChangePasswordPanelController.prototype.onChanged = function () {
            this.pipFormErrors.resetFormErrors(this.config.form, false);
            this.pipFormErrors.resetFieldsErrors(this.config.form, null);
            this.pipRest.serverUrl = this.config.selected.searchURLs;
            this.config.data.serverUrl = this.config.selected.searchURLs;
        };
        ExpireChangePasswordPanelController.prototype.onShowToast = function (message, type) {
            this.pipExpireChangePasswordViewModel.onShowToast(message, type);
        };
        return ExpireChangePasswordPanelController;
    }());
    var ExpireChangePasswordPanel = {
        bindings: ExpireChangePasswordPanelBindings,
        controller: ExpireChangePasswordPanelController,
        templateUrl: 'expire_change_password/ExpireChangePasswordPanel.html'
    };
    angular.module("pipExpireChangePasswordPanel", ['pipFocused', 'pipEntry.Strings'])
        .component('pipExpireChangePasswordPanel', ExpireChangePasswordPanel);
}
},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpireChangePasswordModel_1 = require("./ExpireChangePasswordModel");
var ExpireChangePasswordViewModel = (function () {
    ExpireChangePasswordViewModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipAuthState', 'pipFormErrors', 'pipRest', 'pipEntry', 'pipTranslate', 'pipEntryData', 'pipToasts'];
    function ExpireChangePasswordViewModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipEntry, pipTranslate, pipEntryData, pipToasts) {
        "ngInject";
        this.pipTranslate = pipTranslate;
        this.pipEntryData = pipEntryData;
        this.pipToasts = pipToasts;
        this.model = new ExpireChangePasswordModel_1.ExpireChangePasswordModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipTranslate, pipEntryData, pipEntry, pipToasts);
    }
    Object.defineProperty(ExpireChangePasswordViewModel.prototype, "transaction", {
        get: function () {
            return this.model.transaction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpireChangePasswordViewModel.prototype, "hideObject", {
        get: function () {
            return this.model.hideObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpireChangePasswordViewModel.prototype, "showServerError", {
        get: function () {
            return this.model.showServerError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpireChangePasswordViewModel.prototype, "config", {
        get: function () {
            return this.model.config;
        },
        enumerable: true,
        configurable: true
    });
    ExpireChangePasswordViewModel.prototype.initModel = function ($scope) {
        this.model.init($scope);
    };
    ExpireChangePasswordViewModel.prototype.onShowToast = function (message, type) {
        this.model.onShowToast(message, type);
    };
    ExpireChangePasswordViewModel.prototype.onChange = function (callback) {
        this.model.onChange(callback);
    };
    return ExpireChangePasswordViewModel;
}());
exports.ExpireChangePasswordViewModel = ExpireChangePasswordViewModel;
angular.module('pipEntry.ExpireChangePassword')
    .service('pipExpireChangePasswordViewModel', ExpireChangePasswordViewModel);
},{"./ExpireChangePasswordModel":30}],33:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("./data");
require("./rest");
require("./common");
var VerifyEmail_1 = require("./verify_email/VerifyEmail");
var RecoverPassword_1 = require("./recover_password/RecoverPassword");
var ResetPassword_1 = require("./reset_password/ResetPassword");
var PostSignup_1 = require("./post_signup/PostSignup");
var Signout_1 = require("./signout/Signout");
var ChangePassword_1 = require("./change_password/ChangePassword");
var ExpireChangePassword_1 = require("./expire_change_password/ExpireChangePassword");
{
    var configEntryRoutes = function ($stateProvider, $locationProvider, $httpProvider, pipAuthStateProvider) {
        $stateProvider
            .state('recover_password', {
            url: '/recover_password?server_url&email',
            auth: false,
            controllerAs: '$ctrl',
            controller: RecoverPassword_1.RecoverPasswordController,
            templateUrl: 'recover_password/RecoverPassword.html'
        })
            .state('change_password', {
            url: '/change_password?server_url&login',
            auth: true,
            controllerAs: '$ctrl',
            controller: ChangePassword_1.ChangePasswordController,
            templateUrl: 'change_password/ChangePassword.html'
        })
            .state('expire_change_password', {
            url: '/expire_change_password?server_url&login',
            auth: true,
            controllerAs: '$ctrl',
            controller: ExpireChangePassword_1.ExpireChangePasswordController,
            templateUrl: 'expire_change_password/ExpireChangePassword.html'
        })
            .state('reset_password', {
            url: '/reset_password?server_url&email&reset_code',
            auth: false,
            controller: ResetPassword_1.ResetPasswordController,
            controllerAs: '$ctrl',
            templateUrl: 'reset_password/ResetPassword.html'
        })
            .state('signout', {
            url: '/signout',
            controller: Signout_1.SignoutController,
            auth: false
        })
            .state('post_signup', {
            url: '/post_signup?party_id',
            auth: true,
            controller: PostSignup_1.PostSignupController,
            controllerAs: '$ctrl',
            templateUrl: 'post_signup/PostSignup.html'
        })
            .state('verify_email', {
            url: '/verify_email?server_url&email&code&language',
            auth: true,
            controller: VerifyEmail_1.VerifyEmailController,
            controllerAs: '$ctrl',
            templateUrl: 'verify_email/VerifyEmail.html'
        })
            .state('verify_email_success', {
            url: '/verify_email_success',
            auth: true,
            controller: VerifyEmail_1.VerifyEmailSuccessController,
            controllerAs: '$ctrl',
            templateUrl: 'verify_email/VerifyEmailSuccess.html'
        });
        pipAuthStateProvider.signinState = 'signin';
        pipAuthStateProvider.signoutState = 'signout';
    };
    configEntryRoutes.$inject = ['$stateProvider', '$locationProvider', '$httpProvider', 'pipAuthStateProvider'];
    angular.module('pipEntry', [
        'ui.router', 'ngMessages', 'ngCookies', 'LocalStorageModule',
        'pipControls', 'pipLocations', 'pipErrors',
        'pipTranslate', 'pipCommonRest',
        'pipEntry.Strings',
        'pipEntry.Data', 'pipEntry.Rest',
        'pipEntry.Common', 'pipEntry.Signin', 'pipEntry.Signup',
        'pipEntry.PostSignup', 'pipEntry.VerifyEmail',
        'pipEntry.RecoverPassword', 'pipEntry.ResetPassword',
        'pipEntry.ResetPasswordDialog', 'pipEntry.RecoverPasswordDialog',
        'pipEntry.ChangePassword', 'pipEntry.ChangePasswordDialog',
        'pipEntry.ExpireChangePassword', 'pipEntry.ExpireChangePasswordDialog',
        'pipEntry.Templates'
    ])
        .config(configEntryRoutes);
}
__export(require("./data"));
},{"./change_password/ChangePassword":1,"./common":16,"./data":27,"./expire_change_password/ExpireChangePassword":28,"./post_signup/PostSignup":34,"./recover_password/RecoverPassword":39,"./reset_password/ResetPassword":44,"./rest":52,"./signout/Signout":58,"./verify_email/VerifyEmail":64}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PostSignupController = (function () {
    PostSignupController.$inject = ['$window', '$party', 'pipPostSignupViewModel'];
    function PostSignupController($window, $party, pipPostSignupViewModel) {
        "ngInject";
        this.$window = $window;
        this.$party = $party;
        this.pipPostSignupViewModel = pipPostSignupViewModel;
    }
    PostSignupController.prototype.$onInit = function () { };
    PostSignupController.prototype.onPostSignupSubmit = function () {
        this.pipPostSignupViewModel.onPostSignupSubmit();
    };
    Object.defineProperty(PostSignupController.prototype, "transaction", {
        get: function () {
            return this.pipPostSignupViewModel.transaction;
        },
        enumerable: true,
        configurable: true
    });
    return PostSignupController;
}());
exports.PostSignupController = PostSignupController;
{
    angular.module('pipEntry.PostSignup', ['pipEntry.Common', "pipPostSignupPanel"])
        .controller('pipPostSignupController', PostSignupController);
}
},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var PostSignupDialogService = (function () {
        PostSignupDialogService.$inject = ['$mdDialog'];
        function PostSignupDialogService($mdDialog) {
            this.$mdDialog = $mdDialog;
        }
        ;
        PostSignupDialogService.prototype.show = function (params, successCallback, cancelCallback) {
            this.$mdDialog.show({
                targetEvent: params.event,
                templateUrl: 'post_signup/PostSignupDialog.html',
                controller: PostSignupDialogController_1,
                controllerAs: '$ctrl',
                locals: {
                    params: params
                },
                clickOutsideToClose: false
            })
                .then(function () {
                if (successCallback) {
                    successCallback();
                }
            }, function () {
                if (cancelCallback) {
                    cancelCallback();
                }
            });
        };
        return PostSignupDialogService;
    }());
    var PostSignupDialogController_1 = (function () {
        PostSignupDialogController_1.$inject = ['$mdDialog', 'params', 'pipPostSignupViewModel'];
        function PostSignupDialogController_1($mdDialog, params, pipPostSignupViewModel) {
            "ngInject";
            this.pipPostSignupViewModel = pipPostSignupViewModel;
            this.goBack = $mdDialog.cancel;
            this.$party = params.$party;
        }
        PostSignupDialogController_1.prototype.onPostSignupSubmit = function () {
            var _this = this;
            this.pipPostSignupViewModel.onPostSignupSubmit(function () {
                _this.goBack();
            });
        };
        Object.defineProperty(PostSignupDialogController_1.prototype, "transaction", {
            get: function () {
                return this.pipPostSignupViewModel.transaction;
            },
            enumerable: true,
            configurable: true
        });
        return PostSignupDialogController_1;
    }());
    angular.module('pipEntry.PostSignupDialog', ['pipEntry.Common', "pipPostSignupPanel"])
        .service('pipPostSignupDialog', PostSignupDialogService);
}
},{}],36:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EntryModel_1 = require("../common/EntryModel");
var PostSignupModel = (function (_super) {
    __extends(PostSignupModel, _super);
    PostSignupModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipErrorPageConfigService', 'pipAuthState', 'pipFormErrors', 'pipEntry', 'pipRest', 'pipTranslate', 'pipEntryData', 'pipToasts'];
    function PostSignupModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipErrorPageConfigService, pipAuthState, pipFormErrors, pipEntry, pipRest, pipTranslate, pipEntryData, pipToasts) {
        "ngInject";
        var _this = _super.call(this, pipEntryCommon) || this;
        _this.$rootScope = $rootScope;
        _this.$location = $location;
        _this.$state = $state;
        _this.$injector = $injector;
        _this.pipErrorPageConfigService = pipErrorPageConfigService;
        _this.pipAuthState = pipAuthState;
        _this.pipFormErrors = pipFormErrors;
        _this.pipEntry = pipEntry;
        _this.pipRest = pipRest;
        _this.pipTranslate = pipTranslate;
        _this.pipEntryData = pipEntryData;
        _this.pipToasts = pipToasts;
        _this.transaction = pipTransaction.create('entry.signin');
        return _this;
    }
    PostSignupModel.prototype.init = function ($scope) {
        this.initModel($scope);
        this.setElementVisability();
    };
    PostSignupModel.prototype.setElementVisability = function () {
        this.hideObject.subTitle = new Boolean(this.hideObject.subTitle) == true;
        this.hideObject.title = new Boolean(this.hideObject.title) == true;
        this.hideObject.successTitle = new Boolean(this.hideObject.successTitle) == true;
        this.hideObject.progress = new Boolean(this.hideObject.progress) == true;
    };
    PostSignupModel.prototype.checkSupported = function () {
        var pipSystemInfo = this.$injector.has('pipSystemInfo') ? this.$injector.get('pipSystemInfo') : null;
        if (!pipSystemInfo) {
            return true;
        }
        if (!this.pipErrorPageConfigService || !this.pipErrorPageConfigService.configs ||
            !this.pipErrorPageConfigService.configs.Unsupported || !this.pipErrorPageConfigService.configs.Unsupported.Active) {
            return true;
        }
        var browser = pipSystemInfo.browserName;
        var version = pipSystemInfo.browserVersion;
        version = version.split(".")[0];
        var supported = this.pipErrorPageConfigService.configs.Unsupported.Params && this.pipErrorPageConfigService.configs.Unsupported.Params.supported ? this.pipErrorPageConfigService.configs.Unsupported.Params.supported : null;
        if (!supported) {
            return true;
        }
        if (browser && supported[browser] && version >= supported[browser]) {
            return true;
        }
        this.pipEntry.signout();
        this.$state.go(pip.errors.ErrorsUnsupportedState);
        return false;
    };
    PostSignupModel.prototype.onPostSignupSubmit = function (callback) {
        if (this.config.form.$invalid) {
            this.pipFormErrors.resetFormErrors(this.config.form, true);
            return;
        }
        var transactionId = this.transaction.begin('PROCESSING');
        if (!transactionId)
            return;
        if (callback)
            callback();
    };
    return PostSignupModel;
}(EntryModel_1.EntryModel));
exports.PostSignupModel = PostSignupModel;
},{"../common/EntryModel":10}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums_1 = require("../data/Enums");
{
    var PostSignupPanelBindings = {
        $party: '=pipParty',
    };
    var PostSignupPanelController = (function () {
        PostSignupPanelController.$inject = ['$scope', 'pipTranslate', 'pipFormErrors', 'pipPostSignupViewModel'];
        function PostSignupPanelController($scope, pipTranslate, pipFormErrors, pipPostSignupViewModel) {
            "ngInject";
            this.$scope = $scope;
            this.pipPostSignupViewModel = pipPostSignupViewModel;
            pipPostSignupViewModel.initModel($scope);
            this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
            this.config.data = {
                id: this.$party.id,
                name: this.$party.name,
                email: this.$party.email,
                about: this.$party.about,
                language: pipTranslate.language,
                birthday: this.$party.birthday,
                gender: this.$party.gender || Enums_1.GENDER.NOT_SPECIFIED,
                location: this.$party.location
            };
        }
        PostSignupPanelController.prototype.$postLink = function () {
            this.config.form = this.$scope.form;
        };
        Object.defineProperty(PostSignupPanelController.prototype, "config", {
            get: function () {
                return this.pipPostSignupViewModel.config;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PostSignupPanelController.prototype, "transaction", {
            get: function () {
                return this.pipPostSignupViewModel.transaction;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PostSignupPanelController.prototype, "showServerError", {
            get: function () {
                return this.pipPostSignupViewModel.showServerError;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PostSignupPanelController.prototype, "hideObject", {
            get: function () {
                return this.pipPostSignupViewModel.hideObject;
            },
            enumerable: true,
            configurable: true
        });
        PostSignupPanelController.prototype.onPictureChanged = function ($control) {
            if (!this.config.enableAvatar) {
                return;
            }
            if (this.picture)
                this.picture.save(function () { }, function (error) {
                });
        };
        PostSignupPanelController.prototype.onPictureCreated = function ($event) {
            this.picture = $event.sender;
        };
        return PostSignupPanelController;
    }());
    var PostSignupPanel = {
        bindings: PostSignupPanelBindings,
        templateUrl: 'post_signup/PostSignupPanel.html',
        controller: PostSignupPanelController
    };
    angular.module("pipPostSignupPanel", ['pipFocused', 'pipEntry.Strings'])
        .component('pipPostSignupPanel', PostSignupPanel);
}
},{"../data/Enums":20}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PostSignupModel_1 = require("./PostSignupModel");
var PostSignupViewModel = (function () {
    PostSignupViewModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipErrorPageConfigService', 'pipAuthState', 'pipEntry', 'pipFormErrors', 'pipRest', 'pipTranslate', 'pipEntryData', 'pipToasts'];
    function PostSignupViewModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipErrorPageConfigService, pipAuthState, pipEntry, pipFormErrors, pipRest, pipTranslate, pipEntryData, pipToasts) {
        "ngInject";
        this.pipTranslate = pipTranslate;
        this.pipEntryData = pipEntryData;
        this.pipToasts = pipToasts;
        this.model = new PostSignupModel_1.PostSignupModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipErrorPageConfigService, pipAuthState, pipFormErrors, pipEntry, pipRest, pipTranslate, pipEntryData, pipToasts);
    }
    Object.defineProperty(PostSignupViewModel.prototype, "transaction", {
        get: function () {
            return this.model.transaction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostSignupViewModel.prototype, "hideObject", {
        get: function () {
            return this.model.hideObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostSignupViewModel.prototype, "showServerError", {
        get: function () {
            return this.model.showServerError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PostSignupViewModel.prototype, "config", {
        get: function () {
            return this.model.config;
        },
        enumerable: true,
        configurable: true
    });
    PostSignupViewModel.prototype.initModel = function ($scope) {
        this.model.init($scope);
    };
    PostSignupViewModel.prototype.onPostSignupSubmit = function (callback) {
        this.model.onPostSignupSubmit(callback);
    };
    return PostSignupViewModel;
}());
exports.PostSignupViewModel = PostSignupViewModel;
angular.module('pipEntry.PostSignup')
    .service('pipPostSignupViewModel', PostSignupViewModel);
},{"./PostSignupModel":36}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RecoverPasswordController = (function () {
    RecoverPasswordController.$inject = ['$scope', 'pipRecoverPasswordViewModel', 'pipResetPasswordDialog', 'pipEntryCommon', '$state', 'pipAuthState', 'pipFormErrors', '$window'];
    function RecoverPasswordController($scope, pipRecoverPasswordViewModel, pipResetPasswordDialog, pipEntryCommon, $state, pipAuthState, pipFormErrors, $window) {
        "ngInject";
        this.$scope = $scope;
        this.pipRecoverPasswordViewModel = pipRecoverPasswordViewModel;
        this.pipResetPasswordDialog = pipResetPasswordDialog;
        this.$state = $state;
        this.pipAuthState = pipAuthState;
        this.pipFormErrors = pipFormErrors;
        this.$window = $window;
        pipEntryCommon.configureAppBar();
    }
    RecoverPasswordController.prototype.goBack = function () {
        this.$state.go(this.pipAuthState.signinState());
    };
    Object.defineProperty(RecoverPasswordController.prototype, "transaction", {
        get: function () {
            return this.pipRecoverPasswordViewModel.transaction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecoverPasswordController.prototype, "config", {
        get: function () {
            return this.pipRecoverPasswordViewModel.config;
        },
        enumerable: true,
        configurable: true
    });
    RecoverPasswordController.prototype.onRecover = function () {
        var _this = this;
        this.pipRecoverPasswordViewModel.onRecover(function () {
            _this.pipResetPasswordDialog.show({}, function () {
                _this.$scope.$broadcast('RecoverPasswordInit');
            }, function () {
                _this.$scope.$broadcast('RecoverPasswordInit');
            });
        });
    };
    return RecoverPasswordController;
}());
exports.RecoverPasswordController = RecoverPasswordController;
{
    angular.module('pipEntry.RecoverPassword', ['pipEntry.Common', 'pipRecoverPasswordPanel', 'pipEntry.ResetPasswordDialog']);
}
},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var RecoverPasswordDialogService = (function () {
        RecoverPasswordDialogService.$inject = ['$mdDialog'];
        function RecoverPasswordDialogService($mdDialog) {
            this.$mdDialog = $mdDialog;
        }
        ;
        RecoverPasswordDialogService.prototype.show = function (params, successCallback, cancelCallback) {
            this.$mdDialog.show({
                targetEvent: params.event,
                templateUrl: 'recover_password/RecoverPasswordDialog.html',
                controller: RecoverPasswordDialogController_1,
                controllerAs: '$ctrl',
                locals: {
                    params: params
                },
                clickOutsideToClose: false
            })
                .then(function () {
                if (successCallback) {
                    successCallback();
                }
            }, function () {
                if (cancelCallback) {
                    cancelCallback();
                }
            });
        };
        return RecoverPasswordDialogService;
    }());
    var RecoverPasswordDialogController_1 = (function () {
        RecoverPasswordDialogController_1.$inject = ['pipResetPasswordDialog', 'pipRecoverPasswordViewModel', 'pipFormErrors', '$mdDialog'];
        function RecoverPasswordDialogController_1(pipResetPasswordDialog, pipRecoverPasswordViewModel, pipFormErrors, $mdDialog) {
            "ngInject";
            this.pipResetPasswordDialog = pipResetPasswordDialog;
            this.pipRecoverPasswordViewModel = pipRecoverPasswordViewModel;
            this.pipFormErrors = pipFormErrors;
            this.$mdDialog = $mdDialog;
            this.goBack = $mdDialog.cancel;
        }
        Object.defineProperty(RecoverPasswordDialogController_1.prototype, "transaction", {
            get: function () {
                return this.pipRecoverPasswordViewModel.transaction;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecoverPasswordDialogController_1.prototype, "config", {
            get: function () {
                return this.pipRecoverPasswordViewModel.config;
            },
            enumerable: true,
            configurable: true
        });
        RecoverPasswordDialogController_1.prototype.onRecover = function () {
            var _this = this;
            this.$mdDialog.cancel;
            this.pipRecoverPasswordViewModel.onRecover(function () {
                _this.pipResetPasswordDialog.show({});
            });
        };
        return RecoverPasswordDialogController_1;
    }());
    angular.module('pipEntry.RecoverPasswordDialog', ['pipEntry.Common', "pipRecoverPasswordPanel",
        'pipEntry.ResetPasswordDialog'
    ])
        .service('pipRecoverPasswordDialog', RecoverPasswordDialogService);
}
},{}],41:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EntryModel_1 = require("../common/EntryModel");
var RecoverPasswordModel = (function (_super) {
    __extends(RecoverPasswordModel, _super);
    RecoverPasswordModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipAuthState', 'pipFormErrors', 'pipRest', 'pipTranslate', 'pipEntryData', 'pipToasts'];
    function RecoverPasswordModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipTranslate, pipEntryData, pipToasts) {
        "ngInject";
        var _this = _super.call(this, pipEntryCommon) || this;
        _this.$rootScope = $rootScope;
        _this.$location = $location;
        _this.$state = $state;
        _this.$injector = $injector;
        _this.pipAuthState = pipAuthState;
        _this.pipFormErrors = pipFormErrors;
        _this.pipRest = pipRest;
        _this.pipTranslate = pipTranslate;
        _this.pipEntryData = pipEntryData;
        _this.pipToasts = pipToasts;
        _this.transaction = pipTransaction.create('entry.signin');
        return _this;
    }
    RecoverPasswordModel.prototype.init = function ($scope) {
        this.initModel($scope);
        this.setElementVisability();
    };
    RecoverPasswordModel.prototype.setElementVisability = function () {
        this.hideObject.title = new Boolean(this.hideObject.title) == true;
        this.hideObject.subTitle1 = new Boolean(this.hideObject.subTitle1) == true;
        this.hideObject.subTitle2 = new Boolean(this.hideObject.subTitle2) == true;
        this.hideObject.server = new Boolean(this.hideObject.server) == true;
        this.hideObject.hint = new Boolean(this.hideObject.hint) == true;
        this.hideObject.progress = new Boolean(this.hideObject.progress) == true;
    };
    RecoverPasswordModel.prototype.onRecover = function (gotoReset) {
        var _this = this;
        if (this.config.form.$invalid) {
            this.pipFormErrors.resetFormErrors(this.config.form, true);
            return;
        }
        var transactionId = this.transaction.begin('PROCESSING');
        if (!transactionId)
            return;
        if (!this.pipRest.lockServerUrl) {
            this.pipRest.serverUrl = this.config.data.serverUrl;
        }
        this.pipEntryData.recoverPassword({
            login: this.config.data.login
        }, function (data) {
            _this.pipFormErrors.resetFormErrors(_this.config.form, true);
            if (_this.transaction.aborted(transactionId))
                return;
            _this.transaction.end();
            if (!gotoReset) {
                _this.$state.go('reset_password', {
                    server_url: _this.config.data.serverUrl,
                    login: _this.config.data.login
                });
            }
            else {
                gotoReset();
            }
        }, function (error) {
            _this.transaction.end(error);
            _this.pipFormErrors.setFormError(_this.config.form, error, {
                'WRONG_LOGIN': 'login',
                'NO_LOGIN': 'login',
                'LOGIN_NOT_FOUND': 'login',
                'act_execute': 'form',
                '-1': 'form'
            });
            _this.pipFormErrors.resetFormErrors(_this.config.form, true);
        });
    };
    ;
    return RecoverPasswordModel;
}(EntryModel_1.EntryModel));
exports.RecoverPasswordModel = RecoverPasswordModel;
},{"../common/EntryModel":10}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var RecoverPasswordPanelBindings = {};
    var RecoverPasswordPanelController = (function () {
        RecoverPasswordPanelController.$inject = ['$scope', 'pipFormErrors', 'pipRest', 'pipRecoverPasswordViewModel'];
        function RecoverPasswordPanelController($scope, pipFormErrors, pipRest, pipRecoverPasswordViewModel) {
            "ngInject";
            var _this = this;
            this.$scope = $scope;
            this.pipFormErrors = pipFormErrors;
            this.pipRest = pipRest;
            this.pipRecoverPasswordViewModel = pipRecoverPasswordViewModel;
            this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
            pipRecoverPasswordViewModel.initModel($scope);
            this.$scope.$on('RecoverPasswordInit', function () {
                _this.config.form = _this.$scope.form;
            });
        }
        RecoverPasswordPanelController.prototype.$postLink = function () {
            this.config.form = this.$scope.form;
            this.config.data.password = null;
            this.config.data.passwordNew = null;
        };
        Object.defineProperty(RecoverPasswordPanelController.prototype, "config", {
            get: function () {
                return this.pipRecoverPasswordViewModel.config;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecoverPasswordPanelController.prototype, "transaction", {
            get: function () {
                return this.pipRecoverPasswordViewModel.transaction;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RecoverPasswordPanelController.prototype, "showServerError", {
            get: function () {
                return this.pipRecoverPasswordViewModel.showServerError;
            },
            enumerable: true,
            configurable: true
        });
        RecoverPasswordPanelController.prototype.onServerUrlChanged = function () {
            this.config.onServerUrlChanged(this.config.form, this.config.selected.searchURLs);
        };
        RecoverPasswordPanelController.prototype.onChanged = function () {
            this.pipFormErrors.resetFormErrors(this.config.form, false);
            this.pipFormErrors.resetFieldsErrors(this.config.form, null);
            this.pipRest.serverUrl = this.config.selected.searchURLs;
            this.config.data.serverUrl = this.config.selected.searchURLs;
        };
        Object.defineProperty(RecoverPasswordPanelController.prototype, "hideObject", {
            get: function () {
                return this.pipRecoverPasswordViewModel.hideObject;
            },
            enumerable: true,
            configurable: true
        });
        return RecoverPasswordPanelController;
    }());
    var RecoverPasswordPanel = {
        bindings: RecoverPasswordPanelBindings,
        controller: RecoverPasswordPanelController,
        templateUrl: 'recover_password/RecoverPasswordPanel.html'
    };
    angular.module("pipRecoverPasswordPanel", ['pipFocused', 'pipEntry.Strings'])
        .component('pipRecoverPasswordPanel', RecoverPasswordPanel);
}
},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RecoverPasswordModel_1 = require("./RecoverPasswordModel");
var RecoverPasswordViewModel = (function () {
    RecoverPasswordViewModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipAuthState', 'pipFormErrors', 'pipRest', 'pipTranslate', 'pipEntryData', 'pipToasts'];
    function RecoverPasswordViewModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipTranslate, pipEntryData, pipToasts) {
        "ngInject";
        this.pipTranslate = pipTranslate;
        this.pipEntryData = pipEntryData;
        this.pipToasts = pipToasts;
        this.model = new RecoverPasswordModel_1.RecoverPasswordModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipTranslate, pipEntryData, pipToasts);
    }
    Object.defineProperty(RecoverPasswordViewModel.prototype, "transaction", {
        get: function () {
            return this.model.transaction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecoverPasswordViewModel.prototype, "hideObject", {
        get: function () {
            return this.model.hideObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecoverPasswordViewModel.prototype, "showServerError", {
        get: function () {
            return this.model.showServerError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecoverPasswordViewModel.prototype, "config", {
        get: function () {
            return this.model.config;
        },
        enumerable: true,
        configurable: true
    });
    RecoverPasswordViewModel.prototype.initModel = function ($scope) {
        this.model.init($scope);
    };
    RecoverPasswordViewModel.prototype.onRecover = function (gotoReset) {
        this.model.onRecover(gotoReset);
    };
    return RecoverPasswordViewModel;
}());
exports.RecoverPasswordViewModel = RecoverPasswordViewModel;
angular.module('pipEntry.RecoverPassword')
    .service('pipRecoverPasswordViewModel', RecoverPasswordViewModel);
},{"./RecoverPasswordModel":41}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResetPasswordController = (function () {
    ResetPasswordController.$inject = ['pipResetPasswordViewModel', 'pipEntryCommon', '$window'];
    function ResetPasswordController(pipResetPasswordViewModel, pipEntryCommon, $window) {
        "ngInject";
        this.pipResetPasswordViewModel = pipResetPasswordViewModel;
        this.$window = $window;
        pipEntryCommon.configureAppBar();
    }
    ResetPasswordController.prototype.goBack = function () {
        this.$window.history.back();
    };
    Object.defineProperty(ResetPasswordController.prototype, "config", {
        get: function () {
            return this.pipResetPasswordViewModel.config;
        },
        enumerable: true,
        configurable: true
    });
    ResetPasswordController.prototype.onReset = function () {
        this.pipResetPasswordViewModel.onReset();
    };
    return ResetPasswordController;
}());
exports.ResetPasswordController = ResetPasswordController;
{
    angular.module('pipEntry.ResetPassword', ['pipEntry.Common', 'pipResetPasswordPanel',
        'pipEmailUnique'
    ]);
}
},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var ResetPasswordDialogService = (function () {
        ResetPasswordDialogService.$inject = ['$mdDialog'];
        function ResetPasswordDialogService($mdDialog) {
            this.$mdDialog = $mdDialog;
        }
        ;
        ResetPasswordDialogService.prototype.show = function (params, successCallback, cancelCallback) {
            this.$mdDialog.show({
                targetEvent: params.event,
                templateUrl: 'reset_password/ResetPasswordDialog.html',
                controller: ResetPasswordDialogController_1,
                controllerAs: '$ctrl',
                locals: {
                    params: params
                },
                clickOutsideToClose: false
            })
                .then(function () {
                if (successCallback) {
                    successCallback();
                }
            }, function () {
                if (cancelCallback) {
                    cancelCallback();
                }
            });
        };
        return ResetPasswordDialogService;
    }());
    var ResetPasswordDialogController_1 = (function () {
        ResetPasswordDialogController_1.$inject = ['$mdDialog', 'pipResetPasswordViewModel'];
        function ResetPasswordDialogController_1($mdDialog, pipResetPasswordViewModel) {
            "ngInject";
            this.pipResetPasswordViewModel = pipResetPasswordViewModel;
            this.goBack = $mdDialog.cancel;
        }
        Object.defineProperty(ResetPasswordDialogController_1.prototype, "config", {
            get: function () {
                return this.pipResetPasswordViewModel.config;
            },
            enumerable: true,
            configurable: true
        });
        ResetPasswordDialogController_1.prototype.onReset = function () {
            var _this = this;
            this.pipResetPasswordViewModel.onReset(function () {
                _this.goBack();
            });
        };
        ResetPasswordDialogController_1.prototype.onCancel = function () {
            this.goBack();
        };
        return ResetPasswordDialogController_1;
    }());
    angular.module('pipEntry.ResetPasswordDialog', ['pipEntry.Common', "pipResetPasswordPanel"])
        .service('pipResetPasswordDialog', ResetPasswordDialogService);
}
},{}],46:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EntryModel_1 = require("../common/EntryModel");
var ResetPasswordModel = (function (_super) {
    __extends(ResetPasswordModel, _super);
    ResetPasswordModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipAuthState', 'pipFormErrors', 'pipRest', 'pipTranslate', 'pipEntryData', 'pipToasts'];
    function ResetPasswordModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipTranslate, pipEntryData, pipToasts) {
        "ngInject";
        var _this = _super.call(this, pipEntryCommon) || this;
        _this.$rootScope = $rootScope;
        _this.$location = $location;
        _this.$state = $state;
        _this.$injector = $injector;
        _this.pipAuthState = pipAuthState;
        _this.pipFormErrors = pipFormErrors;
        _this.pipRest = pipRest;
        _this.pipTranslate = pipTranslate;
        _this.pipEntryData = pipEntryData;
        _this.pipToasts = pipToasts;
        _this.transaction = pipTransaction.create('entry.signin');
        return _this;
    }
    ResetPasswordModel.prototype.init = function ($scope) {
        this.initModel($scope);
        this.setElementVisability();
    };
    ResetPasswordModel.prototype.setElementVisability = function () {
        this.hideObject.subTitle = new Boolean(this.hideObject.subTitle) == true;
        this.hideObject.title = new Boolean(this.hideObject.title) == true;
        this.hideObject.server = new Boolean(this.hideObject.server) == true;
        this.hideObject.hint = new Boolean(this.hideObject.hint) == true;
        this.hideObject.progress = new Boolean(this.hideObject.progress) == true;
    };
    ResetPasswordModel.prototype.onShowToast = function (message, type) {
        if (!message)
            return;
        message = this.pipTranslate.translate(message);
        type = type || 'message';
        if (type == 'message') {
            this.pipToasts.showMessage(message, null, null, null);
            return;
        }
        if (type == 'error') {
            this.pipToasts.showError(message, null, null, null, null);
            return;
        }
    };
    ResetPasswordModel.prototype.onReset = function (callback) {
        var _this = this;
        if (this.config.form.$invalid) {
            this.pipFormErrors.resetFormErrors(this.config.form, true);
            return;
        }
        var transactionId = this.transaction.begin('PROCESSING');
        if (!transactionId)
            return;
        if (!this.pipRest.lockServerUrl) {
            this.pipRest.serverUrl = this.config.data.serverUrl;
        }
        this.pipEntryData.resetPassword({
            login: this.config.data.login,
            code: this.config.data.resetCode,
            password: this.config.data.password
        }, function (data) {
            _this.pipFormErrors.resetFormErrors(_this.config.form, false);
            if (_this.transaction.aborted(transactionId))
                return;
            var message = String() + 'RESET_PWD_SUCCESS_TEXT';
            _this.onShowToast(message, 'message');
            _this.transaction.end();
            if (callback)
                callback();
            _this.$state.go('signin', {
                server_url: _this.config.data.serverUrl,
                login: _this.config.data.login
            });
        }, function (error) {
            _this.transaction.end(error);
            _this.pipFormErrors.resetFormErrors(_this.config.form, true);
            _this.pipFormErrors.setFormError(_this.config.form, error, {
                'NO_LOGIN': 'login',
                'WRONG_LOGIN': 'login',
                'LOGIN_NOT_FOUND': 'login',
                'WRONG_PASSWORD': 'password',
                'WRONG_CODE': 'resetCode',
                'act_execute': 'form',
                '-1': 'form'
            });
        });
    };
    return ResetPasswordModel;
}(EntryModel_1.EntryModel));
exports.ResetPasswordModel = ResetPasswordModel;
},{"../common/EntryModel":10}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var ResetPasswordPanelBindings = {};
    var ResetPasswordPanelController = (function () {
        ResetPasswordPanelController.$inject = ['$scope', 'pipFormErrors', 'pipRest', 'pipResetPasswordViewModel'];
        function ResetPasswordPanelController($scope, pipFormErrors, pipRest, pipResetPasswordViewModel) {
            "ngInject";
            this.$scope = $scope;
            this.pipFormErrors = pipFormErrors;
            this.pipRest = pipRest;
            this.pipResetPasswordViewModel = pipResetPasswordViewModel;
            this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
            pipResetPasswordViewModel.initModel($scope);
        }
        ResetPasswordPanelController.prototype.$postLink = function () {
            this.config.form = this.$scope.form;
            this.config.data.password = null;
            this.config.data.passwordNew = null;
        };
        Object.defineProperty(ResetPasswordPanelController.prototype, "config", {
            get: function () {
                return this.pipResetPasswordViewModel.config;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResetPasswordPanelController.prototype, "transaction", {
            get: function () {
                return this.pipResetPasswordViewModel.transaction;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResetPasswordPanelController.prototype, "showServerError", {
            get: function () {
                return this.pipResetPasswordViewModel.showServerError;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResetPasswordPanelController.prototype, "hideObject", {
            get: function () {
                return this.pipResetPasswordViewModel.hideObject;
            },
            enumerable: true,
            configurable: true
        });
        ResetPasswordPanelController.prototype.onServerUrlChanged = function () {
            this.config.onServerUrlChanged(this.config.form, this.config.selected.searchURLs);
        };
        ResetPasswordPanelController.prototype.onChanged = function () {
            this.pipFormErrors.resetFormErrors(this.config.form, false);
            this.pipFormErrors.resetFieldsErrors(this.config.form, null);
            this.pipRest.serverUrl = this.config.selected.searchURLs;
            this.config.data.serverUrl = this.config.selected.searchURLs;
        };
        ResetPasswordPanelController.prototype.onShowToast = function (message, type) {
            this.pipResetPasswordViewModel.onShowToast(message, type);
        };
        return ResetPasswordPanelController;
    }());
    var ResetPasswordPanel = {
        bindings: ResetPasswordPanelBindings,
        controller: ResetPasswordPanelController,
        templateUrl: 'reset_password/ResetPasswordPanel.html'
    };
    angular.module("pipResetPasswordPanel", ['pipFocused', 'pipEntry.Strings'])
        .component('pipResetPasswordPanel', ResetPasswordPanel);
}
},{}],48:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResetPasswordModel_1 = require("./ResetPasswordModel");
var ResetPasswordViewModel = (function () {
    ResetPasswordViewModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipAuthState', 'pipFormErrors', 'pipRest', 'pipTranslate', 'pipEntryData', 'pipToasts'];
    function ResetPasswordViewModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipTranslate, pipEntryData, pipToasts) {
        "ngInject";
        this.pipTranslate = pipTranslate;
        this.pipEntryData = pipEntryData;
        this.pipToasts = pipToasts;
        this.model = new ResetPasswordModel_1.ResetPasswordModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipTranslate, pipEntryData, pipToasts);
    }
    Object.defineProperty(ResetPasswordViewModel.prototype, "transaction", {
        get: function () {
            return this.model.transaction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResetPasswordViewModel.prototype, "hideObject", {
        get: function () {
            return this.model.hideObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResetPasswordViewModel.prototype, "showServerError", {
        get: function () {
            return this.model.showServerError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResetPasswordViewModel.prototype, "config", {
        get: function () {
            return this.model.config;
        },
        enumerable: true,
        configurable: true
    });
    ResetPasswordViewModel.prototype.initModel = function ($scope) {
        this.model.init($scope);
    };
    ResetPasswordViewModel.prototype.onShowToast = function (message, type) {
        this.model.onShowToast(message, type);
    };
    ResetPasswordViewModel.prototype.onReset = function (callback) {
        this.model.onReset(callback);
    };
    return ResetPasswordViewModel;
}());
exports.ResetPasswordViewModel = ResetPasswordViewModel;
angular.module('pipEntry.ResetPassword')
    .service('pipResetPasswordViewModel', ResetPasswordViewModel);
},{"./ResetPasswordModel":46}],49:[function(require,module,exports){
configEntryResources.$inject = ['pipRestProvider'];
function configEntryResources(pipRestProvider) {
    pipRestProvider.registerOperation('signin', '/api/v1/signin');
    pipRestProvider.registerOperation('signout', '/api/v1/signout');
    pipRestProvider.registerOperation('signup', '/api/v1/signup');
    pipRestProvider.registerOperation('recoverPassword', '/api/v1/passwords/recover');
    pipRestProvider.registerOperation('resetPassword', '/api/v1/passwords/reset');
    pipRestProvider.registerCollection('changePassword', '/api/v1/passwords/:user_id/change', { user_id: '@user_id' });
    pipRestProvider.registerOperation('requestEmailVerification', '/api/v1/email_settings/resend');
    pipRestProvider.registerOperation('verifyEmail', '/api/v1/email_settings/verify');
    pipRestProvider.registerOperation('email_settings', '/api/v1/email_settings/:user_id', { user_id: '@user_id' }, {
        get: { method: 'GET', isArray: false }
    });
    pipRestProvider.registerOperation('signupValidate', '/api/v1/signup/validate', {}, {
        get: { method: 'GET', isArray: false }
    });
}
angular
    .module('pipEntry.Rest')
    .config(configEntryResources);
},{}],50:[function(require,module,exports){
configSessionResources.$inject = ['pipRestProvider'];
function configSessionResources(pipRestProvider) {
    pipRestProvider.registerPagedCollection('sessions', '/api/v1/sessions');
    pipRestProvider.registerOperation('restoreSessions', '/api/v1/sessions/restore');
    pipRestProvider.registerPagedCollection('userSessions', '/api/v1//sessions/:user_id');
}
angular
    .module('pipEntry.Rest')
    .config(configSessionResources);
},{}],51:[function(require,module,exports){
configSettingsResources.$inject = ['pipRestProvider'];
function configSettingsResources(pipRestProvider) {
    pipRestProvider.registerPagedCollection('settings', '/api/v1/settings/:section/:key', { section: '@section' }, {
        update: { method: 'PUT' }
    });
}
angular
    .module('pipEntry.Rest')
    .config(configSettingsResources);
},{}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
angular.module('pipEntry.Rest', []);
require("./EntryResources");
require("./SettingsResources");
require("./SessionResources");
},{"./EntryResources":49,"./SessionResources":50,"./SettingsResources":51}],53:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSignin = 'isSignin';
{
    var SigninController_1 = (function () {
        SigninController_1.$inject = ['$scope', '$rootScope', 'pipEntry', 'pipEntryCommon', 'pipSession'];
        function SigninController_1($scope, $rootScope, pipEntry, pipEntryCommon, pipSession) {
            "ngIngect";
            this.fixedServerUrl = false;
            pipEntryCommon.configureAppBar();
            $rootScope[exports.isSignin] = false;
            this.fixedServerUrl = $scope['fixedServerUrl'];
        }
        return SigninController_1;
    }());
    var SigninConfig = function ($stateProvider, pipAuthStateProvider) {
        $stateProvider
            .state('signin', {
            url: '/signin?login&server_url&redirect_to&language&email',
            auth: false,
            controller: SigninController_1,
            controllerAs: '$ctrl',
            templateUrl: 'signin/Signin.html'
        });
        pipAuthStateProvider.signinState = 'signin';
    };
    SigninConfig.$inject = ['$stateProvider', 'pipAuthStateProvider'];
    angular.module('pipEntry.Signin', ['pipEntry.Common', "pipSigninPanel"])
        .config(SigninConfig);
}
},{}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SigninDialogService = (function () {
    SigninDialogService.$inject = ['$mdDialog'];
    function SigninDialogService($mdDialog) {
        this.$mdDialog = $mdDialog;
    }
    SigninDialogService.prototype.show = function (params, successCallback, cancelCallback) {
        this.$mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'signin/SigninDialog.html',
            controller: SigninDialogController,
            locals: {
                params: params
            },
            clickOutsideToClose: false
        })
            .then(function () {
            if (successCallback) {
                successCallback();
            }
        }, function () {
            if (cancelCallback) {
                cancelCallback();
            }
        });
    };
    return SigninDialogService;
}());
var SigninDialogController = (function () {
    SigninDialogController.$inject = ['pipSignupDialog', 'pipRecoverPasswordDialog', 'pipEntry'];
    function SigninDialogController(pipSignupDialog, pipRecoverPasswordDialog, pipEntry) {
        "ngInject";
        var _this = this;
        this.pipSignupDialog = pipSignupDialog;
        this.pipRecoverPasswordDialog = pipRecoverPasswordDialog;
        this.pipEntry = pipEntry;
        this.pipGotoSignupDialog = function () {
            _this.gotoSignupDialog();
        };
        this.pipGotoRecoverPasswordDialog = function () {
            _this.gotoRecoverPasswordDialog();
        };
    }
    SigninDialogController.prototype.gotoSignupDialog = function () {
        this.pipSignupDialog.show({});
    };
    SigninDialogController.prototype.gotoRecoverPasswordDialog = function () {
        this.pipRecoverPasswordDialog.show({});
    };
    return SigninDialogController;
}());
{
    angular.module('pipEntry.SigninDialog', [
        'pipEntry.Common',
        'pipSigninPanel',
        'pipEntry.SignupDialog',
        'pipEntry.RecoverPasswordDialog'
    ])
        .service('pipSigninDialog', SigninDialogService);
}
},{}],55:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EntryModel_1 = require("../common/EntryModel");
var EntryPageConfig_1 = require("../common/EntryPageConfig");
var SinginModel = (function (_super) {
    __extends(SinginModel, _super);
    SinginModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipErrorPageConfigService', 'pipAuthState', 'pipEntry', 'pipFormErrors', 'pipNavService', 'pipRest'];
    function SinginModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipErrorPageConfigService, pipAuthState, pipEntry, pipFormErrors, pipNavService, pipRest) {
        "ngInject";
        var _this = _super.call(this, pipEntryCommon) || this;
        _this.$rootScope = $rootScope;
        _this.$location = $location;
        _this.$state = $state;
        _this.$injector = $injector;
        _this.pipErrorPageConfigService = pipErrorPageConfigService;
        _this.pipAuthState = pipAuthState;
        _this.pipEntry = pipEntry;
        _this.pipFormErrors = pipFormErrors;
        _this.pipNavService = pipNavService;
        _this.pipRest = pipRest;
        _this.transaction = pipTransaction.create('entry.signin');
        return _this;
    }
    SinginModel.prototype.init = function ($scope) {
        this.initModel($scope);
        this.setElementVisability();
    };
    SinginModel.prototype.setElementVisability = function () {
        this.hideObject.remember = new Boolean(this.hideObject.remember) == true;
        this.hideObject.title = new Boolean(this.hideObject.title) == true;
        this.hideObject.server = new Boolean(this.hideObject.server) == true;
        this.hideObject.forgotPassword = new Boolean(this.hideObject.forgotPassword) == true;
        this.hideObject.signup = new Boolean(this.hideObject.signup) == true;
        this.hideObject.hint = new Boolean(this.hideObject.hint) == true;
        this.hideObject.progress = new Boolean(this.hideObject.progress) == true;
    };
    SinginModel.prototype.checkSupported = function () {
        var pipSystemInfo = this.$injector.has('pipSystemInfo') ? this.$injector.get('pipSystemInfo') : null;
        if (!pipSystemInfo) {
            return true;
        }
        if (!this.pipErrorPageConfigService || !this.pipErrorPageConfigService.configs ||
            !this.pipErrorPageConfigService.configs.Unsupported || !this.pipErrorPageConfigService.configs.Unsupported.Active) {
            return true;
        }
        var browser = pipSystemInfo.browserName;
        var version = pipSystemInfo.browserVersion;
        version = version.split(".")[0];
        var supported = this.pipErrorPageConfigService.configs.Unsupported.Params && this.pipErrorPageConfigService.configs.Unsupported.Params.supported ? this.pipErrorPageConfigService.configs.Unsupported.Params.supported : null;
        if (!supported) {
            return true;
        }
        if (browser && supported[browser] && version >= supported[browser]) {
            return true;
        }
        this.pipEntry.signout();
        this.$state.go(pip.errors.ErrorsUnsupportedState);
        return false;
    };
    SinginModel.prototype.gotoSignup = function (gotoSignupPage, gotoSignupDialog) {
        if (!gotoSignupPage && !gotoSignupDialog) {
            this.$state.go('signup', {
                server_url: this.config.data.serverUrl,
                login: this.config.data.login
            });
            return;
        }
        if (gotoSignupPage) {
            this.$state.go(gotoSignupPage);
            return;
        }
        if (gotoSignupDialog) {
            gotoSignupDialog();
            return;
        }
    };
    SinginModel.prototype.gotoRecoverPassword = function (gotoRecoverPasswordDialog) {
        if (!gotoRecoverPasswordDialog) {
            this.$state.go('recover_password', {
                server_url: this.config.data.serverUrl,
                login: this.config.data.login
            });
            return;
        }
        if (gotoRecoverPasswordDialog) {
            gotoRecoverPasswordDialog();
            return;
        }
    };
    SinginModel.prototype.inSigninComplete = function (data) {
        if (this.checkSupported()) {
            var passwordExpire = false;
            if (this.pipEntry.passwordExpire && data.user && data.user.change_pwd_time) {
                var expireDate = new Date(data.user.change_pwd_time);
                var nowDate = new Date();
                passwordExpire = expireDate.getTime() < nowDate.getTime();
            }
            if (passwordExpire) {
                this.pipAuthState.go('change_password', {
                    login: this.config.data.login,
                    server_url: this.pipRest.serverUrl
                });
            }
            else if (this.pipAuthState.params.redirect_to) {
                if (this.pipAuthState.params.toState) {
                    if (this.pipAuthState.params.toState != this.pipAuthState.signinState) {
                        this.pipAuthState.go(this.pipAuthState.params.toState, this.pipAuthState.params.toParams);
                    }
                    else {
                        this.pipAuthState.goToAuthorized({});
                    }
                }
                else {
                    if (decodeURIComponent(this.pipAuthState.params.redirect_to) != '/signin') {
                        this.$location.url(decodeURIComponent(this.pipAuthState.params.redirect_to));
                    }
                    else {
                        this.pipAuthState.goToAuthorized({});
                    }
                }
            }
            else {
                this.pipAuthState.goToAuthorized({});
            }
            this.pipNavService.sidenav.show();
        }
    };
    SinginModel.prototype.checkEmailVerification = function (data) {
        return data.user && data.user.settings &&
            data.user.settings['verified_email'] && data.user.settings['verified_email'] == "true";
    };
    SinginModel.prototype.onSignin = function (rememberDefault) {
        var _this = this;
        if (this.config.form.$invalid) {
            this.pipFormErrors.resetFormErrors(this.config.form, true);
            return;
        }
        var transactionId = this.transaction.begin('ENTERING');
        if (!transactionId)
            return;
        this.$rootScope['isSignin'] = true;
        if (this.hideObject.remember && !!rememberDefault) {
            this.config.data.remember = true;
        }
        if (!this.pipRest.lockServerUrl) {
            this.pipRest.serverUrl = this.config.data.serverUrl;
        }
        var session = new EntryPageConfig_1.AuthSessionData();
        this.pipRest.setHeaders({
            'session-id': undefined,
            'user-id': undefined,
            'account-id': undefined
        });
        this.pipRest.getResource('signin').call({
            login: this.config.data.login,
            password: this.config.data.password
        }, function (data) {
            _this.pipFormErrors.resetFormErrors(_this.config.form, false);
            if (_this.transaction.aborted(transactionId))
                return;
            _this.pipEntry.openSession(data, _this.config.data.remember);
            if (_this.checkEmailVerification(data)) {
                _this.inSigninComplete(data);
                _this.transaction.end();
            }
            else {
                _this.pipRest.getResource('email_settings').get({
                    user_id: data.user.id
                }, function (setting) {
                    if (setting && setting.verified && setting.email == data.user.login) {
                        _this.inSigninComplete(data);
                    }
                    else {
                        _this.pipAuthState.go('verify_email', { email: data.user.login || data.user['email'], serverUrl: _this.pipRest.serverUrl });
                    }
                    _this.transaction.end();
                }, function (error) {
                    _this.$rootScope['isSignin'] = false;
                    _this.pipFormErrors.resetFormErrors(_this.config.form, true);
                    _this.pipFormErrors.setFormError(_this.config.form, error, {
                        'WRONG_LOGIN': 'login',
                        'NO_LOGIN': 'login',
                        'LOGIN_NOT_FOUND': 'login',
                        'WRONG_PASSWORD': 'password',
                        'ACCOUNT_LOCKED': 'form',
                        'act_execute': 'form',
                        '-1': 'form'
                    });
                    _this.transaction.end({
                        message: error
                    });
                });
            }
        }, function (error) {
            _this.$rootScope['isSignin'] = false;
            _this.pipFormErrors.resetFormErrors(_this.config.form, true);
            _this.pipFormErrors.setFormError(_this.config.form, error, {
                'WRONG_LOGIN': 'login',
                'NO_LOGIN': 'login',
                'LOGIN_NOT_FOUND': 'login',
                'WRONG_PASSWORD': 'password',
                'act_execute': 'form',
                '-1': 'form'
            });
            _this.transaction.end({
                message: error
            });
        });
    };
    return SinginModel;
}(EntryModel_1.EntryModel));
exports.SinginModel = SinginModel;
},{"../common/EntryModel":10,"../common/EntryPageConfig":11}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SigninPanelController = (function () {
    SigninPanelController.$inject = ['$scope', '$document', '$timeout', 'pipMedia', 'pipSigninViewModel', 'pipRest', 'pipFormErrors'];
    function SigninPanelController($scope, $document, $timeout, pipMedia, pipSigninViewModel, pipRest, pipFormErrors) {
        "ngInject";
        this.$scope = $scope;
        this.$document = $document;
        this.$timeout = $timeout;
        this.pipMedia = pipMedia;
        this.pipSigninViewModel = pipSigninViewModel;
        this.pipRest = pipRest;
        this.pipFormErrors = pipFormErrors;
        pipSigninViewModel.initModel($scope);
        this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
    }
    SigninPanelController.prototype.$postLink = function () {
        var _this = this;
        this.config.form = this.$scope.form;
        this.$timeout(function () {
            if (_this.$document && _this.$document[0]) {
                var elem = angular.element(_this.$document[0].querySelector('input[type=password]:-webkit-autofill'));
                if (elem.length) {
                    elem.parent().addClass('md-input-has-value');
                }
            }
        }, 150);
    };
    Object.defineProperty(SigninPanelController.prototype, "config", {
        get: function () {
            return this.pipSigninViewModel.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SigninPanelController.prototype, "transaction", {
        get: function () {
            return this.pipSigninViewModel.transaction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SigninPanelController.prototype, "showServerError", {
        get: function () {
            return this.pipSigninViewModel.showServerError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SigninPanelController.prototype, "hideObject", {
        get: function () {
            return this.pipSigninViewModel.hideObject;
        },
        enumerable: true,
        configurable: true
    });
    SigninPanelController.prototype.gotoSignup = function () {
        this.pipSigninViewModel.gotoSignup(this.gotoSignupPage, this.gotoSignupDialog);
    };
    SigninPanelController.prototype.onSignin = function () {
        this.pipSigninViewModel.onSignin(this.rememberDefault);
    };
    SigninPanelController.prototype.gotoRecoverPassword = function () {
        this.pipSigninViewModel.gotoRecoverPassword(this.gotoRecoverPasswordDialog);
    };
    SigninPanelController.prototype.onServerUrlChanged = function () {
        this.config.onServerUrlChanged(this.config.form, this.config.selected.searchURLs);
    };
    SigninPanelController.prototype.onChanged = function () {
        this.pipFormErrors.resetFormErrors(this.config.form, false);
        this.pipFormErrors.resetFieldsErrors(this.config.form, null);
        this.pipRest.serverUrl = this.config.selected.searchURLs;
        this.config.data.serverUrl = this.config.selected.searchURLs;
    };
    SigninPanelController.prototype.onEnter = function (event) {
        if (event.keyCode === 13) {
            this.onSignin();
        }
    };
    return SigninPanelController;
}());
var SigninBindings = {
    gotoSignupPage: '=pipGotoSignupPage',
    gotoSignupDialog: '=pipGotoSignupDialog',
    gotoRecoverPasswordDialog: '=pipGotoRecoverPasswordDialog',
    rememberDefault: '=pipRemember',
};
var SigninChanges = (function () {
    function SigninChanges() {
    }
    return SigninChanges;
}());
{
    var SigninPanel = {
        bindings: SigninBindings,
        templateUrl: 'signin/SigninPanel.html',
        controller: SigninPanelController
    };
    angular.module("pipSigninPanel", ['pipFocused', 'pipEntry.Strings'])
        .component('pipSigninPanel', SigninPanel);
}
},{}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SigninModel_1 = require("./SigninModel");
var SigninViewModel = (function () {
    SigninViewModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipErrorPageConfigService', 'pipAuthState', 'pipEntry', 'pipFormErrors', 'pipNavService', 'pipRest'];
    function SigninViewModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipErrorPageConfigService, pipAuthState, pipEntry, pipFormErrors, pipNavService, pipRest) {
        this.model = new SigninModel_1.SinginModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipErrorPageConfigService, pipAuthState, pipEntry, pipFormErrors, pipNavService, pipRest);
    }
    Object.defineProperty(SigninViewModel.prototype, "transaction", {
        get: function () {
            return this.model.transaction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SigninViewModel.prototype, "hideObject", {
        get: function () {
            return this.model.hideObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SigninViewModel.prototype, "showServerError", {
        get: function () {
            return this.model.showServerError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SigninViewModel.prototype, "config", {
        get: function () {
            return this.model.config;
        },
        enumerable: true,
        configurable: true
    });
    SigninViewModel.prototype.initModel = function ($scope) {
        this.model.init($scope);
    };
    SigninViewModel.prototype.gotoSignup = function (gotoSignupPage, gotoSignupDialog) {
        this.model.gotoSignup(gotoSignupPage, gotoSignupDialog);
    };
    SigninViewModel.prototype.gotoRecoverPassword = function (gotoRecoverPasswordDialog) {
        this.model.gotoRecoverPassword(gotoRecoverPasswordDialog);
    };
    SigninViewModel.prototype.onSignin = function (rememberDefault) {
        this.model.onSignin(rememberDefault);
    };
    return SigninViewModel;
}());
exports.SigninViewModel = SigninViewModel;
angular.module('pipEntry.Signin')
    .service('pipSigninViewModel', SigninViewModel);
},{"./SigninModel":55}],58:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SignoutController = (function () {
    SignoutController.$inject = ['pipAuthState', 'pipEntry'];
    function SignoutController(pipAuthState, pipEntry) {
        "ngInject";
        pipEntry.signout();
        pipAuthState.goToUnauthorized({});
    }
    return SignoutController;
}());
exports.SignoutController = SignoutController;
angular.module('pipEntry.Signout', []);
},{}],59:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var SignupController_1 = (function () {
        SignupController_1.$inject = ['pipEntryCommon', 'pipEntry', '$state', 'pipAuthState'];
        function SignupController_1(pipEntryCommon, pipEntry, $state, pipAuthState) {
            "ngInject";
            pipEntryCommon.configureAppBar();
            if (pipEntry.entryHideObject && pipEntry.entryHideObject.signup === true) {
                $state.go(pipAuthState.signinState(), {});
            }
        }
        return SignupController_1;
    }());
    var SignupConfig = function ($stateProvider, pipAuthStateProvider) {
        $stateProvider
            .state('signup', {
            url: '/signup?name&login&server_url&redirect_to&language',
            auth: false,
            controller: SignupController_1,
            controllerAs: '$ctrl',
            templateUrl: 'signup/Signup.html'
        });
    };
    SignupConfig.$inject = ['$stateProvider', 'pipAuthStateProvider'];
    angular
        .module('pipEntry.Signup', [
        'pipEntry.Common',
        'pipSignupPanel',
        'pipPasswordMatch'
    ])
        .config(SignupConfig);
}
},{}],60:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SignupDialogService = (function () {
    SignupDialogService.$inject = ['$mdDialog'];
    function SignupDialogService($mdDialog) {
        this.$mdDialog = $mdDialog;
    }
    SignupDialogService.prototype.show = function (params, successCallback, cancelCallback) {
        this.$mdDialog.show({
            targetEvent: params.event,
            templateUrl: 'signup/SignupDialog.html',
            controller: SignupDialogController,
            controllerAs: '$ctrl',
            locals: {
                params: params
            },
            clickOutsideToClose: false
        })
            .then(function () {
            if (successCallback) {
                successCallback();
            }
        }, function () {
            if (cancelCallback) {
                cancelCallback();
            }
        });
    };
    return SignupDialogService;
}());
var SignupDialogController = (function () {
    SignupDialogController.$inject = ['pipSigninDialog', 'pipPostSignupDialog', 'pipEntry'];
    function SignupDialogController(pipSigninDialog, pipPostSignupDialog, pipEntry) {
        "ngInject";
        var _this = this;
        this.pipSigninDialog = pipSigninDialog;
        this.pipPostSignupDialog = pipPostSignupDialog;
        this.pipEntry = pipEntry;
        pipEntry.signout();
        this.pipGotoSigninDialog = function () {
            _this.gotoSigninDialog();
        };
        this.pipGotoPostSignupDialog = function (user) {
            _this.gotoPostSignupDialog(user);
        };
    }
    SignupDialogController.prototype.gotoSigninDialog = function () {
        this.pipSigninDialog.show({});
    };
    SignupDialogController.prototype.gotoPostSignupDialog = function (user) {
        this.pipPostSignupDialog.show({
            $party: user
        });
    };
    return SignupDialogController;
}());
{
    angular.module('pipEntry.SignupDialog', [
        'pipEntry.Common',
        "pipSignupPanel",
        'pipEntry.SigninDialog',
        'pipEntry.PostSignupDialog'
    ])
        .service('pipSignupDialog', SignupDialogService);
}
},{}],61:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EntryModel_1 = require("../common/EntryModel");
var SingupModel = (function (_super) {
    __extends(SingupModel, _super);
    SingupModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipAuthState', 'pipFormErrors', 'pipRest', 'pipEntry', 'pipEntryData', 'pipTranslate'];
    function SingupModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipEntry, pipEntryData, pipTranslate) {
        "ngInject";
        var _this = _super.call(this, pipEntryCommon) || this;
        _this.$rootScope = $rootScope;
        _this.$location = $location;
        _this.$state = $state;
        _this.$injector = $injector;
        _this.pipAuthState = pipAuthState;
        _this.pipFormErrors = pipFormErrors;
        _this.pipRest = pipRest;
        _this.pipEntry = pipEntry;
        _this.pipEntryData = pipEntryData;
        _this.pipTranslate = pipTranslate;
        _this.regestryVerifyEmailKey = 'verified_email';
        _this.transaction = pipTransaction.create('entry.signup');
        return _this;
    }
    SingupModel.prototype.init = function ($scope) {
        this.initModel($scope);
        this.setElementVisability();
    };
    SingupModel.prototype.setElementVisability = function () {
        this.hideObject.agreement = new Boolean(this.hideObject.agreement) == true;
        this.hideObject.title = new Boolean(this.hideObject.title) == true;
        this.hideObject.server = new Boolean(this.hideObject.server) == true;
        this.hideObject.passwordConfirm = new Boolean(this.hideObject.passwordConfirm) == true;
        this.hideObject.signin = new Boolean(this.hideObject.signin) == true;
        this.hideObject.hint = new Boolean(this.hideObject.hint) == true;
        this.hideObject.progress = new Boolean(this.hideObject.progress) == true;
    };
    SingupModel.prototype.gotoSignin = function (gotoSigninPage, gotoSigninDialog) {
        if (!gotoSigninPage && !gotoSigninDialog) {
            this.$state.go(this.pipAuthState.signinState(), {});
            return;
        }
        if (gotoSigninPage) {
            this.$state.go(gotoSigninPage);
            return;
        }
        if (gotoSigninDialog) {
            gotoSigninDialog();
            return;
        }
    };
    SingupModel.prototype.onSignup = function (gotoPostSignup) {
        var _this = this;
        if (this.config.form.$invalid) {
            this.pipFormErrors.resetFormErrors(this.config.form, true);
            return;
        }
        var transactionId = this.transaction.begin('PROCESSING');
        if (!transactionId)
            return;
        if (!this.pipRest.lockServerUrl) {
            this.pipRest.serverUrl = this.config.data.serverUrl;
        }
        this.pipRest.getResource('signup').call({
            serverUrl: this.config.data.serverUrl,
            name: this.config.data.name,
            login: this.config.useEmailAsLogin ? this.config.data.email : this.config.data.login,
            email: this.config.data.email,
            password: this.config.data.password,
            language: this.pipTranslate.language || 'en',
            theme: 'default',
            time_zone: null
        }, function (data) {
            _this.pipFormErrors.resetFormErrors(_this.config.form, false);
            if (_this.transaction.aborted(transactionId))
                return;
            _this.pipEntry.openSession(data);
            _this.transaction.end();
            _this.pipEntryData.saveSettingsKey(_this.pipEntry.getUserId(data), _this.regestryVerifyEmailKey, false);
            if (_this.config.isPostSignup) {
                if (!gotoPostSignup) {
                    _this.pipAuthState.go('post_signup', {
                        party_id: _this.pipEntry.getUserId(data)
                    });
                }
                else {
                    gotoPostSignup(data);
                }
            }
            else {
                _this.pipRest.getResource('email_settings').get({
                    user_id: data.user.id
                }, function (setting) {
                    if (setting && setting.verified && setting.email == data.user.login) {
                        _this.pipAuthState.goToAuthorized({});
                    }
                    else {
                        _this.pipAuthState.go('verify_email', {
                            email: data.user.login || data.user['email'], serverUrl: _this.pipRest.serverUrl
                        });
                    }
                    _this.transaction.end();
                }, function (error) {
                    _this.pipFormErrors.resetFormErrors(_this.config.form, true);
                    _this.pipFormErrors.setFormError(_this.config.form, error, {
                        'WRONG_LOGIN': 'signupLogin',
                        'NO_LOGIN': 'signupLogin',
                        'ALREADY_EXIST': 'signupLogin',
                        'WRONG_PASSWORD': 'password',
                        'NO_EMAIL': 'userEmail',
                        'NO_NAME': 'signupFullName',
                        'act_execute': 'form',
                        '-1': 'form'
                    });
                    _this.transaction.end(error);
                });
            }
        }, function (error) {
            _this.pipFormErrors.resetFormErrors(_this.config.form, true);
            _this.pipFormErrors.setFormError(_this.config.form, error, {
                'WRONG_LOGIN': 'signupLogin',
                'NO_LOGIN': 'signupLogin',
                'ALREADY_EXIST': 'signupLogin',
                'WRONG_PASSWORD': 'password',
                'NO_EMAIL': 'userEmail',
                'NO_NAME': 'signupFullName',
                'act_execute': 'form',
                '-1': 'form'
            });
            _this.transaction.end(error);
        });
    };
    ;
    return SingupModel;
}(EntryModel_1.EntryModel));
exports.SingupModel = SingupModel;
},{"../common/EntryModel":10}],62:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
{
    var SignupPanelController = (function () {
        SignupPanelController.$inject = ['$scope', 'pipMedia', 'pipFormErrors', 'pipEntryData', 'pipRest', 'pipSignupViewModel'];
        function SignupPanelController($scope, pipMedia, pipFormErrors, pipEntryData, pipRest, pipSignupViewModel) {
            "ngInject";
            this.$scope = $scope;
            this.pipMedia = pipMedia;
            this.pipFormErrors = pipFormErrors;
            this.pipEntryData = pipEntryData;
            this.pipRest = pipRest;
            this.pipSignupViewModel = pipSignupViewModel;
            this.isQuery = false;
            this.pipSignupViewModel.initModel(this.$scope);
            this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
        }
        SignupPanelController.prototype.$postLink = function () {
            this.config.form = this.$scope.form;
        };
        Object.defineProperty(SignupPanelController.prototype, "config", {
            get: function () {
                return this.pipSignupViewModel.config;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignupPanelController.prototype, "transaction", {
            get: function () {
                return this.pipSignupViewModel.transaction;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignupPanelController.prototype, "showServerError", {
            get: function () {
                return this.pipSignupViewModel.showServerError;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SignupPanelController.prototype, "hideObject", {
            get: function () {
                return this.pipSignupViewModel.hideObject;
            },
            enumerable: true,
            configurable: true
        });
        SignupPanelController.prototype.gotoSignin = function () {
            this.pipSignupViewModel.gotoSignin(this.gotoSigninPage, this.gotoSigninDialog);
        };
        SignupPanelController.prototype.onSignup = function () {
            this.pipSignupViewModel.onSignup(this.gotoPostSignup);
        };
        SignupPanelController.prototype.onEnter = function (event) {
            if (event.keyCode === 13) {
                this.onSignup();
            }
        };
        SignupPanelController.prototype.onChangeEmail = function (field) {
            var _this = this;
            if (!this.config.data.email) {
                return;
            }
            if (this.isQuery)
                return;
            this.error = null;
            this.isQuery = true;
            this.pipEntryData.signupValidate(this.config.data.email, function (data) {
                if (_this.config.form && _this.config.form[field]) {
                    _this.config.form[field].$setValidity('emailUnique', true);
                }
                _this.isQuery = false;
            }, function (err) {
                if (err && err.status == 400 && err.data && err.data.code == 'LOGIN_ALREADY_USED') {
                    if (_this.config.form && _this.config.form[field]) {
                        _this.config.form[field].$setValidity('emailUnique', false);
                    }
                }
                else {
                    var code = err.code || (err.data || {}).code || null;
                    if (!code && err.status)
                        code = err.status;
                    if (code == '-1') {
                        _this.error = 'ERROR_' + code;
                    }
                    else {
                        if (err.data && err.data.message) {
                            _this.error = err.data.message;
                        }
                        else if (err.message) {
                            _this.error = err.message;
                        }
                        else if (err.name) {
                            _this.error = err.name;
                        }
                        else
                            _this.error = err;
                    }
                }
                _this.isQuery = false;
            });
        };
        SignupPanelController.prototype.onServerUrlChanged = function () {
            this.error = null;
            this.config.onServerUrlChanged(this.config.form, this.config.selected.searchURLs);
        };
        SignupPanelController.prototype.onChanged = function () {
            this.pipFormErrors.resetFormErrors(this.config.form, false);
            this.pipFormErrors.resetFieldsErrors(this.config.form, null);
            this.pipRest.serverUrl = this.config.selected.searchURLs;
            this.config.data.serverUrl = this.config.selected.searchURLs;
        };
        SignupPanelController.prototype.isError = function (error) {
            return error.required || error.email || error.emailUnique || error.ERROR_WRONG_LOGIN || error.ERROR_NO_LOGIN;
        };
        return SignupPanelController;
    }());
    var SignupPanelBindings = {
        gotoPostSignup: '=pipPostSignup',
        gotoSigninPage: '=pipGotoSigninPage',
        gotoSigninDialog: '=pipGotoSigninDialog',
    };
    var SignupPanelBindingsChanges = (function () {
        function SignupPanelBindingsChanges() {
        }
        return SignupPanelBindingsChanges;
    }());
    var SignupPanel = {
        bindings: SignupPanelBindings,
        controller: SignupPanelController,
        templateUrl: 'signup/SignupPanel.html'
    };
    angular.module("pipSignupPanel", ['pipFocused', 'pipEntry.Strings'])
        .component('pipSignupPanel', SignupPanel);
}
},{}],63:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SignupModel_1 = require("./SignupModel");
var SignupViewModel = (function () {
    SignupViewModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipAuthState', 'pipFormErrors', 'pipRest', 'pipEntry', 'pipEntryData', 'pipTranslate'];
    function SignupViewModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipEntry, pipEntryData, pipTranslate) {
        "ngInject";
        this.model = new SignupModel_1.SingupModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipEntry, pipEntryData, pipTranslate);
    }
    Object.defineProperty(SignupViewModel.prototype, "transaction", {
        get: function () {
            return this.model.transaction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupViewModel.prototype, "hideObject", {
        get: function () {
            return this.model.hideObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupViewModel.prototype, "showServerError", {
        get: function () {
            return this.model.showServerError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupViewModel.prototype, "config", {
        get: function () {
            return this.model.config;
        },
        enumerable: true,
        configurable: true
    });
    SignupViewModel.prototype.initModel = function ($scope) {
        this.model.init($scope);
    };
    SignupViewModel.prototype.gotoSignin = function (gotoSigninPage, gotoSigninDialog) {
        this.model.gotoSignin(gotoSigninPage, gotoSigninDialog);
    };
    SignupViewModel.prototype.onSignup = function (gotoPostSignup) {
        this.model.onSignup(gotoPostSignup);
    };
    return SignupViewModel;
}());
exports.SignupViewModel = SignupViewModel;
angular.module('pipEntry.Signup')
    .service('pipSignupViewModel', SignupViewModel);
},{"./SignupModel":61}],64:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VerifyEmailController = (function () {
    VerifyEmailController.$inject = ['$scope', '$window', 'pipFormErrors', 'pipVerifyEmailViewModel', 'pipIdentity', '$timeout'];
    function VerifyEmailController($scope, $window, pipFormErrors, pipVerifyEmailViewModel, pipIdentity, $timeout) {
        "ngInject";
        var _this = this;
        this.$scope = $scope;
        this.$window = $window;
        this.pipFormErrors = pipFormErrors;
        this.pipVerifyEmailViewModel = pipVerifyEmailViewModel;
        this.pipIdentity = pipIdentity;
        this.$timeout = $timeout;
        pipVerifyEmailViewModel.initModel(this.$scope);
        this.touchedErrorsWithHint = pipFormErrors.touchedErrorsWithHint;
        $timeout(function () {
            _this.config.form = _this.$scope.form;
            if (_this.config.data.code && _this.config.data.email) {
                _this.showValidateProgress = true;
                _this.pipVerifyEmailViewModel.onVerify(function (data) {
                    _this.pipVerifyEmailViewModel.onContinue();
                }, function (error) {
                    _this.showValidateProgress = false;
                });
            }
            else {
                _this.showValidateProgress = false;
            }
        }, 0);
    }
    VerifyEmailController.prototype.goBack = function () {
        this.pipVerifyEmailViewModel.onCancel();
    };
    Object.defineProperty(VerifyEmailController.prototype, "config", {
        get: function () {
            return this.pipVerifyEmailViewModel.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerifyEmailController.prototype, "transaction", {
        get: function () {
            return this.pipVerifyEmailViewModel.transaction;
        },
        enumerable: true,
        configurable: true
    });
    VerifyEmailController.prototype.onVerify = function () {
        this.pipVerifyEmailViewModel.onVerify();
    };
    VerifyEmailController.prototype.onRecover = function () {
        this.pipVerifyEmailViewModel.onRecover();
    };
    return VerifyEmailController;
}());
exports.VerifyEmailController = VerifyEmailController;
var VerifyEmailSuccessController = (function () {
    function VerifyEmailSuccessController($scope, pipVerifyEmailViewModel) {
        this.pipVerifyEmailViewModel = pipVerifyEmailViewModel;
        pipVerifyEmailViewModel.initModel($scope);
    }
    VerifyEmailSuccessController.prototype.onContinue = function () {
        this.pipVerifyEmailViewModel.onContinue();
    };
    return VerifyEmailSuccessController;
}());
exports.VerifyEmailSuccessController = VerifyEmailSuccessController;
angular.module('pipEntry.VerifyEmail', []);
},{}],65:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EntryModel_1 = require("../common/EntryModel");
var VerifyEmailModel = (function (_super) {
    __extends(VerifyEmailModel, _super);
    VerifyEmailModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipAuthState', 'pipFormErrors', 'pipRest', 'pipEntryData', 'pipIdentity', 'pipEntry'];
    function VerifyEmailModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipEntryData, pipIdentity, pipEntry) {
        "ngInject";
        var _this = _super.call(this, pipEntryCommon) || this;
        _this.$rootScope = $rootScope;
        _this.$location = $location;
        _this.$state = $state;
        _this.$injector = $injector;
        _this.pipAuthState = pipAuthState;
        _this.pipFormErrors = pipFormErrors;
        _this.pipRest = pipRest;
        _this.pipEntryData = pipEntryData;
        _this.pipIdentity = pipIdentity;
        _this.pipEntry = pipEntry;
        _this.regestryVerifyEmailKey = 'verified_email';
        _this.transaction = pipTransaction.create('entry.verify_email');
        return _this;
    }
    VerifyEmailModel.prototype.init = function ($scope) {
        this.initModel($scope);
        this.setElementVisability();
        this.pipEntryCommon.configureAppBar();
    };
    VerifyEmailModel.prototype.setElementVisability = function () {
        this.hideObject.remember = new Boolean(this.hideObject.remember) == true;
        this.hideObject.title = new Boolean(this.hideObject.title) == true;
        this.hideObject.server = new Boolean(this.hideObject.server) == true;
        this.hideObject.forgotPassword = new Boolean(this.hideObject.forgotPassword) == true;
        this.hideObject.signup = new Boolean(this.hideObject.signup) == true;
        this.hideObject.hint = new Boolean(this.hideObject.hint) == true;
        this.hideObject.progress = new Boolean(this.hideObject.progress) == true;
    };
    VerifyEmailModel.prototype.onVerify = function (successCallback, errorCallback) {
        var _this = this;
        if (this.config.form.$invalid) {
            this.pipFormErrors.resetFormErrors(this.config.form, true);
            return;
        }
        var transactionId = this.transaction.begin('PROCESSING');
        if (!transactionId)
            return;
        if (!this.pipRest.lockServerUrl) {
            this.pipRest.serverUrl = this.config.data.serverUrl;
        }
        this.pipEntryData.verifyEmail({
            login: this.config.data.login,
            email: this.config.data.email || this.config.data.login,
            code: this.config.data.code
        }, function (data) {
            _this.pipFormErrors.resetFormErrors(_this.config.form, false);
            if (_this.transaction.aborted(transactionId))
                return;
            var userId = _this.pipEntryData.getUserId();
            if (successCallback)
                successCallback(data);
            _this.transaction.end();
            _this.pipEntryData.saveSettingsKey(userId, _this.regestryVerifyEmailKey, true, function (data) {
                var identity = _this.pipIdentity.identity;
                if (identity && identity.user) {
                    if (!identity.user.settings)
                        identity.user.settings = {};
                    identity.user.settings[_this.regestryVerifyEmailKey] = "true";
                    _this.pipIdentity.identity = identity;
                }
                _this.onContinue();
            }, function (error) {
                _this.transaction.end(error);
            });
        }, function (error) {
            _this.transaction.end(error);
            _this.pipFormErrors.resetFormErrors(_this.config.form, true);
            _this.pipFormErrors.setFormError(_this.config.form, error, {
                'WRONG_LOGIN_EMAIL': 'login',
                'NO_LOGIN_EMAIL': 'login',
                'NO_EMAIL': 'login',
                'INVALID_CODE': 'code',
                'act_execute': 'form',
                '-1': 'form'
            });
            if (errorCallback)
                errorCallback(error);
        });
    };
    VerifyEmailModel.prototype.onRecover = function () {
        var _this = this;
        if (!this.config.data.login) {
            return;
        }
        var tid = this.transaction.begin('PROCESSING');
        if (!tid)
            return;
        this.pipEntryData.requestEmailVerification({
            login: this.config.data.login
        }, function (data) {
            if (_this.transaction.aborted(tid))
                return;
            _this.config.data.code = null;
            _this.transaction.end();
        }, function (error) {
            _this.transaction.end(error);
        });
    };
    VerifyEmailModel.prototype.onContinue = function () {
        if (this.pipAuthState.params.redirect_to) {
            this.$location.url(this.pipAuthState.params.redirect_to);
        }
        else {
            this.pipAuthState.goToAuthorized(this.config && this.config.data ? this.config.data : {});
        }
    };
    VerifyEmailModel.prototype.onCancel = function () {
        this.pipEntry.signout();
        this.pipAuthState.goToUnauthorized({});
    };
    return VerifyEmailModel;
}(EntryModel_1.EntryModel));
exports.VerifyEmailModel = VerifyEmailModel;
},{"../common/EntryModel":10}],66:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VerifyEmailModel_1 = require("./VerifyEmailModel");
var VerifyEmailViewModel = (function () {
    VerifyEmailViewModel.$inject = ['pipEntryCommon', 'pipTransaction', '$rootScope', '$location', '$state', '$injector', 'pipAuthState', 'pipFormErrors', 'pipRest', 'pipEntryData', 'pipIdentity', 'pipEntry'];
    function VerifyEmailViewModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipEntryData, pipIdentity, pipEntry) {
        "ngInject";
        this.model = new VerifyEmailModel_1.VerifyEmailModel(pipEntryCommon, pipTransaction, $rootScope, $location, $state, $injector, pipAuthState, pipFormErrors, pipRest, pipEntryData, pipIdentity, pipEntry);
    }
    Object.defineProperty(VerifyEmailViewModel.prototype, "transaction", {
        get: function () {
            return this.model.transaction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerifyEmailViewModel.prototype, "hideObject", {
        get: function () {
            return this.model.hideObject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerifyEmailViewModel.prototype, "showServerError", {
        get: function () {
            return this.model.showServerError;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VerifyEmailViewModel.prototype, "config", {
        get: function () {
            return this.model.config;
        },
        enumerable: true,
        configurable: true
    });
    VerifyEmailViewModel.prototype.initModel = function ($scope) {
        this.model.init($scope);
    };
    VerifyEmailViewModel.prototype.onVerify = function (successCallback, errorCallback) {
        this.model.onVerify(successCallback, errorCallback);
    };
    VerifyEmailViewModel.prototype.onRecover = function () {
        this.model.onRecover();
    };
    VerifyEmailViewModel.prototype.onContinue = function () {
        this.model.onContinue();
    };
    VerifyEmailViewModel.prototype.onCancel = function () {
        this.model.onCancel();
    };
    return VerifyEmailViewModel;
}());
exports.VerifyEmailViewModel = VerifyEmailViewModel;
angular.module('pipEntry.VerifyEmail')
    .service('pipVerifyEmailViewModel', VerifyEmailViewModel);
},{"./VerifyEmailModel":65}],67:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('change_password/ChangePassword.html',
    '<div class="pip-card-container pip-outer-scroll pip-entry"><pip-card width="400"><pip-change-password-panel class="scroll-y"></pip-change-password-panel><div class="pip-footer"><md-button ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.goBack()" class="rm8" aria-label="CANCEL">{{ ::\'CANCEL\' | translate }}</md-button><md-button ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.onChange()" aria-label="ENTRY_CHANGE_PASSWORD" ng-disabled="($ctrl.config.form.$pristine && !$ctrl.config.data.login) || $ctrl.config.data.serverUrl.length == 0 || $ctrl.config.data.login.length == 0 || $ctrl.config.data.code.length == 0 || $ctrl.config.data.password.length < 6" class="md-accent" type="submit">{{ ::\'ENTRY_CHANGE_PASSWORD\' | translate }}</md-button><md-button class="md-warn" ng-show="$ctrl.transaction.busy()" ng-click="$ctrl.transaction.abort()" aria-label="ABORT">{{ ::\'CANCEL\' | translate }}</md-button></div></pip-card></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('change_password/ChangePasswordDialog.html',
    '<md-dialog class="pip-entry lp0 rp0"><md-dialog-content><pip-change-password-panel></pip-change-password-panel></md-dialog-content><md-dialog-actions class="layout-row layout-align-end-center"><md-button ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.goBack()" class="rm8" aria-label="CANCEL">{{ ::\'CANCEL\' | translate }}</md-button><md-button ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.onChange()" aria-label="ENTRY_CHANGE_PASSWORD" ng-disabled="($ctrl.config.form.$pristine && !$ctrl.config.data.login) || $ctrl.config.data.serverUrl.length == 0 || $ctrl.config.data.login.length == 0 || $ctrl.config.data.code.length == 0 || $ctrl.config.data.password.length < 6" class="md-accent" type="submit">{{ ::\'ENTRY_CHANGE_PASSWORD\' | translate }}</md-button><md-button class="md-warn" ng-show="$ctrl.transaction.busy()" ng-click="$ctrl.transaction.abort()" aria-label="ABORT">{{ ::\'CANCEL\' | translate }}</md-button></md-dialog-actions></md-dialog>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('change_password/ChangePasswordPanel.html',
    '<div class="pip-body"><div class="pip-content"><md-progress-linear ng-show="$ctrl.transaction.busy() && $ctrl.showServerError && !$ctrl.hideObject.progress" md-mode="indeterminate" class="pip-progress-top"></md-progress-linear><h2 ng-if="!$ctrl.hideObject.changePwdTitle">{{::\'CHANGE_PWD_PASSWORD\' | translate}}</h2><p class="title-padding bm16" ng-if="!$ctrl.hideObject.changePwdSubTitle">{{::\'CHANGE_PWD_TEXT\' | translate}}</p><form name="form" novalidate="" autocomplete="off"><input name="password" style="display:none"> <input name="passwordNew" style="display:none"><div ng-messages="$ctrl.config.form.$serverError" class="text-error bm8 color-error" md-auto-hide="false"><div ng-message="ERROR_act_execute">{{ ::\'ERROR_ACT_EXECUTE\' | translate }}</div><div ng-message="ERROR_-1">{{ ::\'ERROR_SERVER\' | translate }}</div><div ng-message="ERROR_UNKNOWN">{{ \'ERROR_UNKNOWN\' | translate }}</div></div><div ng-show="$ctrl.config.showServerUrl && !$ctrl.hideObject.server" class="bp8"><md-autocomplete ng-initial="" autofocus="" tabindex="1" class="pip-combobox w-stretch bm8" name="server" ng-enabled="!$ctrl.transaction.busy()" placeholder="{{::\'ENTRY_SERVER_URL\' | translate}}" md-no-cache="true" md-selected-item="$ctrl.config.data.serverUrl" md-search-text="$ctrl.config.selected.searchURLs" md-items="item in $ctrl.config.getMatches($ctrl.config.selected.searchURLs)" md-item-text="item" md-selected-item-change="$ctrl.onServerUrlChanged()" md-search-text-change="$ctrl.onChanged()" md-delay="200" ng-model="$ctrl.config.data.serverUrl" pip-clear-errors=""><span md-highlight-text="$ctrl.config.selected.searchURLs">{{ item }}</span></md-autocomplete></div><md-input-container class="pip-no-hint" style="padding-bottom: 4px!important;"><label>{{::\'OLD_PASSWORD\' | translate}}</label> <input name="password" ng-disabled="$ctrl.transaction.busy()" xxxpip-clear-errors="" type="password" tabindex="4" ng-model="$ctrl.config.data.password" required="" minlength="6" ng-change="$ctrl.onChangePassword()" pip-compare-old-password="" compare-to="$ctrl.config.data.passwordNew"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.password, true).hint && !$ctrl.hideObject.hint">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.password, true)" class="md-input-error" md-auto-hide="false"><div ng-message="required">{{::\'MINLENGTH_PASSWORD\' | translate}}</div><div ng-message="minlength">{{::\'MINLENGTH_PASSWORD\' | translate}}</div><div ng-message="ERROR_WRONG_PASSWORD">{{::\'ERROR_WRONG_PASSWORD\' | translate}}</div><div ng-message="ERROR_compareTo">{{::\'PASSWORD_IDENTICAL\' | translate}}</div></div></md-input-container><md-input-container class="display bp4"><label>{{::\'NEW_PASSWORD_SET\' | translate}}</label> <input name="passwordNew" ng-disabled="$ctrl.transaction.busy()" xxxpip-clear-errors="" type="password" tabindex="4" ng-model="$ctrl.config.data.passwordNew" ng-change="$ctrl.onChangePasswordNew()" required="" minlength="6" ng-keypress="$ctrl.onEnter($event)" pip-test="input-password" autocomplete="off" pip-compare-new-password="" compare-to1="$ctrl.config.data.password"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.passwordNew, true).hint && !$ctrl.hideObject.hint">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.passwordNew, true)" md-auto-hide="false"><div ng-message="required">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-message="minlength">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-message="ERROR_compareTo">{{::\'PASSWORD_IDENTICAL\' | translate}}</div><div ng-message="ERROR_WRONG_PASSWORD" xxxng-if="!$ctrl.config.form.passwordNew.$pristine">{{::\'ERROR_WRONG_PASSWORD\' | translate}}</div></div></md-input-container><md-input-container class="display bp4" ng-if="!$ctrl.hideObject.passwordConfirm"><label>{{::\'NEW_PASSWORD_CONFIRM\' | translate}}</label> <input name="passwordConfirm" type="password" tabindex="4" required="" minlength="6" ng-model="$ctrl.confirmPassword" ng-disabled="$ctrl.transaction.busy()" xxpip-clear-errors="" ng-change="$ctrl.onChangePasswordConfirm()" pip-compare-password-match="" compare-to2="$ctrl.config.data.passwordNew" ng-keypress="$ctrl.onEnter($event)" pip-test="input-password"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.passwordConfirm, true).hint && !$ctrl.hideObject.hint">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.passwordConfirm, true)" md-auto-hide="false"><div ng-message="required">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-message="minlength">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-message="ERROR_compareTo">{{::\'PASSWORD_MATCH\' | translate}}</div></div></md-input-container></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('expire_change_password/ExpireChangePassword.html',
    '<div class="pip-card-container pip-outer-scroll pip-entry"><pip-card width="400"><pip-expire-change-password-panel class="scroll-y"></pip-expire-change-password-panel><div class="pip-footer"><md-button ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.goBack()" class="rm8" aria-label="CANCEL">{{ ::\'CANCEL\' | translate }}</md-button><md-button ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.onChange()" aria-label="ENTRY_EXPIRE_CHANGE_PASSWORD" ng-disabled="($ctrl.config.form.$pristine && !$ctrl.config.data.login) || $ctrl.config.data.serverUrl.length == 0 || $ctrl.config.data.login.length == 0 || $ctrl.config.data.code.length == 0 || $ctrl.config.data.password.length < 6" class="md-accent" type="submit">{{ ::\'ENTRY_EXPIRE_CHANGE_PASSWORD\' | translate }}</md-button><md-button class="md-warn" ng-show="$ctrl.transaction.busy()" ng-click="$ctrl.transaction.abort()" aria-label="ABORT">{{ ::\'CANCEL\' | translate }}</md-button></div></pip-card></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('expire_change_password/ExpireChangePasswordDialog.html',
    '<md-dialog class="pip-entry lp0 rp0"><md-dialog-content><pip-expire-change-password-panel></pip-expire-change-password-panel></md-dialog-content><md-dialog-actions class="layout-row layout-align-end-center"><md-button ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.goBack()" class="rm8" aria-label="CANCEL">{{ ::\'CANCEL\' | translate }}</md-button><md-button ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.onChange()" aria-label="ENTRY_EXPIRE_CHANGE_PASSWORD" ng-disabled="($ctrl.config.form.$pristine && !$ctrl.config.data.login) || $ctrl.config.data.serverUrl.length == 0 || $ctrl.config.data.login.length == 0 || $ctrl.config.data.code.length == 0 || $ctrl.config.data.password.length < 6" class="md-accent" type="submit">{{ ::\'ENTRY_EXPIRE_CHANGE_PASSWORD\' | translate }}</md-button><md-button class="md-warn" ng-show="$ctrl.transaction.busy()" ng-click="$ctrl.transaction.abort()" aria-label="ABORT">{{ ::\'CANCEL\' | translate }}</md-button></md-dialog-actions></md-dialog>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('expire_change_password/ExpireChangePasswordPanel.html',
    '<div class="pip-body"><div class="pip-content"><md-progress-linear ng-show="$ctrl.transaction.busy() && $ctrl.showServerError && !$ctrl.hideObject.progress" md-mode="indeterminate" class="pip-progress-top"></md-progress-linear><h2 ng-if="!$ctrl.hideObject.changePwdTitle">{{::\'EXPIRE_CHANGE_PWD_PASSWORD\' | translate}}</h2><p class="title-padding bm16" ng-if="!$ctrl.hideObject.changePwdSubTitle">{{::\'EXPIRE_CHANGE_PWD_TEXT\' | translate}}</p><form name="form" novalidate="" autocomplete="off"><div ng-messages="$ctrl.config.form.$serverError" class="text-error bm8 color-error" md-auto-hide="false"><div ng-message="ERROR_act_execute">{{::\'ERROR_ACT_EXECUTE\' | translate}}</div><div ng-message="ERROR_-1">{{::\'ERROR_SERVER\' | translate}}</div><div ng-message="ERROR_UNKNOWN">{{ $ctrl.config.form.$serverError.ERROR_UNKNOWN | translate }}</div></div><div class="bp16"><a ng-hide="$ctrl.config.showServerUrl || $ctrl.config.fixedServerUrl || $ctrl.hideObject.server" ng-click="$ctrl.config.showServerUrl = true" href="">{{::\'ENTRY_CHANGE_SERVER\' | translate}}</a></div><div ng-show="$ctrl.config.showServerUrl && !$ctrl.hideObject.server" class="bp8"><md-autocomplete ng-initial="" autofocus="" tabindex="1" class="pip-combobox w-stretch bm8" name="server" ng-enabled="!$ctrl.transaction.busy()" placeholder="{{::\'ENTRY_SERVER_URL\' | translate}}" md-no-cache="true" md-selected-item="$ctrl.config.data.serverUrl" md-search-text="$ctrl.config.selected.searchURLs" md-items="item in $ctrl.config.getMatches($ctrl.config.selected.searchURLs)" md-item-text="item" md-selected-item-change="$ctrl.onServerUrlChanged()" md-search-text-change="$ctrl.onChanged()" md-delay="200" ng-model="$ctrl.config.data.serverUrl" pip-clear-errors=""><span md-highlight-text="$ctrl.config.selected.searchURLs">{{ item }}</span></md-autocomplete></div><md-input-container class="pip-no-hint" style="padding-bottom: 4px!important;"><label>{{::\'OLD_PASSWORD\' | translate}}</label> <input name="password" ng-disabled="$ctrl.transaction.busy()" pip-clear-errors="" type="password" tabindex="4" ng-model="$ctrl.config.data.password" required="" minlength="6"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.password).hint && !$ctrl.hideObject.hint">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.password)" class="md-input-error" md-auto-hide="false"><div ng-message="required">{{::\'MINLENGTH_PASSWORD\' | translate}}</div><div ng-message="minlength">{{::\'MINLENGTH_PASSWORD\' | translate}}</div><div ng-message="ERROR_WRONG_PASSWORD">{{::\'ERROR_WRONG_PASSWORD\' | translate}}</div></div></md-input-container><md-input-container class="display bp4"><label>{{::\'NEW_PASSWORD_SET\' | translate}}</label> <input name="passwordNew" ng-disabled="$ctrl.transaction.busy()" pip-clear-errors="" type="password" tabindex="4" ng-model="$ctrl.config.data.passwordNew" required="" minlength="6" ng-keypress="$ctrl.onEnter($event)" pip-test="input-password"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.passwordNew).hint && !$ctrl.hideObject.hint">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.passwordNew)" md-auto-hide="false"><div ng-message="required">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-message="minlength">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-message="ERROR_WRONG_PASSWORD" xxxng-if="!$ctrl.config.form.passwordNew.$pristine">{{::\'ERROR_WRONG_PASSWORD\' | translate}}</div></div></md-input-container><md-input-container class="display bp4" ng-if="!$ctrl.hideObject.passwordConfirm"><label>{{::\'NEW_PASSWORD_CONFIRM\' | translate}}</label> <input name="passwordConfirm" type="password" tabindex="4" required="" minlength="6" ng-model="$ctrl.confirmPassword" ng-disabled="$ctrl.transaction.busy()" pip-clear-errors="" pip-compare-password-match="" compare-to2="$ctrl.config.data.passwordNew" ng-keypress="$ctrl.onEnter($event)" pip-test="input-password"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.passwordConfirm, true).hint && !$ctrl.hideObject.hint">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.passwordConfirm, true)" md-auto-hide="false"><div ng-message="ERROR_compareTo">{{::\'PASSWORD_MATCH\' | translate}}</div><div ng-message="required">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-message="minlength">{{::\'HINT_PASSWORD\' | translate}}</div></div></md-input-container></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('recover_password/RecoverPassword.html',
    '<div class="pip-card-container pip-outer-scroll pip-entry"><pip-card width="400"><pip-recover-password-panel class="scroll-y"></pip-recover-password-panel><div class="pip-footer"><md-button ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.goBack()" class="rm8" aria-label="CANCEL">{{ ::\'CANCEL\' | translate }}</md-button><md-button ng-hide="$ctrl.transaction.busy()" class="md-accent" ng-click="$ctrl.onRecover()" aria-label="RECOVER_PWD_RECOVER" type="submit" ng-disabled="($ctrl.config.form.$pristine && !$ctrl.config.data.login) || $ctrl.config.data.serverUrl.length == 0 || $ctrl.config.data.login.length == 0">{{ ::\'RECOVER_PWD_RECOVER\' | translate }}</md-button><md-button ng-show="$ctrl.transaction.busy()" class="md-warn" ng-click="$ctrl.transaction.abort()" aria-label="ABORT">{{ ::\'CANCEL\' | translate }}</md-button></div></pip-card></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('recover_password/RecoverPasswordDialog.html',
    '<md-dialog class="pip-entry lp0 rp0"><md-dialog-content><pip-recover-password-panel></pip-recover-password-panel></md-dialog-content><md-dialog-actions class="layout-row layout-align-end-center"><md-button ng-hide="$ctlr.transaction.busy()" ng-click="$ctlr.goBack()" class="rm8" aria-label="CANCEL">{{::\'CANCEL\' | translate}}</md-button><md-button ng-hide="$ctlr.transaction.busy()" class="md-accent" ng-click="$ctlr.onRecover()" aria-label="RECOVER_PWD_RECOVER" ng-disabled="($$ctlr.config.form.$pristine && !$ctlr.config.data.login) || $ctlr.config.data.login== undefined || || $ctlr.config.data.serverUrl.length == 0 || $ctlr.config.data.login.length == 0">{{::\'RECOVER_PWD_RECOVER\' | translate}}</md-button><md-button ng-show="$ctlr.transaction.busy()" class="md-warn" ng-click="$ctlr.transaction.abort()" aria-label="ABORT">{{::\'CANCEL\' | translate}}</md-button></md-dialog-actions></md-dialog>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('recover_password/RecoverPasswordPanel.html',
    '<div class="pip-body"><div class="pip-content"><md-progress-linear ng-show="$ctrl.transaction.busy() && !$ctrl.hideObject.progress" md-mode="indeterminate" class="pip-progress-top"></md-progress-linear><h2 ng-if="!$ctrl.hideObject.title">{{ \'RECOVER_PWD_TITLE\' | translate }}</h2><p class="text-primary tm0 bm16" ng-if="!$ctrl.hideObject.subTitle1 && !$ctrl.config.useEmailAsLogin">{{ \'RECOVER_PWD_TEXT_1_LOGIN\' | translate }}</p><p class="text-primary tm0 bm16" ng-if="!$ctrl.hideObject.subTitle1 && $ctrl.config.useEmailAsLogin">{{ \'RECOVER_PWD_TEXT_1_EMAIL\' | translate }}</p><p class="text-primary tm0 bm16" ng-if="!$ctrl.hideObject.subTitle2">{{ \'RECOVER_PWD_TEXT_2\' | translate }}</p><form name="form" novalidate="" autocomplete="off"><div ng-messages="$ctrl.config.form.$serverError" class="text-error bm8 color-error" md-auto-hide="false"><div ng-message="ERROR_act_execute">{{::\'ERROR_ACT_EXECUTE\' | translate}}</div><div ng-message="ERROR_-1">{{::\'ERROR_SERVER\' | translate}}</div><div ng-message="ERROR_UNKNOWN">{{ $ctrl.config.form.$serverError.ERROR_UNKNOWN | translate }}</div></div><div class="bp16"><a ng-hide="$ctrl.config.showServerUrl || $ctrl.config.fixedServerUrl || $ctrl.hideObject.server" ng-click="$ctrl.config.showServerUrl = true" href="">{{ ::\'ENTRY_CHANGE_SERVER\' | translate }}</a></div><div ng-show="$ctrl.config.showServerUrl && !$ctrl.hideObject.server" class="bp8"><md-autocomplete ng-initial="" autofocus="" tabindex="1" class="pip-combobox w-stretch bm8" name="server" aria-label="URL" ng-enabled="!$ctrl.transaction.busy()" placeholder="{{::\'ENTRY_SERVER_URL\' | translate}}" md-no-cache="true" md-selected-item="$ctrl.config.data.serverUrl" md-search-text="$ctrl.config.selected.searchURLs" md-items="item in $ctrl.config.getMatches($ctrl.config.selected.searchURLs)" md-item-text="item" md-selected-item-change="$ctrl.onServerUrlChanged()" md-search-text-change="$ctrl.onChanged()" md-delay="200" ng-model="$ctrl.config.data.serverUrl" pip-clear-errors=""><span md-highlight-text="$ctrl.config.selected.searchURLs">{{ item }}</span></md-autocomplete></div><md-input-container class="pip-no-hint" style="padding-bottom: 4px!important;"><label ng-if="!$ctrl.config.useEmailAsLogin">{{::\'LOGIN\' | translate}}</label> <label ng-if="$ctrl.config.useEmailAsLogin">{{::\'EMAIL\' | translate}}</label> <input name="login" type="text" aria-label="LOGIN" ng-model="$ctrl.config.data.login" required="" step="any" pip-clear-errors="" ng-disabled="$ctrl.transaction.busy()" tabindex="2"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.login).hint && !$ctrl.hideObject.hint && !$ctrl.config.useEmailAsLogin">{{::\'HINT_LOGIN\' | translate}}</div><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.login).hint && !$ctrl.hideObject.hint && $ctrl.config.useEmailAsLogin">{{::\'HINT_EMAIL\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.login)" class="md-input-error" md-auto-hide="false"><div ng-message="required">{{::\'ERROR_LOGIN_INVALID\' | translate }}</div><div ng-message="ERROR_WRONG_LOGIN">{{::\'ERROR_WRONG_LOGIN\' | translate}}</div><div ng-message="ERROR_NO_LOGIN">{{::\'ERROR_NO_LOGIN\' | translate}}</div><div ng-message="ERROR_LOGIN_NOT_FOUND">{{::\'ERROR_LOGIN_NOT_FOUND\' | translate}}</div></div></md-input-container></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('post_signup/PostSignup.html',
    '<div class="pip-card-container pip-outer-scroll pip-entry"><pip-card width="400"><pip-post-signup-panel pip-party="$ctrl.$party"></pip-post-signup-panel><div class="pip-footer"><md-button ng-hide="$ctrl.transaction.busy()" class="md-accent" type="submit" ng-click="$ctrl.onPostSignupSubmit()" aria-label="CONTINUE">{{ ::\'CONTINUE\' | translate }}</md-button><md-button ng-show="$ctrl.transaction.busy()" class="md-warn" ng-click="$ctrl.transaction.abort()" aria-label="ABORT">{{ ::\'CANCEL\' | translate }}</md-button></div></pip-card></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('post_signup/PostSignupDialog.html',
    '<md-dialog class="pip-entry lp0 rp0"><md-dialog-content><pip-post-signup-panel pip-party="$ctrl.$party"></pip-post-signup-panel></md-dialog-content><md-dialog-actions class="layout-row layout-align-end-center"><md-button ng-hide="$ctrl.transaction.busy()" class="md-accent" ng-click="$ctrl.onPostSignupSubmit()" aria-label="CONTINUE">{{ ::\'CONTINUE\' | translate }}</md-button><md-button ng-show="$ctrl.transaction.busy()" class="md-warn" ng-click="$ctrl.transaction.abort()" aria-label="ABORT">{{ ::\'CANCEL\' | translate }}</md-button></md-dialog-actions></md-dialog>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('post_signup/PostSignupPanel.html',
    '<div class="pip-body"><div class="pip-content"><md-progress-linear ng-show="$ctrl.transaction.busy() && !$ctrl.hideObject.progress" md-mode="indeterminate" class="pip-progress-top"></md-progress-linear><h2 class="text-overflow" ng-if="!$ctrl.hideObject.title">{{ \'POST_SIGNUP_TITLE\' | translate }}</h2><p class="bm0 line-height-string" ng-if="!$ctrl.hideObject.successTitle">{{ \'POST_SIGNUP_TEXT_1\' | translate }}</p><p class="line-height-string m0" ng-if="!$ctrl.hideObject.subTitle">{{ \'POST_SIGNUP_TEXT_2\' | translate }}</p><form name="form" novalidate=""><div ng-messages="$ctrl.config.form.$serverError" class="text-error bm8" md-auto-hide="false"><div ng-message="ERROR_1000">{{::\'ERROR_1000\' | translate}}</div><div ng-message="ERROR_1110">{{::\'ERROR_1110\' | translate}}</div><div ng-message="ERROR_1111">{{::\'ERROR_1111\' | translate}}</div><div ng-message="ERROR_1112">{{::\'ERROR_1112\' | translate}}</div><div ng-message="ERROR_1002">{{::\'ERROR_1002\' | translate}}</div><div ng-message="ERROR_-1">{{::\'ERROR_SERVER\' | translate}}</div><div ng-message="ERROR_UNKNOWN">{{ $ctrl.config.form.$serverError.ERROR_UNKNOWN | translate }}</div></div><div class="pip-ref-item"><pip-avatar-edit ng-disabled="$ctrl.transaction.busy()" ng-if="$ctrl.config.enableAvatar" pip-reset="false" pip-party-id="$ctrl.config.data.id" pip-created="$ctrl.onPictureCreated($event)" pip-changed="$ctrl.onPictureChanged($control, $event)" class="rm16 flex-fixed"></pip-avatar-edit><div class="pip-content"><p class="pip-title">{{ $ctrl.config.data.name }}</p><p class="pip-subtitle">{{ $ctrl.config.data.email }}</p></div></div><md-input-container class="pip-no-hint bp4"><label>{{ \'HINT_ABOUT\' | translate }}</label> <textarea ng-model="$ctrl.config.data.about" ng-initial="" ng-disabled="$ctrl.transaction.busy()" pip-clear-errors="">\n' +
    '                        </textarea></md-input-container><div class="tm2"><p class="text-caption bm0">{{ \'GENDER\' | translate }}</p><md-select class="w-stretch tm0 tp0 bp8" ng-disabled="$ctrl.transaction.busy()" ng-model="$ctrl.config.data.gender" label="{{\'GENDER\' | translate}}" ng-change="$ctrl.onStatusChange($ctrl.config.data)" pip-clear-errors=""><md-option ng-value="opt.id" ng-repeat="opt in $ctrl.genders track by opt.id">{{ opt.name }}</md-option></md-select></div><div class="tm2"><p class="text-caption bm0">{{ ::\'BIRTHDAY\' | translate }}</p><pip-date ng-disabled="$ctrl.transaction.busy()" ng-model="$ctrl.config.data.birthday" pip-time-mode="past" pip-clear-errors="" time-mode="past"></pip-date></div><md-input-container><label>{{ ::\'LANGUAGE\' | translate }}</label><md-select class="w-stretch tm0 tp0 bp16" ng-disabled="$ctrl.transaction.busy()" ng-model="$ctrl.config.data.language" ng-change="$ctrl.onStatusChange($ctrl.config.data)" pip-clear-errors=""><md-option ng-value="opt.id" ng-repeat="opt in $ctrl.languages track by opt.id">{{ opt.name }}</md-option></md-select></md-input-container></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('reset_password/ResetPassword.html',
    '<div class="pip-card-container pip-outer-scroll pip-entry"><pip-card width="400"><pip-reset-password-panel class="scroll-y"></pip-reset-password-panel><div class="pip-footer"><md-button ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.goBack()" class="rm8" aria-label="CANCEL">{{ ::\'CANCEL\' | translate }}</md-button><md-button ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.onReset()" aria-label="ENTRY_RESET_PASSWORD" ng-disabled="($ctrl.config.form.$pristine && !$ctrl.config.data.login) || $ctrl.config.data.serverUrl.length == 0 || $ctrl.config.data.login.length == 0 || $ctrl.config.data.resetCode.length == 0 || $ctrl.config.data.password.length < 6" class="md-accent" type="submit">{{ ::\'ENTRY_RESET_PASSWORD\' | translate }}</md-button><md-button class="md-warn" ng-show="$ctrl.transaction.busy()" ng-click="$ctrl.transaction.abort()" aria-label="ABORT">{{ ::\'CANCEL\' | translate }}</md-button></div></pip-card></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('reset_password/ResetPasswordDialog.html',
    '<md-dialog class="pip-entry lp0 rp0"><md-dialog-content><pip-reset-password-panel></pip-reset-password-panel></md-dialog-content><md-dialog-actions class="layout-row layout-align-end-center"><md-button ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.onCancel()" class="rm8" aria-label="CANCEL">{{ ::\'CANCEL\' | translate }}</md-button><md-button ng-hide="$ctrl.transaction.busy()" ng-click="$ctrl.onReset()" aria-label="ENTRY_RESET_PASSWORD" ng-disabled="($ctrl.config.form.$pristine && !$ctrl.config.data.login) || $ctrl.config.data.serverUrl.length == 0 || $ctrl.config.data.login.length == 0 || $ctrl.config.data.resetCode.length == 0 || $ctrl.config.data.password.length < 6" class="md-accent" type="submit">{{ ::\'ENTRY_RESET_PASSWORD\' | translate }}</md-button><md-button class="md-warn" ng-show="$ctrl.transaction.busy()" ng-click="$ctrl.transaction.abort()" aria-label="ABORT">{{ ::\'CANCEL\' | translate }}</md-button></md-dialog-actions></md-dialog>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('reset_password/ResetPasswordPanel.html',
    '<div class="pip-body"><div class="pip-content"><md-progress-linear ng-show="$ctrl.transaction.busy() && $ctrl.showServerError && !$ctrl.hideObject.progress" md-mode="indeterminate" class="pip-progress-top"></md-progress-linear><h2 ng-if="!$ctrl.hideObject.title">{{::\'RESET_PWD_PASSWORD\' | translate}}</h2><p class="title-padding bm16" ng-if="!$ctrl.hideObject.resetSubTitle && !$ctrl.config.useEmailAsLogin">{{::\'RESET_PWD_TEXT_LOGIN\' | translate}}</p><p class="title-padding bm16" ng-if="!$ctrl.hideObject.resetSubTitle && $ctrl.config.useEmailAsLogin">{{::\'RESET_PWD_TEXT_EMAIL\' | translate}}</p><form name="form" novalidate="" autocomplete="off"><input name="code" style="display:none"> <input name="resetCode" style="display:none"> <input name="password" style="display:none"><div ng-messages="$ctrl.config.form.$serverError" class="text-error bm8 color-error" md-auto-hide="false"><div ng-message="ERROR_act_execute">{{::\'ERROR_ACT_EXECUTE\' | translate}}</div><div ng-message="ERROR_-1">{{::\'ERROR_SERVER\' | translate}}</div><div ng-message="ERROR_UNKNOWN">{{ $ctrl.config.form.$serverError.ERROR_UNKNOWN | translate }}</div></div><div class="bp16"><a ng-hide="$ctrl.config.showServerUrl || $ctrl.config.fixedServerUrl || $ctrl.hideObject.server" ng-click="$ctrl.config.showServerUrl = true" href="">{{::\'ENTRY_CHANGE_SERVER\' | translate}}</a></div><div ng-show="$ctrl.config.showServerUrl && !$ctrl.hideObject.server" class="bp8"><md-autocomplete ng-initial="" autofocus="" tabindex="1" class="pip-combobox w-stretch bm8" name="server" aria-label="URL" ng-enabled="!$ctrl.transaction.busy()" placeholder="{{::\'ENTRY_SERVER_URL\' | translate}}" md-no-cache="true" md-selected-item="$ctrl.config.data.serverUrl" md-search-text="$ctrl.config.selected.searchURLs" md-items="item in $ctrl.config.getMatches($ctrl.config.selected.searchURLs)" md-item-text="item" md-selected-item-change="$ctrl.onServerUrlChanged()" md-search-text-change="$ctrl.onChanged()" md-delay="200" ng-model="$ctrl.config.data.serverUrl" pip-clear-errors=""><span md-highlight-text="$ctrl.config.selected.searchURLs">{{ item }}</span></md-autocomplete></div><md-input-container class="pip-no-hint" style="padding-bottom: 4px!important;"><label ng-if="!$ctrl.config.useEmailAsLogin">{{::\'LOGIN\' | translate}}</label> <label ng-if="$ctrl.config.useEmailAsLogin">{{::\'EMAIL\' | translate}}</label> <input name="login" type="login" ng-model="$ctrl.config.data.login" required="" step="any" aria-label="LOGIN" pip-clear-errors="" ng-disabled="$ctrl.transaction.busy()" tabindex="2"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.login).hint && !$ctrl.hideObject.hint && !$ctrl.config.useEmailAsLogin">{{::\'HINT_LOGIN\' | translate}}</div><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.login).hint && !$ctrl.hideObject.hint && $ctrl.config.useEmailAsLogin">{{::\'HINT_EMAIL\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.login)" class="md-input-error" md-auto-hide="false"><div ng-message="required">{{::\'ERROR_LOGIN_INVALID\' | translate }}</div><div ng-message="ERROR_NO_LOGIN">{{::\'ERROR_NO_LOGIN\' | translate}}</div><div ng-message="ERROR_WRONG_LOGIN">{{::\'ERROR_WRONG_LOGIN\' | translate}}</div><div ng-message="ERROR_LOGIN_NOT_FOUND">{{::\'ERROR_LOGIN_NOT_FOUND\' | translate}}</div></div></md-input-container><md-input-container class="pip-no-hint"><label>{{::\'ENTRY_RESET_CODE\' | translate}}</label> <input name="resetCode" ng-disabled="$ctrl.transaction.busy()" autocomplete="off" aria-label="CODE" ng-model="$ctrl.config.data.resetCode" required="" tabindex="3" pip-clear-errors=""><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.resetCode).hint && !$ctrl.hideObject.hint">{{::\'ENTRY_RESET_CODE\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.resetCode)" class="md-input-error" md-auto-hide="false"><div ng-message="required">{{::\'ERROR_CODE_WRONG\' | translate }}</div><div ng-message="ERROR_WRONG_CODE">{{::\'ERROR_WRONG_CODE\' | translate}}</div></div></md-input-container><md-input-container class="pip-no-hint" style="padding-bottom: 4px!important;"><label>{{::\'NEW_PASSWORD_SET\' | translate}}</label> <input name="passwordNew" ng-disabled="$ctrl.transaction.busy()" pip-clear-errors="" autocomplete="off" type="password" tabindex="4" ng-model="$ctrl.config.data.password" required="" minlength="6" aria-label="password"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.passwordNew).hint && !$ctrl.hideObject.hint">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.passwordNew)" class="md-input-error" md-auto-hide="false"><div ng-message="required">{{::\'MINLENGTH_PASSWORD\' | translate}}</div><div ng-message="minlength">{{::\'MINLENGTH_PASSWORD\' | translate}}</div><div ng-message="ERROR_WRONG_PASSWORD">{{::\'ERROR_WRONG_PASSWORD\' | translate}}</div></div></md-input-container></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('signin/Signin.html',
    '<div class="pip-card-container pip-outer-scroll pip-entry"><pip-card width="400"><pip-signin-panel pipfixedserverurl="$ctrl.fixedServerUrl" class="scroll-y"></pip-signin-panel></pip-card></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('signin/SigninDialog.html',
    '<md-dialog class="pip-entry"><md-dialog-content><pip-signin-panel pip-goto-signup-dialog="$ctrl.pipGotoSignupDialog" pip-goto-recover-password-dialog="$ctrl.pipGotoRecoverPasswordDialog"></pip-signin-panel></md-dialog-content></md-dialog>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('signin/SigninPanel.html',
    '<div class="pip-body"><div class="pip-content"><md-progress-linear ng-show="$ctrl.transaction.busy() && !$ctrl.hideObject.progress" md-mode="indeterminate" class="pip-progress-top"></md-progress-linear><h2 pip-translate="SIGNIN_TITLE" ng-if="!$ctrl.hideObject.title"></h2><form name="form" novalidate=""><input type="password" style="display:none"><div ng-messages="$ctrl.config.form.$serverError" class="text-error bm8 color-error" md-auto-hide="false"><div ng-message="ERROR_act_execute">{{::\'ERROR_ACT_EXECUTE\' | translate}}</div><div ng-message="ERROR_-1">{{::\'ERROR_SERVER\' | translate}}</div><div ng-message="ERROR_ACCOUNT_LOCKED">{{::\'ERROR_ACCOUNT_LOCKED\' | translate}}</div><div ng-message="ERROR_UNKNOWN">{{ $ctrl.config.form.$serverError.ERROR_UNKNOWN | translate }}</div></div><div class="bp16"><a ng-hide="$ctrl.config.showServerUrl || $ctrl.config.fixedServerUrl || $ctrl.hideObject.server" ng-click="$ctrl.config.showServerUrl = true" href="" id="link-server-url" pip-test="link-server-url">{{::\'ENTRY_CHANGE_SERVER\' | translate}}</a></div><div ng-show="$ctrl.config.showServerUrl && !$ctrl.hideObject.server" class="bp8"><md-autocomplete ng-initial="" autofocus="" tabindex="1" class="pip-combobox w-stretch bm8" name="server" placeholder="{{::\'ENTRY_SERVER_URL\' | translate}}" md-no-cache="true" md-selected-item="$ctrl.config.data.serverUrl" md-search-text="$ctrl.config.selected.searchURLs" md-items="item in $ctrl.config.getMatches($ctrl.config.selected.searchURLs)" md-item-text="item" md-selected-item-change="$ctrl.onServerUrlChanged()" md-search-text-change="$ctrl.onChanged()" md-delay="200" ng-model="$ctrl.config.data.serverUrl" ng-disabled="$ctrl.transaction.busy()" pip-clear-errors="" pip-test="autocomplete-server"><span md-highlight-text="$ctrl.config.selected.searchURLs">{{item}}</span></md-autocomplete></div><md-input-container class="display bp4"><label ng-if="!$ctrl.config.useEmailAsLogin">{{::\'LOGIN\' | translate}}</label> <label ng-if="$ctrl.config.useEmailAsLogin">{{::\'EMAIL\' | translate}}</label> <input name="login" ng-model="$ctrl.config.data.login" required="" step="any" ng-keypress="$ctrl.onEnter($event)" aria-label="LOGIN" pip-clear-errors="" ng-disabled="$ctrl.transaction.busy()" tabindex="2" pip-test="input-login"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.login).hint && !$ctrl.hideObject.hint && !$ctrl.config.useEmailAsLogin">{{::\'HINT_LOGIN\' | translate}}</div><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.login).hint && !$ctrl.hideObject.hint && $ctrl.config.useEmailAsLogin">{{::\'HINT_EMAIL\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.login)" md-auto-hide="false"><div ng-message="required">{{::\'ERROR_LOGIN_INVALID\' | translate }}</div><div ng-message="ERROR_WRONG_LOGIN">{{::\'ERROR_WRONG_LOGIN\' | translate}}</div><div ng-message="ERROR_NO_LOGIN">{{::\'ERROR_NO_LOGIN\' | translate}}</div><div ng-message="ERROR_LOGIN_NOT_FOUND">{{::\'ERROR_LOGIN_NOT_FOUND\' | translate}}</div></div></md-input-container><md-input-container class="display bp4"><label>{{::\'PASSWORD\' | translate}}</label> <input name="password" ng-disabled="$ctrl.transaction.busy()" pip-clear-errors="" type="password" tabindex="3" ng-model="$ctrl.config.data.password" ng-keypress="$ctrl.onEnter($event)" required="" minlength="6" pip-test="input-password"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.password).hint && !$ctrl.hideObject.hint">{{::\'SIGNIN_HINT_PASSWORD\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.password)" md-auto-hide="false"><div ng-message="required">{{::\'SIGNIN_HINT_PASSWORD\' | translate}}</div><div ng-message="ERROR_WRONG_PASSWORD">{{::\'ERROR_WRONG_PASSWORD\' | translate}}</div><div ng-message="minlength">{{::\'HINT_PASSWORD\' | translate}}</div></div></md-input-container><a href="" class="display bm16" ng-if="!$ctrl.hideObject.forgotPassword" ng-click="$ctrl.gotoRecoverPassword()" tabindex="4">{{::\'SIGNIN_FORGOT_PASSWORD\' | translate}}</a><md-checkbox ng-disabled="$ctrl.transaction.busy()" ng-if="!$ctrl.hideObject.forgotPassword" md-no-ink="" class="lm0" aria-label="{{\'SIGNIN_REMEMBER\' | translate}}" tabindex="5" ng-model="$ctrl.config.data.remember" pip-test-checkbox="remember"><label class="label-check">{{::\'SIGNIN_REMEMBER\' | translate}}</label></md-checkbox><div style="height: 36px; overflow: hidden;"><md-button ng-if="!$ctrl.transaction.busy()" ng-click="$ctrl.onSignin()" aria-label="SIGNIN" class="md-raised md-accent w-stretch m0" tabindex="6" type="submit" xxng-disabled="($ctrl.config.data.login == undefined) || $ctrl.config.data.login.length == 0 || $ctrl.config.data.serverUrl == \'\' || $ctrl.config.data.serverUrl == undefined || $ctrl.config.data.serverUrl.length == 0 || ($ctrl.config.data.password == undefined)" pip-test="button-signin">{{::\'SIGNIN_TITLE\' | translate}}</md-button><md-button ng-if="$ctrl.transaction.busy()" ng-click="$ctrl.transaction.abort()" class="md-raised md-warn m0 w-stretch" tabindex="5" aria-label="ABORT" pip-test="button-cancel">{{::\'CANCEL\' | translate}}</md-button></div><div class="tm24 layout-row" ng-if="!$ctrl.config.adminOnly && $ctrl.pipMedia(\'gt-xs\') && !$ctrl.hideObject.signup"><p class="m0 text-small">{{::\'SIGNIN_NOT_MEMBER\' | translate}} <a href="" ng-click="$ctrl.gotoSignup()" tabindex="6">{{::\'SIGNIN_SIGNUP_HERE\' | translate}}</a></p></div><div class="tm24 divider-top text-signup" ng-if="!$ctrl.config.adminOnly && $ctrl.pipMedia(\'xs\') && !$ctrl.hideObject.signup"><div class="h48 layout-row layout-align-center-end"><p class="m0 text-small">{{::\'SIGNIN_NOT_MEMBER\' | translate}}</p></div><div class="h48 layout-row layout-align-center-start"><a class="text-small" ng-click="$ctrl.gotoSignup()" href="" tabindex="6">{{::\'SIGNIN_SIGNUP_HERE\' | translate}}</a></div></div></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('signup/Signup.html',
    '<div class="pip-card-container pip-outer-scroll pip-entry"><pip-card width="400"><pip-signup-panel class="scroll-y"></pip-signup-panel></pip-card></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('signup/SignupDialog.html',
    '<md-dialog class="pip-entry"><md-dialog-content><pip-signup-panel pip-goto-signin-dialog="$ctrl.pipGotoSigninDialog" pip-post-signup="$ctrl.pipPostSignup"></pip-signup-panel></md-dialog-content></md-dialog>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('signup/SignupPanel.html',
    '<div class="pip-body"><div class="pip-content"><md-progress-linear ng-show="$ctrl.transaction.busy() && !$ctrl.hideObject.progress" md-mode="indeterminate" class="pip-progress-top"></md-progress-linear><h2 pip-translate="SIGNUP_TITLE" ng-if="!$ctrl.hideObject.title"></h2><form name="form" novalidate="" autocomplete="off"><input type="email" style="display:none"> <input type="login" style="display:none"> <input type="password" style="display:none"><div ng-messages="$ctrl.config.form.$serverError" class="text-error bm8 color-error" md-auto-hide="false"><div ng-message="ERROR_act_execute">{{::\'ERROR_ACT_EXECUTE\' | translate}}</div><div ng-message="ERROR_-1">{{::\'ERROR_SERVER\' | translate}}</div><div ng-message="ERROR_UNKNOWN">{{ $ctrl.config.form.$serverError.ERROR_UNKNOWN | translate }}</div></div><div ng-if="$ctrl.error" class="text-error bm8 color-error" md-auto-hide="false">{{::\'ERROR_SERVER\' | translate}}</div><div class="bp16"><a ng-hide="$ctrl.config.showServerUrl || $ctrl.config.fixedServerUrl || $ctrl.hideObject.server" ng-click="$ctrl.config.showServerUrl = true" href="">{{::\'ENTRY_CHANGE_SERVER\' | translate}}</a></div><div ng-show="$ctrl.config.showServerUrl && !$ctrl.hideObject.server" class="bp8"><md-autocomplete ng-initial="" autofocus="" tabindex="1" class="pip-combobox w-stretch bm8" name="server" ng-enabled="!$ctrl.transaction.busy()" placeholder="{{::\'ENTRY_SERVER_URL\' | translate}}" md-no-cache="true" md-selected-item="$ctrl.config.data.serverUrl" md-search-text="$ctrl.config.selected.searchURLs" md-items="item in $ctrl.config.getMatches($ctrl.config.selected.searchURLs)" md-item-text="item" md-selected-item-change="$ctrl.onServerUrlChanged()" md-search-text-change="$ctrl.onChanged()" md-delay="200" ng-model="$ctrl.config.data.serverUrl" ng-disabled="$ctrl.transaction.busy()" pip-clear-errors=""><span md-highlight-text="$ctrl.config.selected.searchURLs">{{item}}</span></md-autocomplete></div><md-input-container class="display bp4"><label>{{::\'FULLNAME\' | translate}}</label> <input name="signupFullName" ng-disabled="$ctrl.transaction.busy()" autocomplete="off" ng-model="$ctrl.config.data.name" ng-init="$ctrl.config.data.name = \'\'" required="" tabindex="2" pip-clear-errors="" ng-keypress="$ctrl.onEnter($event)"><div class="hint text-overflow w-stretch" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.signupFullName).hint && !$ctrl.hideObject.hint">{{ ::\'HINT_FULLNAME\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.signupFullName)" md-auto-hide="false"><div ng-message="required">{{ ::\'HINT_FULLNAME\' | translate}} {{::\'ERROR_FULLNAME_INVALID\' | translate }}</div><div ng-message="ERROR_NO_NAME">{{ ::\'ERROR_NO_NAME\' | translate }}</div></div></md-input-container><div ng-if="!$ctrl.config.useEmailAsLogin"><md-input-container class="display bp4"><label>{{ ::\'LOGIN\' | translate}}</label> <input name="signupLogin" ng-disabled="$ctrl.transaction.busy()" autocomplete="off" ng-model="$ctrl.config.data.login" ng-init="$ctrl.config.data.login = \'\'" required="" tabindex="2" pip-clear-errors="" ng-keypress="$ctrl.onEnter($event)"><div class="hint text-overflow w-stretch" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.signupLogin).hint && !$ctrl.hideObject.hint">{{::\'HINT_LOGIN\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.signupLogin)" md-auto-hide="false"><div ng-message="required">{{::\'HINT_LOGIN\' | translate}} {{::\'ERROR_LOGIN_INVALID\' | translate }}</div><div ng-message="ERROR_WRONG_LOGIN">{{::\'ERROR_WRONG_LOGIN\' | translate}}</div><div ng-message="ERROR_NO_LOGIN">{{::\'ERROR_NO_LOGIN\' | translate}}</div></div></md-input-container><md-input-container class="display bp4"><label>{{::\'EMAIL\' | translate}}</label> <input name="userEmail" ng-disabled="$ctrl.transaction.busy()" pip-clear-errors="" type="email" tabindex="3" ng-model="$ctrl.config.data.email" xxxxpip-email-unique="$ctrl.config.data.email" ng-change="$ctrl.onChangeEmail(\'userEmail\')" ng-model-options="{ delay: 500 }" required="" ng-keypress="$ctrl.onEnter($event)" xxxpip-test="input-password"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.userEmail, true).hint && !$ctrl.hideObject.hint">{{::\'HINT_EMAIL\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.userEmail, true)" md-auto-hide="false"><div ng-message="emailUnique">{{::\'ERROR_ALREADY_EXIST\' | translate}}</div><div ng-message="required">{{::\'ERROR_EMAIL_INVALID\' | translate }}</div><div ng-message="email">{{::\'ERROR_EMAIL_INVALID\' | translate }}</div><div ng-message="ERROR_NO_EMAIL">{{::\'ERROR_NO_EMAIL\' | translate}}</div></div></md-input-container></div><div ng-if="$ctrl.config.useEmailAsLogin"><md-input-container class="display bp4" xxxmd-is-error="$ctrl.isError($ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.userEmail1))"><label>{{::\'EMAIL\' | translate}}</label> <input name="userEmail1" ng-disabled="$ctrl.transaction.busy()" pip-clear-errors="" type="email" tabindex="3" ng-model="$ctrl.config.data.email" ng-change="$ctrl.onChangeEmail(\'userEmail1\')" ng-model-options="{ delay: 500 }" required="" ng-keypress="$ctrl.onEnter($event)" pip-test="input-password"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.userEmail1, true).hint && !$ctrl.hideObject.hint">{{::\'HINT_EMAIL\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.userEmail1, true)" md-auto-hide="false"><div ng-message="required">{{::\'ERROR_EMAIL_INVALID\' | translate }}</div><div ng-message="email">{{::\'ERROR_EMAIL_INVALID\' | translate }}</div><div ng-message="emailUnique">{{::\'ERROR_ALREADY_EXIST_EMAIL\' | translate}}</div><div ng-message="ERROR_WRONG_LOGIN">{{::\'ERROR_WRONG_LOGIN_EMAIL\' | translate}}</div><div ng-message="ERROR_NO_LOGIN">{{::\'ERROR_NO_LOGIN_EMAIL\' | translate}}</div></div></md-input-container></div><md-input-container class="display bp4"><label>{{::\'PASSWORD_SET\' | translate}}</label> <input name="password" ng-disabled="$ctrl.transaction.busy()" autocomplete="off" pip-clear-errors="" type="password" tabindex="4" ng-model="$ctrl.config.data.password" required="" minlength="6" ng-keypress="$ctrl.onEnter($event)" pip-test="input-password"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.password).hint && !$ctrl.hideObject.hint">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.password)" md-auto-hide="false"><div ng-message="required">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-message="minlength">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-message="ERROR_WRONG_PASSWORD" xxxng-if="!$ctrl.config.form.password.$pristine">{{::\'ERROR_WRONG_PASSWORD\' | translate}}</div></div></md-input-container><md-input-container class="display bp4" ng-if="!$ctrl.hideObject.passwordConfirm"><label>{{::\'PASSWORD_CONFIRM\' | translate}}</label> <input name="passwordConfirm" type="password" tabindex="4" required="" minlength="6" ng-model="$ctrl.confirmPassword" ng-disabled="$ctrl.transaction.busy()" pip-clear-errors="" pip-compare-password-match="" compare-to2="$ctrl.config.data.password" ng-keypress="$ctrl.onEnter($event)" pip-test="input-password"><div class="hint" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.passwordConfirm, true).hint && !$ctrl.hideObject.hint">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.passwordConfirm, true)" md-auto-hide="false"><div ng-message="ERROR_compareTo">{{::\'PASSWORD_MATCH\' | translate}}</div><div ng-message="required">{{::\'HINT_PASSWORD\' | translate}}</div><div ng-message="minlength">{{::\'HINT_PASSWORD\' | translate}}</div></div></md-input-container><p class="text-small-secondary" ng-if="!$ctrl.hideObject.agreement">{{::\'SIGNUP_TEXT_11\' | translate}} <a href="#/legal/privacy" target="_blank">{{::\'SIGNUP_PRIVACY\' | translate}}</a> {{::\'SIGNUP_TEXT_12\' | translate}} <a href="#/legal/services" target="_blank">{{::\'SIGNUP_SERVICES\' | translate}}</a></p><md-button ng-hide="$ctrl.transaction.busy()" class="md-raised m0 md-accent w-stretch" ng-click="$ctrl.onSignup()" aria-label="SIGNUP" type="submit" xxng-disabled="$ctrl.config.form.$invalid || ($ctrl.config.form.$pristine && !$ctrl.config.data.email) || $ctrl.config.data.serverUrl.length == 0 || $ctrl.config.data.email.length == 0 || ($ctrl.config.data.login.length == 0 && !$ctrl.config.useEmailAsLogin) || (!$ctrl.config.data.password) || (!$ctrl.config.data.name) || $ctrl.config.data.name.length == 0 || $ctrl.config.data.password.length == 0">{{::\'SIGNUP_TITLE\' | translate}}</md-button><md-button ng-show="$ctrl.transaction.busy()" ng-click="$ctrl.transaction.abort()" class="md-raised md-warn m0 w-stretch" aria-label="ABORT">{{::\'CANCEL\' | translate}}</md-button><div class="tm24 layout-row" ng-if="$ctrl.pipMedia(\'gt-xs\') && !$ctrl.hideObject.signin"><p class="text-small m0">{{::\'SIGNUP_TEXT_2\' | translate}} <a href="" ng-click="$ctrl.gotoSignin()">{{::\'SIGNUP_SIGNIN_HERE\' | translate}}</a></p></div><div class="tm24 divider-top" ng-if="$ctrl.pipMedia(\'xs\') && !$ctrl.hideObject.signin" style="margin-right: -16px; margin-left: -16px; background-color: rgb(238, 238, 238);"><div class="h48 layout-row layout-align-center-end"><p class="bm0 text-small">{{::\'SIGNUP_TEXT_2\' | translate}}</p></div><div class="h48 layout-row layout-align-center-start"><p class="bm0 text-small"><a href="" ng-click="$ctrl.gotoSignin()">{{::\'SIGNUP_SIGNIN_HERE\' | translate}}</a></p></div></div></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('verify_email/VerifyEmail.html',
    '<div class="pip-card-container pip-outer-scroll pip-entry"><pip-card width="400"><div class="pip-body"><div class="pip-content layout-column flex" style="position: absolute; top: 0px; right: 0px; left: 0px; bottom: 0px; background-color: #fafafa; z-index: 100;" ng-if="$ctrl.showValidateProgress"><h2 class="p24-flex m0">{{\'VERIFY_EMAIL_WAIT\' | translate}}</h2><div class="layout-column flex layout-align-center-center"><md-progress-circular md-diameter="96"></md-progress-circular></div></div><div class="pip-content"><md-progress-linear ng-show="$ctrl.transaction.busy()" md-mode="indeterminate" class="pip-progress-top"></md-progress-linear><h2>{{\'VERIFY_EMAIL_TITLE\' | translate}}</h2><p class="title-padding">{{\'VERIFY_EMAIL_TEXT_1\' | translate}}</p><form name="form" novalidate="" ng-init="$ctrl.formCreated(form)" autocomplete="off"><div ng-messages="$ctrl.config.form.$serverError" class="text-error color-error bm8"><div ng-message="ERROR_act_execute">{{::\'ERROR_ACT_EXECUTE\' | translate}}</div><div ng-message="ERROR_-1">{{::\'ERROR_SERVER\' | translate}}</div><div ng-message="ERROR_UNKNOWN">{{ $ctrl.config.form.$serverError.ERROR_UNKNOWN | translate }}</div></div><div ng-show="$ctrl.config.showServerUrl && !$ctrl.hideObject.server" class="tp8 bp8">{{::\'ENTRY_SERVER_URL\' | translate}}: {{ $ctrl.config.data.serverUrl }}</div><div class="tp8 bp8"><span ng-if="!$ctrl.config.useEmailAsLogin">{{::\'LOGIN\' | translate}}</span> <span ng-if="$ctrl.config.useEmailAsLogin">{{::\'EMAIL\' | translate}}</span> : {{ $ctrl.config.data.login }}</div><md-input-container class="pip-no-hint"><label>{{::\'ENTRY_VERIFICATION_CODE\' | translate}}</label> <input name="code" ng-disabled="$ctrl.transaction.busy()" pip-clear-errors="" ng-model="$ctrl.config.data.code" required="" tabindex="3"><div class="hint text-overflow w-stretch" ng-if="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.code).hint && !$ctrl.hideObject.hint">{{::\'ENTRY_VERIFICATION_CODE\' | translate}}</div><div ng-messages="$ctrl.touchedErrorsWithHint($ctrl.config.form, $ctrl.config.form.code)" ng-if="!$ctrl.config.form.$pristine" class="md-input-error"><div ng-message="required">{{::\'ERROR_CODE_INVALID\' | translate }}</div><div ng-message="ERROR_INVALID_CODE">{{::\'ERROR_INVALID_CODE\' | translate }}</div></div></md-input-container><p>{{\'VERIFY_EMAIL_TEXT_21\' | translate}} <a ng-click="$ctrl.onRecover()" class="pointer" href="">{{\'VERIFY_EMAIL_RESEND\' | translate}}</a> {{\'VERIFY_EMAIL_TEXT_22\' | translate}}</p></form></div></div><div class="pip-footer"><md-button ng-click="$ctrl.goBack()" ng-hide="$ctrl.transaction.busy()" class="rm8" aria-label="CANCEL">{{::\'CANCEL\' | translate}}</md-button><md-button class="md-accent" ng-click="$ctrl.onVerify()" ng-hide="$ctrl.transaction.busy()" aria-label="VERIFY" ng-if="!$ctrl.showValidateProgress" type="submit" ng-disabled="$ctrl.config.data.code.length == 0 || $ctrl.config.data.login.length == 0 || (!$ctrl.config.data.login && $ctrl.config.form.$pristine) || (!$ctrl.config.data.code)">{{::\'VERIFY\' | translate}}</md-button><md-button class="md-warn" ng-show="$ctrl.transaction.busy()" ng-click="$ctrl.transaction.abort()" aria-label="ABORT">{{::\'CANCEL\' | translate}}</md-button></div></pip-card></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipEntry.Templates');
} catch (e) {
  module = angular.module('pipEntry.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('verify_email/VerifyEmailSuccess.html',
    '<div class="pip-card-container pip-outer-scroll pip-entry"><pip-card width="400"><div class="pip-footer"><md-button ng-click="$ctrl.onContinue()" class="md-accent">{{\'CONTINUE\' | translate}}</md-button></div><div class="pip-body"><div class="pip-content"><h2>{{\'VERIFY_EMAIL_TITLE\' | translate}}</h2><p class="title-padding">{{\'VERIFY_EMAIL_SUCCESS_TEXT\' | translate}}</p></div></div></pip-card></div>');
}]);
})();



},{}]},{},[67,1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,15,17,18,19,20,21,27,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,52,50,51,53,54,55,56,57,58,59,60,61,62,63,64,65,66])(67)
});

//# sourceMappingURL=pip-suite-entry.js.map
