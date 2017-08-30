import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticatedHttp} from './authenticatedHttp';
import {Game} from '../models/game';
import {BaseApiService} from './baseApiService';
import {OfflineDetectionService} from './offlineDetectionService';
import {DatabaseService} from './databaseService';
import {ModelState} from '../models/modelState';

@Injectable()
export class GamesService extends BaseApiService<Game> {
    constructor(private _databaseService: DatabaseService,
                http: AuthenticatedHttp,
                offlineDetectionService: OfflineDetectionService) {

        super(http, offlineDetectionService);
        super.initializeEntity(Game);
    }

    public getAllGames(): Observable<Game[]> {
        return this.getAll('api/games/list',
            this._databaseService.games,
            Observable.fromPromise(this._databaseService.games.filter(g => g.state !== ModelState.Deleted).toArray()));
    }

    public deepClone(game: Game): Game {
        return <Game>JSON.parse(JSON.stringify(game));
    }

    public getGameById(id: string): Observable<Game> {
        return this.getSingle(id, `api/games/single?id=${id}`,
            Observable.fromPromise(this._databaseService.games.get(id)));
    }

    public addGame(game: Game): Observable<string> {
        return this.add(game, `api/games/add`, this.getAddOfflineFallback(game));
    }

    public updateGame(game: Game): Observable<boolean> {
        return this.update(game, `api/games/update`, this.getUpdateOfflineFallback(game));
    }

    public deleteGame(game: Game): Observable<boolean> {
        return this.deleteItem(game, `api/games/remove?id=${game.id}`, this.getDeleteOfflineFallback(game));
    }

    private getUpdateOfflineFallback(game: Game): Observable<boolean> {
        const copy = this.deepClone(game);
        copy.state = ModelState.Modified;
        return Observable.fromPromise(this._databaseService.games.put(copy).then(() => {
            return true;
        }, () => {
            return false;
        }));
    }

    private getAddOfflineFallback(game: Game): Observable<string> {
        const copy = this.deepClone(game);
        copy.state = ModelState.New;
        copy.id = `-${(new Date()).getTime()}`;
        return Observable.fromPromise(this._databaseService.games.add(copy).then(() => {
            return copy.id;
        }, () => {
            return null;
        }));

    }

    private getDeleteOfflineFallback(game: Game): Observable<boolean> {
        const copy = this.deepClone(game);
        return Observable.fromPromise(this._databaseService.games.update(copy.id, {state: ModelState.Deleted})
            .then(() => {
                return true;
            }, () => {
                return false;
            }));
    }

}
