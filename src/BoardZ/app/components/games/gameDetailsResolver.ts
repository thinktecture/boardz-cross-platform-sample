import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Game} from '../../models/game';
import {GamesService} from '../../services/gamesService';

@Injectable()
export class GameDetailsResolver implements Resolve<Game> {
    constructor(private _gamesService: GamesService) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<Game> {
        let id = route.params['id'];
        return new Promise((resolve) => {
            this._gamesService.getById(id).subscribe(game => {
                if (game) {
                    resolve(game)
                } else {
                    resolve(new Game())
                }
            });
        });
    }
}
