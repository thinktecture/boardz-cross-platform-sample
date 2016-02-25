import {Component, OnInit, Injector} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';
import {NeedsAuthentication} from '../../decorators/needsAuthentication';
import {DiagnosticComponent} from '../diagnostic/diagnostic';
import {LocateItComponent} from '../locateit/locateit';
import {PictureItComponent} from '../pictureit/pictureit';
import {Game} from '../../models/game';
import {LogService} from '../../services/log.service';
import {GamesService} from '../../services/games.service';
import {NotificationService} from '../../services/notification.service';
import {SignalRService} from '../../services/signalr.service';

@Component({
    selector: 'gameDetail',
    directives: [DiagnosticComponent, LocateItComponent, PictureItComponent],
    templateUrl: 'app/components/games/details.html',
    inputs: ['game']
})
@NeedsAuthentication()
export class GameDetails implements OnInit {

    private _needsReset: boolean;
    private _diagnosticEnabled: boolean;

    public active = true;
    public model: Game = new Game();
    public originalModel: Game = new Game();

    constructor(private _logService: LogService,
                private _gameService: GamesService,
                private _router: Router,
                private _routeParams: RouteParams,
                private _notificationService: NotificationService,
                private _signalRService: SignalRService,
                private _injector: Injector) {
        this._diagnosticEnabled = _injector.get('inDiagnosticsMode');
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

    public iAmPlaying(): void {
        this._signalRService.sendIAmGaming(this.model.name);
        // TODO: Implement the whole method. ;-)
    }
}
