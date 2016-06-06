import {Component} from '@angular/core';

import {NotificationService} from '../../services/notificationService';

@Component({
    moduleId: module.id,
    selector: 'notifications',
    templateUrl: 'notifications.html'
})
export class NotificationsComponent {
    constructor(public notificationService: NotificationService) {
    }
}
