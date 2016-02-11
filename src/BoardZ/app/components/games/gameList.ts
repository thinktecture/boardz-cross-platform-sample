import {Component, OnInit} from 'angular2/core';
import {Game, GamesService} from '../../services/games/gamesService';
import {Router} from 'angular2/router';

@Component({
    selector: 'gamelist',
    templateUrl: 'app/components/games/gameList.html'
})
export class GameList implements OnInit {

    public games: Game[];

    constructor(private _gamesService: GamesService, private _router: Router) {     }

    getGames() {
        this._gamesService.getGames()
            .then(games => this.games = games);
    }

    gotoDetails(game: Game) {
        this._router.navigate(['GameDetails', { id: game.id}])
    }

    ngOnInit() {
        this.getGames();
    }
}