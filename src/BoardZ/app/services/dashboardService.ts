import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticatedHttp} from './authenticatedHttp';

@Injectable()
export class DashboardService {
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
