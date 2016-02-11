// angular2 stuff
import {Component, provide} from 'angular2/core';
import {FormBuilder} from 'angular2/common';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';

// rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/publishReplay';

// services
import {ApplicationConfiguration} from './app-config';
import {LoginService} from './services/login/login-service';
import {LOGGING_PROVIDERS} from './services/logging/loggingProviders';

// components
import {LoginForm} from './components/login/login-form';
import {Dashboard} from './components/dashboard/dashboard';
import {Sidebar} from './components/sidebar/sidebar';
import {Headerbar} from './components/headerbar/headerbar';
import {Logger, LogLevel} from './services/logging/logger';

@Component({
    selector: 'boardz-app',
    providers: [
        // Angular stuff
        Http, HTTP_PROVIDERS,
        FormBuilder,

        // Special static config type
        [provide('app.config', {useValue: ApplicationConfiguration})],

        // Our own stuff:
        LOGGING_PROVIDERS,
        LoginService
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
    { path: '/dashboard', component: Dashboard, name: 'Dashboard', data: { displayName: 'Dashboard' } },
    { path: '/login', component: LoginForm, name: 'Login', data: { displayName: 'Login' }}
])
export class BoardzApp {

    constructor(router: Router, logger: Logger) {
        // configure logger
        logger.maximumLogLevel = LogLevel.Verbose;

        router.navigate(['Login']);
    }

}