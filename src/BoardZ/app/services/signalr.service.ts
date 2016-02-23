import {Injectable, EventEmitter} from 'angular2/core';
import {Configuration} from '../app-config';
import {TokenDataStore} from './token.service';
import {NotificationService} from './notification.service';

// jQuery Ahoi
declare var $;

@Injectable()
export class SignalRService {
    private _hubConnection;
    private _connection;
    private _playerProxy;

    public someoneJoinedAGame: EventEmitter<string> = new EventEmitter<string>();

    constructor(private _configuration: Configuration,
                private _notifiationService: NotificationService,
                private _tokenDataStore: TokenDataStore) {
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
            this.someoneJoinedAGame.emit(msg);
        });

        this._connection.start()
            .fail(() => {
                this._notifiationService.notifyError('Error establishing real-time connection to server.');
                this.stop();
            });
    }

    public stop(): void {
        if (this._connection) {
            this._connection.stop();
        }

        this._connection = undefined;
        this._playerProxy = undefined;
    }
}
