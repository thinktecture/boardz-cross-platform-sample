import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticatedHttp} from './authenticatedHttp';
import {DatabaseService} from './databaseService';
import {OfflineDetectionService} from './offlineDetectionService';
import {ModelState} from '../models/modelState';

@Injectable()
export class DashboardService {
    constructor(private _http: AuthenticatedHttp,
                private _databaseService: DatabaseService,
                private _offlineDetectionService: OfflineDetectionService) {
    }

    public getGameCount(): Observable<number> {
        return Observable.if(()=> {
                return this._offlineDetectionService.isOnline
            },
            this._http.get('api/games/count').map(response => (<number>response.text())),
            Observable.fromPromise(this._databaseService.games.filter(g=>g.state !== ModelState.Deleted).count()));
    }

    public getPlayerCount(): Observable<number> {
        return Observable.if(()=> {
                return this._offlineDetectionService.isOnline
            },
            this._http.get('api/players/count').map(response => (<number>response.text())),
            Observable.of(0));
    }

    public getCategoryCount(): Observable<number> {
        return Observable.if(()=> {
                return this._offlineDetectionService.isOnline
            },
            this._http.get('api/categories/count').map(response => (<number>response.text())),
            Observable.fromPromise(this._databaseService.categories.filter(c=>c.state !== ModelState.Deleted).count()));
    }

}
