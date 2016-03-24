import {NotificationType} from './notificationType';

export class Notification {
    constructor(public message: string,
                public type: NotificationType = NotificationType.Information) {
    }

    get iconCssClass() {
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