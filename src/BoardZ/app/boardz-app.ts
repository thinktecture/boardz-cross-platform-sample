// angular2 stuff
import {Component, provide} from 'angular2/core';
import {FormBuilder} from 'angular2/common';
import {Http, HTTP_PROVIDERS, RequestOptions} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';

// rx operators - ALL you can eat
import 'rxjs/Rx';

// services
import {ApplicationConfiguration, Configuration} from './app-config';
import {LoginService} from './services/login/loginService';
import {DashboardService} from './services/dashboard/dashboardService';
import {Logger, LogLevel} from './services/logging/logger';
import {AuthenticationRequestOptions} from './services/http/authenticationRequestOptions';
import {GamesService} from './services/games/gamesService';

// components
import {LoginForm} from './components/login/loginform';
import {Dashboard} from './components/dashboard/dashboard';
import {Sidebar} from './components/sidebar/sidebar';
import {Headerbar} from './components/headerbar/headerbar';
import {GamesList} from './components/games/gameslist';

@Component({
    selector: 'boardz-app',
    providers: [
        // Angular stuff
        Http,
        HTTP_PROVIDERS,
        FormBuilder,

        // Special static config type
        [provide(Configuration, { useValue: new ApplicationConfiguration() })],

        // Our own stuff:
        LoginService,
        DashboardService,
        GamesService,
        // override default request options with ours that add additional headers
        [provide(RequestOptions, { useClass: AuthenticationRequestOptions })],
    ],
    directives: [
        // Angular stuff
        ROUTER_DIRECTIVES,

        // Our own stuff:
        Sidebar,
        Headerbar
    ],
    templateUrl: 'app/boardz-app.html'
})
@RouteConfig([
    { path: '/dashboard', component: Dashboard, name: 'Dashboard', data: { displayName: 'Dashboard' }},
    { path: '/login', component: LoginForm, name: 'Login', data: { displayName: 'Login' }},
    { path: '/games', component: GamesList, name: 'GamesList', data: { displayName: 'Games overview' }}
])
export class BoardzApp {

    constructor(router: Router, logger: Logger) {
        // configure logger
        logger.maximumLogLevel = LogLevel.Verbose;

        router.navigate(['Dashboard']); // try to navigate to dashboard, will be redirected to Login if required by CanActivate there
    }

}