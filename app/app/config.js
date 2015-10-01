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
}();
