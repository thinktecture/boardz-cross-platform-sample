!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @constructor
     * @public
     *
     * @param $translate
     */
    function LanguageController($translate) {
        this.switchTo = function(languageKey) {
            $translate.use(languageKey);
        };
    }

    app.module.controller('languageController', LanguageController);
}();
