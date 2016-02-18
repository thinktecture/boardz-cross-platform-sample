import {LoginService} from './login/loginService';
import {DashboardService} from './dashboard/dashboardService';
import {Logger, LogLevel} from './logging/logger';
import {GamesService} from './games/gamesService';
import {NotificationService} from './notifications/notificationService';
import {provide} from 'angular2/core';
import {ApplicationConfiguration, Configuration} from '../app-config';
import {Http, ConnectionBackend, XHRBackend} from 'angular2/http';
import {AuthenticatedHttp} from './http/AuthenticatedHttp';

export var APP_SERVICES = [
    provide(Configuration, { useValue: new ApplicationConfiguration() }),
    provide(ConnectionBackend, { useClass: XHRBackend }),
    provide(AuthenticatedHttp, { useClass: AuthenticatedHttp }),
    provide(LoginService, { useClass: LoginService }),
    provide(DashboardService, { useClass: DashboardService }),
    provide(Logger, { useClass: Logger }),
    provide(LogLevel, { useValue: LogLevel }),
    provide(GamesService, { useClass: GamesService }),
    provide(NotificationService, { useClass: NotificationService })
];


export const TEST_SERVICES = [
    LoginService, DashboardService
];