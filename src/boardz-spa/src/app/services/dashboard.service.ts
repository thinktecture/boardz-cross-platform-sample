import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticatedHttp} from './http.service';
import {DatabaseService} from './offline/database.service';
import {OfflineDetectionService} from './offline/offline.detection.service';
import {ModelState} from '../models/modelState';

@Injectable()
export class DashboardService {
    constructor(private _http: AuthenticatedHttp,
                private _databaseService: DatabaseService,
                private _offlineDetectionService: OfflineDetectionService) {
    }

    public getGameCount(): Observable<string> {
        return Observable.if(() => {
                return this._offlineDetectionService.isOnline;
            },
            this._http.get('api/games/count').map(response => (response.text())).catch(() => Observable.of('-')),
            Observable.fromPromise(this._databaseService.games.filter(g => g.state !== ModelState.Deleted).count()));
    }

    public getPlayerCount(): Observable<string> {
        return Observable.if(() => {
                return this._offlineDetectionService.isOnline;
            },
            this._http.get('api/players/count').map(response => (response.text())).catch(() => Observable.of('-')),
            Observable.of(0));
    }

    public getCategoryCount(): Observable<string> {
        return Observable.if(() => {
                return this._offlineDetectionService.isOnline;
            },
            this._http.get('api/categories/count').map(response => (response.text())).catch(() => Observable.of('-')),
            Observable
                .fromPromise(this._databaseService.categories.filter(c => c.state !== ModelState.Deleted).count()));
    }

}
