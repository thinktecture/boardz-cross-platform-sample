import {Component, OnInit} from 'angular2/core';
import {NgClass} from 'angular2/common';

import {Notification} from '../../models/notification';
import {LoginService} from '../../services/loginService';
import {TokenService} from '../../services/tokenService';
import {NotificationService} from '../../services/notificationService';
import {BackButtonDirective} from '../../directives/backButtonDirective';

@Component({
    selector: 'boardz-header',
    directives: [NgClass, BackButtonDirective],
    templateUrl: 'app/components/header/header.html'
})
export class HeaderComponent implements OnInit {
    private notifications: Notification[] = [];

    public loggedIn: boolean = false;
    public currentLocation: string = 'BoardZ!';

    constructor(public loginService: LoginService, 
                private _tokenService: TokenService, 
                private _notificationService: NotificationService) {
    }

    ngOnInit(): any {
        this._notificationService.notifications.subscribe(
            (notification) => this.onNotification(notification)
        );
        this._tokenService.check().subscribe(result => {
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
