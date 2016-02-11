import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {Game, GamesService} from '../../services/games/gamesService';

@Component({
    selector: 'gameDetail',
    templateUrl: 'app/components/games/gameDetails.html',
    inputs: ['game']
})

export class GameDetails implements OnInit {
    public game: Game;

    constructor(private _gameService: GamesService, private _routeParams: RouteParams) {}

    ngOnInit() {
        let id = this._routeParams.get('id');
        this._gameService.getGame(id)
            .then(game => this.game = game);
    }
}
