import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {DashboardService} from '../../services/dashboard/dashboardService';
import {isLoggedIn} from '../../services/routing/isLoggedIn';

@Component({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/dashboard/dashboard.html'
})
@CanActivate((to, from) => isLoggedIn(to, from))
export class Dashboard {

    playerCount: number = 0;
    gameCount: number = 0;

    constructor(dashboardService: DashboardService) {
        dashboardService.getPlayerCount().then(result => this.playerCount = result);
        dashboardService.getGameCount().then(result => this.gameCount = result);
    }
}