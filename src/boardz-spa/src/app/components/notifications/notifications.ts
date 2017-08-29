import {Component} from '@angular/core';

import {NotificationService} from '../../services/notificationService';

@Component({
    selector: 'app-notifications',
    templateUrl: 'notifications.html'
})
export class NotificationsComponent {
    constructor(public notificationService: NotificationService) {
    }
}
