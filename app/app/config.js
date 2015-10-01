!function ($, jQuery, window, document) {
    'use strict';

    app.module.config(
        /**
         *
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
         *
         * @param $rootScope
         * @param $state
         * @param {Security} security
         */
        function ($rootScope, $state, security) {
            $rootScope.$on('$stateChangeStart', function (event, toState) {
                if (security.isLoggedIn()) {
                    return;
                }

                if (toState.data && toState.data.needsAuthentication) {
                    event.preventDefault();
                    $state.go('login');
                }
            });
        });
}();
