import {Component} from '@angular/core';

import {NavigationEntry} from "../../models/navigationEntry";

@Component({
    moduleId: __moduleName,
    selector: 'sidebar',
    templateUrl: 'sidebar.html'
})
export class SidebarComponent {
    public expanded: boolean = true;
    public navigationEntries: Array<NavigationEntry>;

    constructor() {
        this.navigationEntries = [];
        this.navigationEntries.push(new NavigationEntry(['Dashboard'], 'dashboard', 'Dashboard '));
        this.navigationEntries.push(new NavigationEntry(['Games', 'GamesList'], 'list', 'Games'));
        this.navigationEntries.push(new NavigationEntry(['RadiusSearch'], 'location-arrow', 'Players search'));
    }

    toggleSidebar(): void {
        this.expanded = !this.expanded;
    }
}
