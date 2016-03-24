import {Component, OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {NeedsAuthentication} from '../../decorators/needsAuthentication';
import {WidgetComponent} from '../widget/widget';
import {GamesService} from '../../services/games.service';
import {PlayersService} from '../../services/players.service';

@Component({
    directives: [ROUTER_DIRECTIVES, WidgetComponent],
    templateUrl: 'app/components/dashboard/dashboard.html'
})
@NeedsAuthentication()
export class Dashboard implements OnInit {
    public playerCount: string = '-';
    public gameCount: string = '-';

    constructor(private _gamesService: GamesService, private _playersService: PlayersService) {
    }

    ngOnInit(): any {
        this._playersService.getPlayerCount()
            .subscribe(result => this.playerCount = result.toString());
        
        this._gamesService.getGameCount()
            .subscribe(result => this.gameCount = result.toString());
    }
}