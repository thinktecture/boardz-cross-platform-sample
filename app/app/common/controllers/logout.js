!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @constructor
     * @public
     *
     * @param $state
     * @param {Security} security
     */
    function LogoutController($state, security) {
        this.isLogoutButtonVisible = security.isLoggedIn;

        this.logout = function () {
            security.logout();
            $state.go('login');
        };
    }

    app.module.controller('logoutController', LogoutController);
}();
