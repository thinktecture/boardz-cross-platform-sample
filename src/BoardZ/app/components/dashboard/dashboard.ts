import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {NeedsAuthentication} from '../../decorators/needsAuthentication';
import {WidgetComponent} from '../widget/widget';
import {DashboardService} from '../../services/dashboard.service';

@Component({
    directives: [ROUTER_DIRECTIVES, WidgetComponent],
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