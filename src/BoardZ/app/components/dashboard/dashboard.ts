import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboardService';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.html'
})
export class DashboardComponent implements OnInit {
    public playerCount: string = '-';
    public gameCount: string = '-';
    public categoryCount: string = '-';

    constructor(private _dashboardService: DashboardService) {
    }

    public ngOnInit(): any {
        this._dashboardService.getPlayerCount()
            .subscribe(result => this.playerCount = result.toString());

        this._dashboardService.getGameCount()
            .subscribe(result => this.gameCount = result.toString());

        this._dashboardService.getCategoryCount()
            .subscribe(result => this.categoryCount = result.toString());
    }
}
