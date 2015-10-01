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
         */
        function ($rootScope, $state, ngNotify) {
            $rootScope.$on('needsAuthentication', function (event, currentState) {
                $state.go('login', {
                    redirectTo: currentState
                });
            });

            ngNotify.config({
                theme: 'pure',
                position: 'top',
                duration: 3000,
                type: 'info',
                sticky: false,
                html: false
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
