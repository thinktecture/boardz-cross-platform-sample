import {Component, OnInit} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Router} from 'angular2/router';
import {Breadcrumb} from '../breadcrumb/breadcrumb';
import {Logger} from '../../services/logging/logger';
import {TokenDataStore} from '../../services/login/tokenDataStore';
import {LoginService} from '../../services/login/loginService';
import {NotificationService, Notification, NotificationType} from '../../services/notifications/notificationService';

@Component({
    selector: 'boardz-header',
    directives: [NgClass, Breadcrumb],
    templateUrl: 'app/components/header/header.html'
})
export class HeaderComponent implements OnInit {

    public loggedIn: boolean = false;
    private notifications: Notification[] = [];
    public currentLocation: string = 'BoardZ!';

    constructor(public loginService: LoginService, private _tokenStore: TokenDataStore, private _notificationService: NotificationService, private _router: Router, private _logger: Logger) {
        while (this._router.parent) {
            this._router = this._router.parent;
        }

        this._router.subscribe(routeUrl => {
            this._logger.logVerbose('Headerbar detected routing to: ' + routeUrl);

            this._router.recognize(routeUrl).then(instruction => {
                while (instruction.child) {
                    instruction = instruction.child;
                }

                this.currentLocation = instruction.component.routeData.get('displayName');
            });
        });
    }

    ngOnInit(): any {
        this._notificationService.notifications.subscribe(
            (notification) => this.onNotification(notification)
        );
        this._tokenStore.check().subscribe(result => {
            this._logger.logDebug('Headerbar: Received notification about tokenstore status change. Result: ' + result);
            this.loggedIn = result
        });
    }
 

    public dismiss(notification: Notification): boolean {
        if (notification) {
            let index = this.notifications.indexOf(notification);
            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        }
        else {
            this.notifications = [];
        }
        return false;
    }

    private onNotification(notification: Notification): void {
        this.notifications.unshift(notification);
    }

    logout(event): void {
        event.preventDefault();

        this.loginService.logout();

    }
}
