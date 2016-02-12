import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {Game, GamesService} from '../../services/games/gamesService';

@Component({
    selector: 'gamelist',
    templateUrl: 'app/components/games/gameList.html'
})
export class GameList implements OnInit {

    public games: Game[];

    constructor(private _gamesService: GamesService, private _router: Router) {     }

    getGames(): void {
        this._gamesService.getGames()
            .then(games => this.games = games);
    }

    addNew(): void {
        this._router.navigate(['GameDetails', { id: 'new' }])
    }

    gotoDetails(game: Game): void {
        this._router.navigate(['GameDetails', { id: game.id}])
    }

    ngOnInit() {
        this.getGames();
    }
}