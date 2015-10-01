!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @constructor
     * @public
     *
     * @param $scope
     * @param $state
     * @param {Security} security
     */
    function LoginController($scope, $state, security) {
        $scope.model = {};

        $scope.login = function () {
            if (!$scope.model.username || !$scope.model.password) {
                return;
            }

            $scope.error = false;
            security.login($scope.model.username, $scope.model.password, $scope.model.rememberMe)
                .then(function () {
                    if (security.isLoggedIn()) {
                        return $state.go('dashboard');
                    }

                    $scope.error = true;
                }, function () {
                    $scope.error = true;
                });
        };
    }

    app.module.controller('loginController', LoginController);
}();
