!function ($, jQuery, window, document) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     *
     * @param $http
     * @param {string} apiBaseUrl
     */
    function PlayersApi($http, apiBaseUrl) {
        var baseUrl = apiBaseUrl + 'api/Players/';

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
         * @param {number} radius
         * @param {*} coordinate
         * @returns {Promise}
         */
        this.findNearby = function (radius, coordinate) {
            return $http.get(baseUrl + 'FindNearby', {
                params: {
                    radius: radius,
                    "coordinate.latitude": coordinate.latitude,
                    "coordinate.longitude": coordinate.longitude
                }
            })
                .then(unwrapData);
        };

        /**
         * @param {*} player
         * @returns {Promise}
         */
        this.add = function (player) {
            return $http.post(baseUrl + 'Add', player)
                .then(unwrapData);
        };

        /**
         * @param {*} player
         * @returns {Promise}
         */
        this.update = function (player) {
            return $http.put(baseUrl + 'Update', player)
                .then(unwrapData);
        };

        /**
         * @param {string} id
         * @returns {Promise}
         */
        this.remove = function (id) {
            return $http.delete(baseUrl + 'Delete', {
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

    app.module.service('playersApi', PlayersApi);
}();
