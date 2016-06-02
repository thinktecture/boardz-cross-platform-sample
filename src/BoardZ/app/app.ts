import {Component, AfterViewInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {LoginComponent} from './components/login/login';
import {DashboardComponent} from './components/dashboard/dashboard';
import {SidebarComponent} from './components/sidebar/sidebar';
import {HeaderComponent} from './components/header/header';
import {GamesComponent} from './components/games/games';
import {NotificationsComponent} from './components/notifications/notifications';
import {APP_SERVICES} from './services/all';
import {RadiusSearchComponent} from './components/radiusSearch/radiusSearch';
import {LogService} from './services/logService';
import {LogLevel} from './models/logLevel';
import {SignalRService} from './services/signalrService';
import {LoginService} from './services/loginService';
import {NotificationService} from './services/notificationService';
import {UiNotificationService} from './services/uiNotificationService';
import {NativeIntegrationService} from "./services/nativeIntegrationService";

@Component({
    selector: 'boardz-app',
    providers: APP_SERVICES,
    directives: [ROUTER_DIRECTIVES, SidebarComponent, HeaderComponent],
    templateUrl: 'app/app.html'
})
@RouteConfig([
    { path: '/', component: DashboardComponent, name: 'Dashboard', useAsDefault: true },
    { path: '/login', component: LoginComponent, name: 'Login' },
    { path: '/notifications', component: NotificationsComponent, name: 'Notifications' },
    { path: '/games/...', component: GamesComponent, name: 'Games', data: { displayName: 'Games' } },
    { path: '/radiusSearch', component: RadiusSearchComponent, name: 'RadiusSearch' }
])
export class BoardzAppComponent implements AfterViewInit {
    constructor(private _signalRService: SignalRService,
                private _loginService: LoginService,
                private _notificationService: NotificationService,
                private _nativeIntegrationService: NativeIntegrationService,
                private _uiNotificationService: UiNotificationService,
                private _logService: LogService) {
        _logService.maximumLogLevel = LogLevel.Verbose;
        _uiNotificationService.subscribeToNotifications();
        _nativeIntegrationService.init();
    }

    ngAfterViewInit(): any {
        if (window.initAdminLTE) {
            window.initAdminLTE();
        }

        if (this._loginService.isAuthenticated) {
            this._signalRService.start();
        }

        this._signalRService.someoneJoinedAGame.subscribe(message => {
            this._notificationService.notifyInformation(message);
        });
    }
}






























interface BoardZAppWindow extends Window {
    initAdminLTE(): void;
}

declare var window: BoardZAppWindow;
