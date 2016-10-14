import {Component} from '@angular/core';

import {NotificationService} from '../../services/notificationService';

@Component({
    moduleId: __moduleName,
    selector: 'notifications',
    templateUrl: 'notifications.html'
})
export class NotificationsComponent {
    constructor(public notificationService: NotificationService) {
    }
}
