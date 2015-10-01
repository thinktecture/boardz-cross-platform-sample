!function($, jQuery, window, document) {
	'use strict';
    
	app.module.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('dashboard', getState('dashboard', '/'))
			.state('gameList', getState('gameList', '/games'))
			.state('gameDetail', getState('gameDetail', '/games/:gameId'));
		
		$urlRouterProvider.otherwise('/');
	});
	
	function getState(name, url) {
		return {
			url: url || '/' + name,
			views: {
				'main@': {
					templateUrl: 'app/' + name + '/' + name + '.html',
					controller: name + 'Controller'
				}
			}
		};
	}	
}();
