!function($, jQuery, window, document) {
	'use strict';
    
	app.module.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('dashboard', getState('dashboard', '/'))
			.state('games', getState('gameList', '/games'))
			.state('games.detail', getState('gameDetail', '/:gameId'))
			.state('games.detail.packshot', getState('gamePackshot', '/packshot'))
			.state('radiusSearch', getState('radiusSearch'))
			.state('login', {
				url: '/login?redirectTo',
				views: {
					'main@': {
						templateUrl: 'app/login/login.html',
						controller: 'loginController'
					}
				}
			});
		
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
