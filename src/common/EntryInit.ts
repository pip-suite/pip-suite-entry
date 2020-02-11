import { IEntryService } from "../common/EntryService";
import { AuthSessionData } from '../common/EntryPageConfig';

function initEntry(pipEntry: IEntryService, $rootScope: ng.IRootScopeService, pipSession: pip.services.ISessionService,
    pipDataCache: pip.rest.IDataCacheService, pipTimer: pip.services.ITimerService): void {

    // Reload session to avoid signin
    $rootScope.$on(pip.services.SessionOpenedEvent, (event: ng.IAngularEvent, data: AuthSessionData) => {
        pipDataCache.clear();
        pipTimer.start();
    });

    $rootScope.$on(pip.services.SessionClosedEvent, (event: ng.IAngularEvent, data: AuthSessionData) => {
        pipDataCache.clear();
    });

    // Reload session to avoid signin
    // todo may be start optionaly
    pipEntry.reopenSession();
}

angular.module('pipEntry.Service')
    .run(initEntry);