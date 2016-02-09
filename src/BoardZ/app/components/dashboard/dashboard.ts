import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    directives: [ROUTER_DIRECTIVES],
    template: `<h1>Dashboard</h1>
    <span>Test: Try to navigate to <a [routerLink]="['Login']">Login</a></span>`
})
export class Dashboard {

}