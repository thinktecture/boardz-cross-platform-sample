import {Component, OnInit} from '@angular/core';
import {Notification} from '../../models/notification';
import {LoginService} from '../../services/loginService';
import {TokenService} from '../../services/tokenService';
import {NotificationService} from '../../services/notificationService';
import {OfflineDetectionService} from '../../services/offlineDetectionService';
import {ConnectionState} from '../../models/connectionState';

@Component({
    selector: 'app-header',
    templateUrl: 'header.html'
})
export class HeaderComponent implements OnInit {
    public notifications: Notification[] = [];

    public loggedIn = false;

    constructor(public loginService: LoginService,
                private _tokenService: TokenService,
                private _offlineDetectionService: OfflineDetectionService,
                private _notificationService: NotificationService) {
    }

    public get isInitializing(): boolean {
        console.log(this._offlineDetectionService.currentConnectionState);
        return this._offlineDetectionService.currentConnectionState === ConnectionState.Initializing;
    }

    public getConnectionStateIndicator(): string {
        let classes = "fa ";
        switch (this._offlineDetectionService.currentConnectionState) {
            case ConnectionState.Initializing:
                classes += "fa-spinner fa-pulse fa-fw";
                break;
            case ConnectionState.Offline:
                classes += "fa-plane";
                break;
            case ConnectionState.ToSlow:
                classes += "fa-plane";
                break;
            default:
                classes += "fa-wifi";
                break;
        }
        return classes;
    }

    public get isOnline(): boolean {
        return this._offlineDetectionService.isOnline;
    }

    public ngOnInit(): any {
        this._notificationService.notifications.subscribe(
            (notification) => this.onNotification(notification)
        );
        this._tokenService.isAuthenticated().subscribe(result => this.loggedIn = result);
    }

    public dismiss(notification: Notification): boolean {
        if (notification) {
            const index = this.notifications.indexOf(notification);

            if (index > -1) {
                this.notifications.splice(index, 1);
            }
        } else {
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
