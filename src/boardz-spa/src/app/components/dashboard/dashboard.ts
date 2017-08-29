import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboardService';
import {OfflineDetectionService} from '../../services/offlineDetectionService';
import {TokenService} from '../../services/tokenService';

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.html'
})
export class DashboardComponent implements OnInit {
    public playerCount = '-';
    public gameCount = '-';
    public categoryCount: string = '-';

    constructor(private _dashboardService: DashboardService,
                private _offlineDetectionService: OfflineDetectionService,
                private _tokenService: TokenService) {
    }

    public ngOnInit(): any {
        this.getDashboardData();
        this._offlineDetectionService.connectionRestoring.asObservable().subscribe(()=> {
            if(this._tokenService.isAuthenticated()) {
                this.getDashboardData();
            }
        });
    }

    private getDashboardData() {
        this._dashboardService.getPlayerCount()
            .subscribe(result => this.playerCount = result.toString());

        this._dashboardService.getGameCount()
            .subscribe(result => this.gameCount = result.toString());

        this._dashboardService.getCategoryCount()
            .subscribe(result => this.categoryCount = result.toString());
    }
}
