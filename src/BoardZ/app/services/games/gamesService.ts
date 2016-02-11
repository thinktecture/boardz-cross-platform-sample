import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

import {Configuration} from '../../app-config';
import {Logger} from '../logging/logger';

// Only for testing purposes:
import {GAMES} from './games_100';

export interface Packshot {
    frontImageUrl?: string;
    topImageUrl?: string;
    leftImageUrl?: string;
    rightImageUrl?: string;
    bottomImageUrl?: string;
}

export interface Game {
    id: string;
    name: string;
    description?: string;
    packshot?: Packshot;
    userName?: string;
}

@Injectable()
export class GamesService {

    constructor(private _config: Configuration, private _logger: Logger, private _http: Http){ }

    private fetchGames(): Observable<Game[]> {
        return Observable.of(<Game[]>GAMES);

       //  return this._http.get(this._config.apiEndpoint + 'api/BoardGames/List').map(response => (<Game[]>response.json()));
    }

    public getGames() : Promise<Game[]> {
        return this.fetchGames()
            .toPromise();
    }

    public getGamesCount(): Promise<number> {
        return this.fetchGames()
            .map(result => result.length)
            .toPromise();
    }

}