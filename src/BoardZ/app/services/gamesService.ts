import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticatedHttp} from './authenticatedHttp';
import {Game} from '../models/game';
import {BaseApiService} from './baseApiService';
import {OfflineDetectionService} from './offlineDetectionService';
import {DatabaseService} from './databaseService';

@Injectable()
export class GamesService extends BaseApiService<Game> {
    constructor(private _databaseService: DatabaseService,
                http: AuthenticatedHttp,
                offlineDetectionService: OfflineDetectionService) {

        super(http, _databaseService, offlineDetectionService);
        super.initializeEntity(Game);

    }

    public getAllGames(): Observable<Game[]> {
        return this.getAll('api/games/list', null);
    }

    public deepClone(game: Game): Game {
        return <Game>JSON.parse(JSON.stringify(game));
    }

    public getGameById(id: string): Observable<Game> {
        return this.getSingle(id, `api/games/single?id=${id}`, null);
    }

    public addGame(game: Game): Observable<string> {
        return this.add(game, `api/games/add`, null);
    }

    public updateGame(game: Game): Observable<boolean> {
        return this.update(game, `api/games/update`, null);
    }

    public deleteGame(game: Game): Observable<boolean> {
        return this.deleteItem(game, `api/games/remove?id=${game.id}`, null);
    }

}
