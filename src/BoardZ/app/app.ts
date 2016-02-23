import {Component, AfterViewInit} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {LoginForm} from './components/login/login';
import {Dashboard} from './components/dashboard/dashboard';
import {Sidebar} from './components/sidebar/sidebar';
import {HeaderComponent} from './components/header/header';
import {Games} from './components/games/games';
import {Notifications} from './components/notifications/notifications';
import {APP_SERVICES} from './services/all';
import {RadiusSearchComponent} from './components/radiussearch/radiussearch';
import {SignalRService} from './services/signalr.service';
import {LoginService} from './services/login.service';
import {NotificationService} from './services/notification.service';
import {UiNotificationService} from './services/ui.notification.service';

interface AdminLteFix extends Window {
    initAdminLTE():void;
}

declare var window: AdminLteFix;

@Component({
    selector: 'boardz-app',
    providers: APP_SERVICES,
    directives: [ROUTER_DIRECTIVES, Sidebar, HeaderComponent],
    templateUrl: 'app/app.html'
})
@RouteConfig([
    { path: '/', component: Dashboard, name: 'Dashboard', useAsDefault: true, data: { displayName: 'Dashboard' } },
    { path: '/login', component: LoginForm, name: 'Login', data: { displayName: 'Login' } },
    { path: '/notifications', component: Notifications, name: 'Notifications', data: { displayName: 'Notifications' } },
    { path: '/games/...', component: Games, name: 'Games', data: { displayName: 'Games' } },
    { path: '/radiussearch', component: RadiusSearchComponent, name: 'RadiusSearch', data: { displayName: 'Radius Search' } }
])
export class BoardzApp implements AfterViewInit {

    ngAfterViewInit(): any {
        if (window.initAdminLTE) {
            window.initAdminLTE();
        }

        if (this._loginService.isAuthenticated) {
            this._signalRService.start();
        }

        // TODO: Maybe move this to another place?
        this._signalRService.someoneJoinedAGame.subscribe(message => {
            this._notificationService.notifyInformation(message);
        });
    }

    constructor(private _signalRService: SignalRService,
                private _loginService: LoginService,
                private _notificationService: NotificationService,
                uiNotificationService: UiNotificationService) {
        uiNotificationService.subscribeToNotifications();
    }

}
