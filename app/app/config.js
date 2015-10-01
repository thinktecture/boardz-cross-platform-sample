!function ($, jQuery, window, document) {
    'use strict';

    app.module.config(
        /**
         * @param $translateProvider
         */
        function ($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                prefix: 'app/translations/',
                suffix: '.json'
            });

            $translateProvider.preferredLanguage('de-DE');
            $translateProvider.useSanitizeValueStrategy('sanitize');
        });

    app.module.run(
        /**
         * @param $rootScope
         * @param $state
         * @param ngNotify
         * @param {Security} security
         */
        function ($rootScope, $state, ngNotify, security) {
            $rootScope.$on('needsAuthentication', function (event, currentState) {
                $state.go('login', {
                    redirectTo: currentState
                });
            });

            $rootScope.$on('$stateChangeStart', function (event, toState) {
                if (toState.name === 'login') {
                    return;
                }

                if (!security.isLoggedIn()) {
                    event.preventDefault();
                    $rootScope.$emit('needsAuthentication', toState.name);
                }
            });

            ngNotify.config({
                theme: 'pure',
                position: 'top',
                duration: 3000,
                type: 'info',
                sticky: false,
                html: true
            });
        });

    app.module.config(
        /**
         * @param $httpProvider
         * @param cfpLoadingBarProvider
         */
        function ($httpProvider, cfpLoadingBarProvider) {
            $httpProvider.interceptors.push('tokenInterceptor');

            cfpLoadingBarProvider.includeSpinner = false;
        });
}();
