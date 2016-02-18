import {Component} from 'angular2/core';
import {NotificationService} from '../../services/notifications/notificationService';
@Component({
    selector: 'notifications',
    templateUrl: 'app/components/notifications/notifications.html'
})
export class Notifications {

    constructor(public notificationService: NotificationService) {
    }

}
