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
         */
        function ($rootScope, $state) {
            $rootScope.$on('needsAuthentication', function (event, currentState) {
                $state.go('login', {
                    redirectTo: currentState
                });
            });
        });

    app.module.config(
        /**
         * @param $httpProvider
         */
        function ($httpProvider) {
            $httpProvider.interceptors.push('tokenInterceptor');
        });
}();
