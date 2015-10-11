!function ($, jQuery, window, document) {
	'use strict';
	
	/**
	 * @public
	 * @constructor
	 * 
	 * @param $scope
	 * @param {PlayersApi} playersApi
	 * @param {BoardGamesApi} boardGamesApi
	 */
	function DashboardController($scope, playersApi, boardGamesApi) {
        $scope.playerCount = $scope.gameCount = '?';

		init();

		function init() {
			playersApi.list()
				.then(function (results) {
					$scope.playerCount = results.length;
				});

			boardGamesApi.list()
				.then(function (results) {
					$scope.gameCount = results.length;
				});
		}
	}
	
	app.module.controller('dashboardController', DashboardController);
}();