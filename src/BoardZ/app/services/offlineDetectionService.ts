import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ApiConfig} from '../apiConfig';
import {ConnectionState} from '../models/connectionState';
import {OfflineConfig} from '../offlineConfig';

@Injectable()
export class OfflineDetectionService {

    private _recentConnectionState: ConnectionState = ConnectionState.Unknown;
    private _monitoringHandle: number;

    constructor(private _http: Http, private _apiConfig: ApiConfig, private _offlineConfig: OfflineConfig) {
        setTimeout(()=> {
            this._recentConnectionState = ConnectionState.Normal;
            setTimeout(()=> {
                this._recentConnectionState = ConnectionState.ToSlow;
            }, 3000);
        }, 5000);
    }

    private get pingUrl(): string {
        return `${this._apiConfig.rootUrl}api/status/ping`;
    }

    public get currentConnectionState(): ConnectionState {
        return this._recentConnectionState;
    }

    public get isOnline(): boolean {
        return this._recentConnectionState > ConnectionState.ToSlow;
    }

    public startConnectionMonitoring(): void {
        this._monitoringHandle = setInterval(()=> {

        }, this._offlineConfig.checkInterval);
    }

    public stopConnectionMonitoring(): void {
        if (this._monitoringHandle) {
            clearInterval(this._monitoringHandle);
        }
    }

}
