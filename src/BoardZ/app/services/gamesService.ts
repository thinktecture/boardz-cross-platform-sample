import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {AuthenticatedHttp} from './authenticatedHttp';
import {Game} from '../models/game';

@Injectable()
export class GamesService {
    constructor(private _http: AuthenticatedHttp) {
    }

    private getRequestOptions() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Accept', 'text/plain');
        headers.append('Accept', '*/*');
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        return { headers: headers };
    }

    public getAll(): Observable<Game[]> {
        // TODO
    }

    public deepClone(game: Game): Game {
        return <Game>JSON.parse(JSON.stringify(game));
    }

    public getGameCount(): Observable<number> {
        // TODO
    }

    public getById(id: string): Observable<Game> {
        // TODO
    }

    public addGame(game: Game): Observable<string> {
        // TODO
    }

    public updateGame(game: Game): Observable<string> {
        // TODO
    }

    public deleteGame(id: string): Observable<string> {
        // TODO
    }
}
