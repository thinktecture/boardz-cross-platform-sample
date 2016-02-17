import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {DashboardService} from '../../services/dashboard/dashboardService';
import {NeedsAuthentication} from '../../decorators/needsAuthentication';

@Component({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/dashboard/dashboard.html'
})
@NeedsAuthentication()
export class Dashboard implements OnInit {

    public playerCount: number = 0;
    public gameCount: number = 0;

    constructor(private _dashboardService: DashboardService) {

    }

    ngOnInit(): any {
        this._dashboardService.getPlayerCount().then(result => this.playerCount = result);
        this._dashboardService.getGameCount().then(result => this.gameCount = result);
    }
}