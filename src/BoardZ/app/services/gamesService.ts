import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticatedHttp} from './authenticatedHttp';
import {Game} from '../models/game';
import {BaseApiService} from './baseApiService';
import {OfflineStorageService} from './offlineStorageService';
import {OfflineDetectionService} from './offlineDetectionService';

@Injectable()
export class GamesService extends BaseApiService<Game> {
    constructor(http: AuthenticatedHttp, offlineStorageService: OfflineStorageService<Game>, offlineDetectionService: OfflineDetectionService) {
        super(http, offlineStorageService, offlineDetectionService);
        super.initializeEntity(Game);
    }

    public getAllGames(): Observable<Game[]> {
        return this.getAll('api/games/list');
    }

    public deepClone(game: Game): Game {
        return <Game>JSON.parse(JSON.stringify(game));
    }

    public getGameById(id: string): Observable<Game> {
        return this.getSingle(id, `api/games/single?id=${id}`);
    }

    public addGame(game: Game): Observable<string> {
        return this.add(game, `api/games/add`);
    }

    public updateGame(game: Game): Observable<boolean> {
        return this.update(game, `api/games/update`);
    }

    public deleteGame(game: Game): Observable<boolean> {
        return this.deleteItem(game, `api/games/remove?id=${game.id}`);
    }
}
