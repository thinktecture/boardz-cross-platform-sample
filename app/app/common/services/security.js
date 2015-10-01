!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @ngdoc service
     * @public
     *
     * @param $http
     * @param apiBaseUrl
     */
    function Security($http, apiBaseUrl) {
        var localStorageKey = 'boardgame.token';
        var loginPromise;
        var token;

        this.login = function (username, password, rememberMe) {
            if (loginPromise) {
                return loginPromise;
            }

            loginPromise = $http.post(apiBaseUrl + 'token', {
                'grant_type': 'password',
                username: username,
                password: password
            }, {
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
                .then(function (response) {
                    // We assume we get a valid bearer token
                    if (response.data && response.data.access_token) {
                        token = response.data.access_token;

                        if (rememberMe) {
                            saveToken(token);
                        }

                        return token;
                    }

                    throw new Error('Token could not be obtained.');
                })
                .finally(function () {
                    loginPromise = undefined;
                });

            return loginPromise;
        };

        this.isLoggedIn = function () {
            return !!token;
        };

        this.getToken = function () {
            return token;
        };

        this.logout = function () {
            token = '';
            saveToken('');
        };

        function saveToken(obtainedToken) {
            localStorage.setItem(localStorageKey, obtainedToken);
        }

        function initialize() {
            var cachedToken = localStorage.getItem(localStorageKey);

            if (cachedToken && cachedToken !== null) {
                token = cachedToken;
            }
        }

        initialize();
    }

    app.module.service('security', Security);
}();
