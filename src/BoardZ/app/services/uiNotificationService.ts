import {Injectable} from '@angular/core';
import {NotificationService} from './notificationService';
import {Notification} from '../models/notification';
import {NotificationType} from '../models/notificationType';

declare var PNotify;

@Injectable()
export class UiNotificationService {
    private _notificationTypeMap = {};

    constructor(private _notificationService: NotificationService) {
        this._notificationTypeMap[NotificationType.Information] = 'info';
        this._notificationTypeMap[NotificationType.Error] = 'error';
        this._notificationTypeMap[NotificationType.Warning] = 'notice';
        this._notificationTypeMap[NotificationType.Success] = 'success';
    }

    public subscribeToNotifications(): void {
        this._notificationService.notifications.subscribe((notification: Notification) => {
            this.showUiNotification(notification);
        });
    }

    private showUiNotification(notification: Notification): void {
        const type = this.notificationTypeToPNotifyType(notification.type);

        const settings = {
            styling: 'bootstrap3',
            title: type[0].toUpperCase() + type.substr(1),
            text: notification.message,
            type: type,
            addclass: 'stack-bar-top',
            cornerclass: '',
            width: '100%',
            delay:1500
        };

        new PNotify(settings);
    }

    private notificationTypeToPNotifyType(type: NotificationType): string {
        return this._notificationTypeMap[type] || 'notice';
    }
}
