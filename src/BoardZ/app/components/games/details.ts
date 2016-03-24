import {Component, OnInit, Injector} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import {NeedsAuthentication} from '../../decorators/needsAuthentication';
import {LocateItComponent} from '../locateit/locateit';
import {PictureItComponent} from '../pictureIt/pictureIt';
import {Game} from '../../models/game';
import {LogService} from '../../services/logService';
import {GamesService} from '../../services/gamesService';
import {NotificationService} from '../../services/notificationService';
import {SignalRService} from '../../services/signalrService';
import {PlayersService} from '../../services/playersService';
import {Player} from '../../models/player';
import {GeoLocation} from '../../models/geoLocation';
import {LoginService} from '../../services/loginService';
import {Notification} from '../../models/notification';
import {NotificationType} from '../../models/notificationType';

@Component({
    selector: 'gameDetail',
    directives: [LocateItComponent, PictureItComponent],
    templateUrl: 'app/components/games/details.html',
    inputs: ['game']
})
@NeedsAuthentication()
export class GameDetailsComponent implements OnInit {
    private _needsReset: boolean;
    private _pictureUrl: string = "";
    private _coordinates: GeoLocation = null;
    private _sending: boolean;

    public active = true;
    public model: Game = new Game();
    public originalModel: Game = new Game();

    constructor(private _logService: LogService,
                private _gameService: GamesService,
                private _router: Router,
                private _routeParams: RouteParams,
                private _notificationService: NotificationService,
                private _playersService: PlayersService,
                private _signalRService: SignalRService,
                private _loginService: LoginService) {
    }

    ngOnInit(): void {
        let id = this._routeParams.get('id');

        if (!id) {
            this.originalModel = this._gameService.deepClone(this.model = new Game());
            return;
        }
        this.loadGame(id);
    }

    private loadGame(id: string): void {
        this._gameService.getById(id)
            .subscribe(
                (game) => {
                    this.originalModel = this._gameService.deepClone(this.model = game);
                    if (this._needsReset) this.reset();
                },
                (error) => {
                    this._logService.logError('Could not find game. Error was: ' + error);
                    this._notificationService.notifyError('Could not load game data.');
                }
            );
    }

    public abort(): void {
        this._router.navigate(['GameList']);
    }

    public reset(): void {
        this._needsReset = false;
    
        // Based on: https://angular.io/docs/ts/latest/guide/forms.html
        this.model = this._gameService.deepClone(this.originalModel);
    
        // workaround to re-initialize the actual form controls states
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    public saveChanges(): void {
        if (this.model.id === null) {
            this._gameService.addGame(this.model)
                .subscribe(
                    (newId) => {
                        this._notificationService.notifySuccess('New game was added.')
                        this._needsReset = true;
                        this.loadGame(newId);
                    },
                    ()=> this._notificationService.notifyError('Could not save new game.')
                );
        } else {
            this._gameService.updateGame(this.model)
                .subscribe((oldId) => {
                        this._notificationService.notifySuccess('Game data was updated.')
                        this._needsReset = true;
                        this.loadGame(oldId);
                    },
                    () => {
                        this._notificationService.notifyError('Could not update game data.')
                    }
                );
        }
    }

    public deleteGame(): void {
        if (window.confirm('Really delete the game "' + this.originalModel.name + '" ?')) {
            this._gameService.deleteGame(this.originalModel.id)
                .subscribe(
                    () => {
                        this._notificationService.notifySuccess('Game data was deleted.');
                        this.abort();
                    },
                    () => this._notificationService.notifyError('Could not delete game data.')
                );
        }
    }

    public useLocation(coordinates: GeoLocation) {
        this._coordinates = coordinates;
    }

    public usePicture(pictureUrl: string) {
        this._pictureUrl = pictureUrl;
    }

    public canPlay() {
        return this._coordinates && this._pictureUrl;
    }

    public iAmPlaying(): void {
        if (!this.canPlay()) {
            return;
        }

        this._sending = true;
        this._signalRService.sendIAmGaming(this.model.name);

        var player = new Player();
        player.name = this._loginService.username;
        player.boardGameId = this.model.id;
        player.coordinate = this._coordinates;
        player.imageUrl = this._pictureUrl;

        this._playersService.add(player)
            .subscribe(()=> {
                    this._notificationService.notify(new Notification(`Thanks for sharing, ${player.name}`, NotificationType.Success));

                },
                ()=> console.log('error while uploading'),
                ()=> this._sending = false
            );
    }
}
