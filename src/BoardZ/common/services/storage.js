!function ($, jQuery, window, document) {
    "use strict";

    /**
     * @ngdoc service
     * @public
     *
     * @param $window
     */
    function Storage($window) {
        this.setItem = function (key, value) {
            $window.localStorage.setItem(key, JSON.stringify({value: value}));
        };

        this.getItem = function (key) {
            var item = $window.localStorage.getItem(key);

            return !item ? item : JSON.parse(item).value;
        };

        this.hasItem = function (key) {
            return $window.localStorage.hasOwnProperty(key);
        };
    }

    app.module.service('storage', Storage);
}();
