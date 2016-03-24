import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {NeedsAuthentication} from '../../decorators/needsAuthentication';
import {WidgetComponent} from '../widget/widget';
import {GamesService} from '../../services/gamesService';
import {PlayersService} from '../../services/playersService';

@Component({
    directives: [ROUTER_DIRECTIVES, WidgetComponent],
    templateUrl: 'app/components/dashboard/dashboard.html'
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