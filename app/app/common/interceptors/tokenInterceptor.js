!function ($, jQuery, window, document) {
    "use strict";

    /**
     * @constructor
     */
    function TokenInterceptor() {
        return {
            request: function (config) {
                config.headers['Authorization'] = 'Bearer ';

                return config;
            }
        };
    }

    app.module.factory('tokenInterceptor', TokenInterceptor);
}();
