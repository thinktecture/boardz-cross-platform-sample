import {Component, OnInit} from 'angular2/core';
import {Game, GamesService} from '../../services/games/gamesService';

@Component({
    selector: 'gameslist',
    templateUrl: 'app/components/games/gameslist.html'
})
export class GamesList implements OnInit {

    public games: Game[];

    constructor(private _gamesService: GamesService) {     }

    getGames() {
        this._gamesService.getGames()
            .then(games => this.games = games);
    }

    ngOnInit() {
        this.getGames();
    }
}