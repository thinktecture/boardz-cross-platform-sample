import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'sidebar',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/sidebar/sidebar.html'
})
export class Sidebar {

    public expanded: boolean = true;

    toggleSidebar(): void {
        this.expanded = !this.expanded;
    }
}
