// angular2 stuff
import {Component, provide} from 'angular2/core';
import {FormBuilder} from 'angular2/common';
import {HTTP_PROVIDERS, Http, XHRBackend, RequestOptions, ConnectionBackend} from 'angular2/http';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

// rx operators - ALL you can eat
import 'rxjs/Rx';

// services
import {AuthenticatedHttp} from './services/http/AuthenticatedHttp';
import {ApplicationConfiguration, Configuration} from './app-config';
import {LoginService} from './services/login/loginService';
import {DashboardService} from './services/dashboard/dashboardService';
import {Logger, LogLevel} from './services/logging/logger';
import {GamesService} from './services/games/gamesService';
import {NotificationService} from './services/notifications/notificationService';

// components
import {LoginForm} from './components/login/loginform';
import {Dashboard} from './components/dashboard/dashboard';
import {Sidebar} from './components/sidebar/sidebar';
import {Headerbar} from './components/headerbar/headerbar';
import {Games} from './components/games/games';
import {Notifications} from './components/notifications/notifications';

@Component({
    selector: 'boardz-app',
    providers: [
        // Angular stuff
        HTTP_PROVIDERS,
        FormBuilder,

        // Special static config type
        provide(Configuration, { useValue: new ApplicationConfiguration() }),

        // override default http request options with ours that add additional headers
        provide(ConnectionBackend, { useClass: XHRBackend }), // need to tweak injection a bit...
        provide(Http, { useClass: AuthenticatedHttp }),

        // Our own stuff:
        NotificationService,
        LoginService,
        DashboardService,
        GamesService,
        Notifications,
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
    { path: '/', component: Dashboard, name: 'Dashboard', useAsDefault: true, data: { displayName: 'Dashboard' }},
    { path: '/login', component: LoginForm, name: 'Login', data: { displayName: 'Login' }},
    { path: '/notifications', component: Notifications, name: 'Notifications', data: { displayName: 'Notifications' }},
    { path: '/games/...', component: Games, name: 'Games', data: { displayName: 'Games' }} // prepare for nested routes
])
export class BoardzApp {

    constructor(logger: Logger) {
        // configure logger
        logger.maximumLogLevel = LogLevel.Verbose;
    }

}