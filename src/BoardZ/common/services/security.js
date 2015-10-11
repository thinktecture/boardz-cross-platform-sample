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
        var tokenStorageKey = 'boardgame.token';
        var userStorageKey = 'boardgame.user';
        var loginPromise;
        var token;
        var user;

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
                        user = username;

                        if (rememberMe) {
                            saveUserData(token, username);
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
            return !!token && !!user;
        };

        this.getToken = function () {
            return token;
        };

        this.getUser = function () {
            return user;
        };

        this.logout = function () {
            token = undefined;
            user = undefined;
            saveUserData('', '');
        };

        function saveUserData(obtainedToken, obtainedUser) {
            localStorage.setItem(tokenStorageKey, obtainedToken);
            localStorage.setItem(userStorageKey, obtainedUser);
        }

        function initialize() {
            var cachedToken = localStorage.getItem(tokenStorageKey);
            var cachedUser = localStorage.getItem(userStorageKey);

            if (cachedToken && cachedToken !== null) {
                token = cachedToken;
            }

            if (cachedUser && cachedUser !== null) {
                user = cachedUser;
            }
        }

        initialize();
    }

    app.module.service('security', Security);
}();
