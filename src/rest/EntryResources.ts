function configEntryResources(pipRestProvider: pip.rest.IRestProvider) {
    // resource, url, path, defaultParams, actions
    pipRestProvider.registerOperation('signin', '/api/v1/signin');
    pipRestProvider.registerOperation('signout', '/api/v1/signout');
    pipRestProvider.registerOperation('signup', '/api/v1/signup');
    pipRestProvider.registerOperation('recoverPassword', '/api/v1/passwords/recover');
    pipRestProvider.registerOperation('resetPassword', '/api/v1/passwords/reset');
    pipRestProvider.registerCollection('changePassword', '/api/v1/passwords/:user_id/change',
     { user_id: '@user_id' });

    pipRestProvider.registerOperation('requestEmailVerification', '/api/v1/email_settings/resend');
    pipRestProvider.registerOperation('verifyEmail', '/api/v1/email_settings/verify');
    pipRestProvider.registerOperation('email_settings', '/api/v1/email_settings/:user_id', 
        { user_id: '@user_id' },
        {
            get: { method: 'GET', isArray: false }
        }
    ); 
    pipRestProvider.registerOperation('signupValidate', '/api/v1/signup/validate', {},
        {
            get: { method: 'GET', isArray: false }
        }
    ); 
}

angular
    .module('pipEntry.Rest')
    .config(configEntryResources);


