!function ($, jQuery, window, document) {
    "use strict";

    /**
     * @constructor
     * @param $rootScope
     * @param $q
     * @param $injector
     */
    function TokenInterceptor($rootScope, $q, $injector) {
        function getSecurityService() {
            return $injector.get('security');
        }

        function getState() {
            return $injector.get('$state');
        }

        return {
            request: function (config) {
                var security = getSecurityService();
                config.headers['Authorization'] = 'Bearer ' + security.getToken();

                return config;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    var security = getSecurityService();
                    var state = getState();
                    security.logout();
                    $rootScope.$emit('needsAuthentication', state.current.name);
                    return $q.reject(response);
                }

                return $q.reject(response);
            }
        };
    }

    app.module.factory('tokenInterceptor', TokenInterceptor);
}();
