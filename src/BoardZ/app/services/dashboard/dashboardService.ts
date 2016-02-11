import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';

import {Configuration} from '../../app-config';

@Injectable()
export class DashboardService {

    constructor (private _config: Configuration, private _http: Http) { }

    getPlayerCount(): Promise<number> {

        return this._http.get(this._config.apiEndpoint + 'api/Players/PlayerCount')
            .map(response => parseInt(response.text()))
            .toPromise();
    }

    getGameCount(): Promise<number> {
        return this._http.get(this._config.apiEndpoint + 'api/BoardGames/List')
            .map(response => (<Object[]>response.json()).length)
            .toPromise();
    }
}
