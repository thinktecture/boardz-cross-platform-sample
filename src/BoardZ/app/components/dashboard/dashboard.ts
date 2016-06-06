import {Component, OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {NeedsAuthentication} from '../../decorators/needsAuthentication';
import {WidgetComponent} from '../widget/widget';
import {GamesService} from '../../services/gamesService';
import {PlayersService} from '../../services/playersService';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    directives: [WidgetComponent],
    templateUrl: 'dashboard.html'
})
@NeedsAuthentication()
export class DashboardComponent implements OnInit {
    public playerCount: string = '-';
    public gameCount: string = '-';

    constructor(private _gamesService: GamesService, 
                private _playersService: PlayersService) {
    }

    ngOnInit(): any {
        this._playersService.getPlayerCount()
            .subscribe(result => this.playerCount = result.toString());
        
        this._gamesService.getGameCount()
            .subscribe(result => this.gameCount = result.toString());
    }
}
