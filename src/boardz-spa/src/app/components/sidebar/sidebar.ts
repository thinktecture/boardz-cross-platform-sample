import {Component} from '@angular/core';
import {NavigationEntry} from '../../models/navigationEntry';

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.html'
})
export class SidebarComponent {
    public isExpanded = true;
    public navigationEntries: Array<NavigationEntry>;

    constructor() {
        this.navigationEntries = [];
        this.navigationEntries.push(new NavigationEntry([''], 'dashboard', 'Dashboard'));
        this.navigationEntries.push(new NavigationEntry(['/games/all'], 'list', 'Games'));
        this.navigationEntries.push(new NavigationEntry(['/categories/all'], 'tags', 'Categories'));
        this.navigationEntries.push(new NavigationEntry(['/radiussearch'], 'location-arrow', 'Players search'));

        // this.navigationEntries.push(new NavigationEntry(['/notifications'], 'bell', 'Test Notifcations'));
    }

}
