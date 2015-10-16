!function ($, jQuery, window, document) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     *
     * @param $http
     * @param {string} apiBaseUrl
     */
    function BoardGamesApi($http, apiBaseUrl) {
        var baseUrl = apiBaseUrl + 'api/BoardGames/';

        /**
         * @returns {Promise}
         */
        this.list = function () {
            return $http.get(baseUrl + 'List')
                .then(unwrapData);
        };

        /**
         * @param {string} id
         * @returns {Promise}
         */
        this.single = function (id) {
            return $http.get(baseUrl + 'Single', {
                params: {
                    id: id
                }
            })
                .then(unwrapData);
        };

        /**
         * @param {*} boardGame
         * @returns {Promise}
         */
        this.add = function (boardGame) {
            return $http.post(baseUrl + 'Add', boardGame)
                .then(unwrapData);
        };

        /**
         * @param {*} boardGame
         * @returns {Promise}
         */
        this.update = function (boardGame) {
            return $http.put(baseUrl + 'Update', boardGame)
                .then(unwrapData);
        };

        /**
         * @param {string} id
         * @returns {Promise}
         */
        this.remove = function (id) {
            return $http.delete(baseUrl + 'Remove', {
                params: {
                    id: id
                }
            })
                .then(unwrapData);
        };

        function unwrapData(result) {
            return result.data;
        }
    }

    app.module.service('boardGamesApi', BoardGamesApi);
}();
