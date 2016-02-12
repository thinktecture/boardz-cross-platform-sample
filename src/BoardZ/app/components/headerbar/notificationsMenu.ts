import {Component, ViewChild} from 'angular2/core';

import {NotificationService, Notification, NotificationType} from '../../services/notifications/notificationService';
import {Logger} from '../../services/logging/logger';

@Component({
    selector: 'notificationsMenu',
    templateUrl: 'app/components/headerbar/notificationsMenu.html',
    styleUrls: [
        'app/components/headerbar/userMenuStyles.css',
        'app/components/headerbar/notificationMenuStyles.css'
    ]
})
export class NotificationsMenu {

    @ViewChild('notificationHandle') notificationHandle;
    @ViewChild('notificationIcon') notificationIcon;
    private _blinking: boolean = false;

    public notifications: Notification[] = [];
    public highestNotificationColorCssClass = null;

    constructor(private _notificationService: NotificationService, private _logger: Logger) {
        _notificationService.notifications.subscribe(
            (notification) => this.onNotification(notification)
        );
    }

    public getAlertClass(type: NotificationType): string {
        switch (type) {
            case NotificationType.Information:
                return 'alert-info';
            case NotificationType.Success:
                return 'alert-success';
            case NotificationType.Warning:
                return 'alert-warning';
            case NotificationType.Error:
                return 'alert-danger';
            default:
                return 'alert-info';
        }
    }

    public getIconClass(type: NotificationType): string {
        switch (type) {
            case NotificationType.Information:
                return 'fa-c-info';
            case NotificationType.Success:
                return 'fa-c-success';
            case NotificationType.Warning:
                return 'fa-c-warning';
            case NotificationType.Error:
                return 'fa-c-danger';
            default:
                return 'fa-c-info';
        }
    }

    public dismiss(notification: Notification): void {
        let index = this.notifications.indexOf(notification);
        if (index > -1) {
            this.notifications.splice(index, 1);
            this.updateIconColor();
        }
    }

    public dismissAll(): void {
        this.notifications = [];
        this.updateIconColor();
    }

    private onNotification(notification: Notification): void {
        this.notifications.unshift(notification);

        if (notification.type > NotificationType.Information) {
            this.blink(notification.type);
        }

        this.updateIconColor();
    }

    private updateIconColor() {
        var highest = NotificationType.Information;
        
        for (let i = 0; i < this.notifications.length; i++) {
            if (this.notifications[i].type > highest) {
                highest = this.notifications[i].type;
            }
        }

        this.highestNotificationColorCssClass = this.getIconClass(highest);
    }

    private blink(notificationType: NotificationType) {
        // do not blink if already blinking
        if (this._blinking)
            return;

        this._blinking = true;
        this.highestNotificationColorCssClass = null;
        this._logger.logDebug('NotificationMenu.blink: Starting blinking...');

        let that = this,
            classes = this.notificationIcon.nativeElement.classList,
            iconColorClass = this.getIconClass(notificationType);

        this.notificationHandle.nativeElement.classList.add('open');
        classes.add(iconColorClass);
        classes.remove('fa-bell-o');
        classes.add('fa-bell');

        let blinker = setInterval(function() {
            classes.toggle('fa-2x');
            classes.toggle('fa-bell-o');
            classes.toggle('fa-bell');
        }, 200);

        setTimeout(function() {
            clearInterval(blinker);
            classes.remove(iconColorClass, 'fa-2x', 'fa-bell');
            classes.add('fa-bell-o');
            that._blinking = false;
            that._logger.logDebug('NotificationMenu.blink: Stopped blinking');
            that.notificationHandle.nativeElement.classList.remove('open');
            that.updateIconColor();
        }, 2000);
    }
}

