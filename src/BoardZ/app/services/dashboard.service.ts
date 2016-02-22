import {Injectable} from 'angular2/core';
import {AuthenticatedHttp} from './authenticated.http';
import {GamesService} from './games.service';

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
