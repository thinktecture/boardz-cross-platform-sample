import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {LogService} from './logService';
import {Notification} from '../models/notification';
import {NotificationType} from '../models/notificationType';

@Injectable()
export class NotificationService {
    public notifications: Subject<Notification> = new Subject<Notification>();

    constructor(private _logService: LogService) {
    }

    public notify(notification: Notification) {
        if (!notification.message) {
            return;
        }

        this._logService.logDebug('NotificationService.notify received notification: ' + JSON.stringify(notification));
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
