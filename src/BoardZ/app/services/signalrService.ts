import {Injectable, EventEmitter} from '@angular/core';
import {AppConfiguration} from '../appConfig';
import {LogService} from './logService';
import {TokenService} from './tokenService';

// jQuery Ahoi
declare var $;

@Injectable()
export class SignalRService {
    private _hubConnection;
    private _connection;
    private _playerProxy;

    public someoneJoinedAGame: EventEmitter<string> = new EventEmitter<string>();

    constructor(private _configuration: AppConfiguration,
                private _tokenService: TokenService,
                private _logService: LogService) {
        this._hubConnection = $.hubConnection;
    }

    public sendIAmGaming(game: string): void {
        if (!this._connection) {
            return;
        }

        this._playerProxy.invoke('iAmPlaying', game);
    }

    public start(): void {
        if (this._connection || !this._tokenService.token) {
            return;
        }

        this._connection = this._hubConnection(`${this._configuration.apiEndpoint}signalr`);
        this._connection.qs = { 'authorization': this._tokenService.token };
        this._playerProxy = this._connection.createHubProxy('playerHub');

        this._playerProxy.on('someoneStartedPlaying', (username, game) => {
            var msg = `${username} started playing ${game}.`;
            this._logService.logDebug(`Received SignalR message: ${msg}`);
            this.someoneJoinedAGame.emit(msg);
        });

        this._connection.start()
            .done(() => this._logService.logDebug('SignalR connection established.'))
            .fail(() => this._logService.logError('SignalR connection not established.'));
    }

    public stop(): void {
        if (this._connection) {
            this._connection.stop();
        }

        this._connection = undefined;
        this._playerProxy = undefined;
    }
}
