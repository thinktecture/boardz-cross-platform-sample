import {Component} from 'angular2/core';

import {NotificationService} from '../../services/notificationService';

@Component({
    selector: 'notifications',
    templateUrl: 'app/components/notifications/notifications.html'
})
export class NotificationsComponent {
    constructor(public notificationService: NotificationService) {
    }
}
