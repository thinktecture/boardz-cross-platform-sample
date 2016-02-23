import {Injectable} from 'angular2/core';
import {Subject} from 'rxjs/Subject';
import {Notification} from '../models/notification';
import {NotificationType} from '../models/notificationtype';

@Injectable()
export class NotificationService {

    public notifications: Subject<Notification> = new Subject<Notification>();

    public notify(notification: Notification) {
        if (!notification.message) {
            return;
        }

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
