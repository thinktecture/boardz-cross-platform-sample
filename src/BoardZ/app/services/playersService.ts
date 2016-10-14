import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs';

import {GeoLocation} from '../models/geoLocation';
import {AuthenticatedHttp} from './authenticatedHttp';
import {Player} from '../models/player';
import {NearByPlayer} from '../models/nearbyPlayer';
import {ApiConfig} from '../apiConfig';

@Injectable()
export class PlayersService {
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

    public getAll(): Observable<Player[]> {
        return this._http.get(this.buildUrl('api/players/list')).map(response => (<Player[]>response.json()));
    }

    public getById(id: string): Observable<Player> {
        return this._http.get(this.buildUrl(`api/players/single?id=${id}`)).map(response => <Player>response.json());
    }

    public getPlayerCount(): Observable<number> {
        return this._http.get(this.buildUrl('api/players/playercount')).map(r => <number>r.json());
    }

    public findNearby(radius: number, coordinates: GeoLocation): Observable<NearByPlayer[]> {
        return this._http.get(this.buildUrl(`api/players/FindNearby?radius=${radius}&coordinate.latitude=${coordinates.latitude}&coordinate.longitude=${coordinates.longitude}`))
            .map(r => {
                return <NearByPlayer[]>r.json();
            });
    }

    public add(player: Player): Observable<string> {
        return this._http.post(this.buildUrl(`api/players/add`), JSON.stringify(player), this.getRequestOptions())
            .map(response => <string>response.json());
    }

    public update(player: any): Observable<string> {
        return this._http.put(this.buildUrl(`api/players/update`), JSON.stringify(player), this.getRequestOptions())
            .map(response => player.id);
    }

    public delete(id: string): Observable<string> {
        return this._http.delete(this.buildUrl(`api/players/remove?id=${id}`))
            .map(response => <string>response.text());
    }
}
