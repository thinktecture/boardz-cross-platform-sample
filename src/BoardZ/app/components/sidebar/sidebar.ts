import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {LoginService} from '../../services/login.service';

@Component({
    selector: 'sidebar',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/sidebar/sidebar.html'
})
export class Sidebar {

    public expanded: boolean = true;

    constructor(public loginService: LoginService) {
    }

    toggleSidebar(): void {
        this.expanded = !this.expanded;
    }
}
