import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs';

import {AuthenticatedHttp} from './authenticatedHttp';
import {Game} from '../models/game';
import {ApiConfig} from '../apiConfig';

@Injectable()
export class GamesService {
    constructor(private _http: AuthenticatedHttp, private _config: ApiConfig) {
    }

    private getRequestOptions() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Accept', 'text/plain');
        headers.append('Accept', '*/*');
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        return { headers: headers };
    }

    private buildUrl(appendix: string): string {
        return `${this._config.rootUrl}${appendix}`;
    }

    public getAll(): Observable<Game[]> {
        return this._http.get(this.buildUrl('api/boardgames/list')).map(response => (<Game[]>response.json()));
    }

    public getGameCount(): Observable<number> {
        return this.getAll().map(games => games.length);
    }

    public getById(id: string): Observable<Game> {
        return this._http.get(this.buildUrl(`api/boardgames/single?id=${id}`))
            .map(response => <Game>response.json());
    }

    public addGame(game: Game): Observable<string> {
        return this._http.post(this.buildUrl(`api/boardgames/add`), JSON.stringify(game), this.getRequestOptions())
            .map(response => <string>response.json());
    }

    public updateGame(game: Game): Observable<string> {
        return this._http.put(this.buildUrl(`api/boardgames/update`), JSON.stringify(game), this.getRequestOptions())
            .map(response => game.id);
    }

    public deleteGame(id: string): Observable<string> {
        return this._http.delete(this.buildUrl(`api/boardgames/remove?id=${id}`))
            .map(response => <string>response.text());
    }

    public deepClone(game: Game): Game {
        return <Game>JSON.parse(JSON.stringify(game));
    }
}
