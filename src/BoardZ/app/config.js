!function ($, jQuery, window) {
    'use strict';

    app.module.config(
        /**
         * @param $translateProvider
         */
        function ($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                prefix: 'assets/translations/',
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
         * @param {NativeMenu} nativeMenu
         * @param {PlatformInformation} platformInformation
         * @param {Security} security
         */
        function ($rootScope, $state, ngNotify, security, nativeMenu, platformInformation) {
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

            nativeMenu.init();

            document.addEventListener('keyup', function(e) {
                if(platformInformation.isNwjs()) {
                    if (e.ctrlKey && e.shiftKey && e.keyCode == 68) {
                        e.preventDefault();

                        require('nw.gui').Window.get().showDevTools();
                    }
                }
            }, false);
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
