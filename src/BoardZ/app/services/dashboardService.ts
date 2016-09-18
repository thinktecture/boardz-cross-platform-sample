import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticatedHttp} from './authenticatedHttp';

@Injectable()
export class DashboardService {
    constructor(private _http: AuthenticatedHttp) {
    }

    public getGameCount(): Observable<number> {
        return this._http.get('api/games/count').map(response => (<number>response.text()));
    }

    public getPlayerCount(): Observable<number> {
        return this._http.get('api/players/count').map(response => (<number>response.text()));
    }

    public getCategoryCount(): Observable<number> {
        return this._http.get('api/categories/count').map(response => (<number>response.text()));
    }

}
