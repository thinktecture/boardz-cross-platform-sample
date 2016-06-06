import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {CloseSidebarOnClickDirective} from '../../directives/closeSidebarOnClickDirective';
import {NavigationEntry} from "../../models/navigationEntry";

@Component({
    moduleId: module.id,
    selector: 'sidebar',
    directives: [ROUTER_DIRECTIVES, CloseSidebarOnClickDirective],
    templateUrl: 'sidebar.html'
})
export class SidebarComponent {
    public expanded: boolean = true;
    public navigationEntries: Array<NavigationEntry>;

    constructor() {
        this.navigationEntries = [];
        this.navigationEntries.push(new NavigationEntry(['Dashboard'], 'dashboard', 'Dashboard'));
        this.navigationEntries.push(new NavigationEntry(['Games', 'GamesList'], 'list', 'Games'));
        this.navigationEntries.push(new NavigationEntry(['RadiusSearch'], 'location-arrow', 'Players search'));
    }

    toggleSidebar(): void {
        this.expanded = !this.expanded;
    }
}
