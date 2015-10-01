!function ($, jQuery, window, document) {
	'use strict';
	
	/**
	 * @public
	 * @constructor
	 * 
	 * @param $scope
	 * @param $stateParams
	 * @param {BoardGamesApi} boardGamesApi
	 */
	function GameDetailController($scope, $stateParams, boardGamesApi) {
		init();

		function init() {
			boardGamesApi.single($stateParams.gameId)
				.then(function (result) {
					$scope.game = result;
				}, function (err) {
					// TODO: Error case
				});
		}
	}
	
	app.module.controller('gameDetailController', GameDetailController);
}();