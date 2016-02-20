import {Injectable} from 'angular2/core';

import {Logger} from '../logging/logger';
import {Subject} from 'rxjs/Subject';

export enum NotificationType {
    Information,
    Success,
    Warning,
    Error,
}

export class Notification {
    constructor(
        public message: string,
        public type: NotificationType = NotificationType.Information
    ) { }

    get iconCssClass(){
        switch (this.type) {
            case NotificationType.Information:
                return 'fa-info';
            case NotificationType.Success:
                return 'fa-hand-peace-o';
            case NotificationType.Warning:
                return 'fa-warning';
            case NotificationType.Error:
                return 'fa-exclamation-triangle danger';
            default:
                return 'fa-info';
        }
    }
}

@Injectable()
export class NotificationService {

    public notifications: Subject<Notification> = new Subject<Notification>();

    constructor(private _logger: Logger) { }

    public notify(notification: Notification) {
        if (!notification.message) {
            return;
        }

        this._logger.logDebug('NotificationService.notify received notifiction: ' + JSON.stringify(notification));
        this.notifications.next(notification);
    }

    public notifyInformation(message: string) {
        this.notify(
            new Notification(message, NotificationType.Information)
        );
    }

    public notifySuccess(message: string) {
        this.notify(
            new Notification(message, NotificationType.Success)
        );
    }

    public notifyWarning(message: string) {
        this.notify(
            new Notification(message, NotificationType.Warning)
        );
    }

    public notifyError(message: string) {
        this.notify(
            new Notification(message, NotificationType.Error)
        );
    }
}
