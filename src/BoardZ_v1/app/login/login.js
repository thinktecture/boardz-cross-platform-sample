!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @constructor
     * @public
     *
     * @param $scope
     * @param $state
     * @param $stateParams
     * @param {Security} security
     */
    function LoginController($scope, $state, $stateParams, security) {
        $scope.model = {};

        $scope.login = function () {
            if (!$scope.model.username || !$scope.model.password) {
                return;
            }

            $scope.error = false;
            security.login($scope.model.username, $scope.model.password, $scope.model.rememberMe)
                .then(function () {
                    if (security.isLoggedIn()) {
                        return $state.go($stateParams.redirectTo || 'dashboard');
                    }

                    $scope.error = true;
                }, function () {
                    $scope.error = true;
                });
        };
    }

    app.module.controller('loginController', LoginController);
}();
