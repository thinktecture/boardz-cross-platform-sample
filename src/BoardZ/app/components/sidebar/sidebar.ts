import {Component} from '@angular/core';

import {NavigationEntry} from '../../models/navigationEntry';

@Component({
    moduleId: module.id,
    selector: 'sidebar',
    templateUrl: 'sidebar.html'
})
export class SidebarComponent {
    public expanded: boolean = true;
    public navigationEntries: Array<NavigationEntry>;

    constructor() {
        this.navigationEntries = [];
        this.navigationEntries.push(new NavigationEntry([''], 'dashboard', 'Dashboard'));
        this.navigationEntries.push(new NavigationEntry(['/games/all'], 'list', 'Games'));
        this.navigationEntries.push(new NavigationEntry(['/radiussearch'], 'location-arrow', 'Players search'));

        //this.navigationEntries.push(new NavigationEntry(['/notifications'], 'bell', 'Test Notifcations'));
    }
}
