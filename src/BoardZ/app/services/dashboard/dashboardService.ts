import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

import {Configuration} from '../../app-config';
import {GamesService} from '../games/gamesService';

@Injectable()
export class DashboardService {

    constructor (private _config: Configuration, private _http: Http, private _gameService: GamesService) { }

    getPlayerCount(): Promise<number> {
        return this._http.get(this._config.apiEndpoint + 'api/Players/PlayerCount')
            .map(response => parseInt(response.text()))
            .toPromise();
    }

    getGameCount(): Promise<number> {
        return this._gameService.getGamesCount();
    }
}
