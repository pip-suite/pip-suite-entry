function configSessionResources(pipRestProvider: pip.rest.IRestProvider) {
    pipRestProvider.registerPagedCollection('sessions', '/api/v1/sessions');
    pipRestProvider.registerOperation('restoreSessions', '/api/v1/sessions/restore');
    pipRestProvider.registerPagedCollection('userSessions', '/api/v1//sessions/:user_id');
}

angular
    .module('pipEntry.Rest')
    .config(configSessionResources);

