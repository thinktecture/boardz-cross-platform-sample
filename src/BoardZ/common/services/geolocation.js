!function ($, jQuery, window, document) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     *
     * @param $q
     * @param $window
     */
    function Geolocation($q, $window) {
        this.getCoordinatesFromSensor = function () {
            var deferred = $q.defer();

            if ($window.navigator && $window.navigator.geolocation) {
                $window.navigator.geolocation.getCurrentPosition(function (position) {
                    deferred.resolve(position.coords);
                }, function (err) {
                    deferred.reject(err);
                })
            } else {
                deferred.reject('This platform does not support geolocation.');
            }

            return deferred.promise;
        };
    }

    app.module.service('geolocation', Geolocation);
}();
