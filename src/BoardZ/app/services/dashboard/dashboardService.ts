import {Injectable} from 'angular2/core';
import {GamesService} from '../games/gamesService';
import {AuthenticatedHttp} from '../http/AuthenticatedHttp';

@Injectable()
export class DashboardService {

    constructor(private _http: AuthenticatedHttp, private _gameService: GamesService) {
    }

    public getPlayerCount(): Promise<number> {
        return this._http.get(`api/players/playercount`)
            .map(response => parseInt(response.text()))
            .toPromise();
    }

    public getGameCount(): Promise<number> {
        return this._gameService.getGamesCount();
    }
}
