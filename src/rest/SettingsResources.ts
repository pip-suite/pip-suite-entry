function configSettingsResources(pipRestProvider: pip.rest.IRestProvider) {
    // resource, url, path, defaultParams, actions
    pipRestProvider.registerPagedCollection('settings', '/api/v1/settings/:section/:key',
        { section: '@section' },
        {
            update: { method: 'PUT' }
        }
    );
}

angular
    .module('pipEntry.Rest')
    .config(configSettingsResources);