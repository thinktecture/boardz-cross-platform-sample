import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticatedHttp} from './http.service';
import {Game} from '../models/game';
import {BaseApiService} from './infrastructure/base.api.service';
import {OfflineDetectionService} from './offline/offline.detection.service';
import {DatabaseService} from './offline/database.service';
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
        return this.getAll('api/games',
            this._databaseService.games,
            Observable.fromPromise(this._databaseService.games.filter(g => g.state !== ModelState.Deleted).toArray()));
    }

    public deepClone(game: Game): Game {
        return <Game>JSON.parse(JSON.stringify(game));
    }

    public getGameById(id: string): Observable<Game> {
        return this.getSingle(id, `api/games/${id}`,
            Observable.fromPromise(this._databaseService.games.get(id)));
    }

    public addGame(game: Game): Observable<string> {
        return this.add(game, `api/games`, this.getAddOfflineFallback(game));
    }

    public updateGame(game: Game): Observable<boolean> {
        return this.update(game, `api/games/${game.id}`, this.getUpdateOfflineFallback(game));
    }

    public deleteGame(game: Game): Observable<boolean> {
        return this.deleteItem(game, `api/games/${game.id}`, this.getDeleteOfflineFallback(game));
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
