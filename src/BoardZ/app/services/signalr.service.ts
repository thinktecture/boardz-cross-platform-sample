import {Injectable, EventEmitter} from 'angular2/core';
import {Configuration} from '../app-config';
import {Logger} from './log.service';
import {TokenDataStore} from './token.service';

// jQuery Ahoi
declare var $;

@Injectable()
export class SignalRService {
    private _hubConnection;
    private _connection;
    private _playerProxy;

    public someoneJoinedAGame: EventEmitter<string> = new EventEmitter<string>();

    // TODO: Inject LoginService here. Currently leads to an exception since Angular can not resolve it?
    constructor(private _configuration: Configuration,
                private _tokenDataStore: TokenDataStore,
                private _logger: Logger) {
        this._hubConnection = $.hubConnection;
    }

    public sendIAmGaming(game: string): void {
        if (!this._connection) {
            return;
        }

        this._playerProxy.invoke('iAmPlaying', game);
    }

    public start(): void {
        if (this._connection || !this._tokenDataStore.token) {
            return;
        }

        this._connection = this._hubConnection(`${this._configuration.apiEndpoint}signalr`);
        this._connection.qs = { 'authorization': this._tokenDataStore.token };
        this._playerProxy = this._connection.createHubProxy('playerHub');

        this._playerProxy.on('someoneStartedPlaying', (username, game) => {
            var msg = `${username} started playing ${game}.`;
            this._logger.logDebug(`Received SignalR message: ${msg}`);
            this.someoneJoinedAGame.emit(msg);
        });

        this._connection.start()
            .done(() => this._logger.logDebug('SignalR connection established.'))
            .fail(() => this._logger.logError('SignalR connection not established.'));
    }

    public stop(): void {
        if (this._connection) {
            this._connection.stop();
        }

        this._connection = undefined;
        this._playerProxy = undefined;
    }
}
