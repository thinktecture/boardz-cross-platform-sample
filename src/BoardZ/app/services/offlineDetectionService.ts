import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ApiConfig} from '../apiConfig';
import {ConnectionState} from '../models/connectionState';
import {OfflineConfig} from '../offlineConfig';
import {Observable} from '/rxjs/Observable';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Subject} from 'rxjs/Rx';

@Injectable()
export class OfflineDetectionService {

    private _recentConnectionState: ConnectionState = ConnectionState.Initializing;
    private _monitoringHandle: number;

    constructor(private _http: Http, private _apiConfig: ApiConfig, private _offlineConfig: OfflineConfig) {
        this._recentConnectionState = ConnectionState.Initializing;
    }

    public connectionRestoring: Subject<ConnectionState> = new Subject<ConnectionState>();

    private get pingUrl(): string {
        return `${this._apiConfig.rootUrl}api/status/ping`;
    }

    public get currentConnectionState(): ConnectionState {
        return this._recentConnectionState;
    }

    public get isOnline(): boolean {
        return this._recentConnectionState > ConnectionState.ToSlow || this._recentConnectionState === ConnectionState.Initializing;
    }

    private checkConnection(): Observable<ConnectionState> {
        let start = (new Date()).getTime();
        return this._http.get(this.pingUrl)
            .timeout(this._offlineConfig.absoluteTimeoutAt, Observable.of(this._offlineConfig.absoluteTimeoutAt + 1))
            .map(response => (new Date()).getTime() - start)
            .map(duration => this.getConnectionStateByDuration(duration))
            .catch(() => {
                console.info('=> ConnectionState.Offline (TIMEOUT)');
                return Observable.of(ConnectionState.Offline);
            });
    }

    private getConnectionStateByDuration(duration: number): ConnectionState {
        console.info(`evaluating connection state for ${duration}`);
        if (duration <= this._offlineConfig.maxDurationForGood) {
            console.info('=> ConnectionState.Good');
            return ConnectionState.Good;
        }
        if (duration <= this._offlineConfig.maxDurationForNormal) {
            console.info('=> ConnectionState.Normal');
            return ConnectionState.Normal;
        }
        if (duration <= this._offlineConfig.maxDurationForToSlow) {
            console.info('=> ConnectionState.ToSlow --> handled like offline');
            return ConnectionState.ToSlow;
        }
        // duration is longer than this._offlineConfig.maxDurationForToSlow
        console.info('=> ConnectionState.Offline');
        return ConnectionState.Offline;

    }

    public startConnectionMonitoring(): void {
        this._monitoringHandle = setInterval(() => {
            this.checkConnection().subscribe(state => {
                if (this._recentConnectionState < ConnectionState.Normal && state > ConnectionState.ToSlow) {
                    this.connectionRestoring.next(state);
                }
                this._recentConnectionState = state;
            });
        }, this._offlineConfig.checkInterval);
    }

    public stopConnectionMonitoring(): void {
        if (this._monitoringHandle) {
            clearInterval(this._monitoringHandle);
        }
    }

}
