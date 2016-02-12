import {Component, OnInit} from 'angular2/core';
import {FORM_PROVIDERS} from 'angular2/common';
import {RouteParams, Router, CanActivate} from 'angular2/router';
import {assertionsEnabled} from 'angular2/src/facade/lang';

import {Game, GamesService} from '../../services/games/gamesService';
import {Logger} from '../../services/logging/logger';
import {NeedsAuthentication} from '../../decorators/needsAuthentication';

@Component({
    selector: 'gameDetail',
    templateUrl: 'app/components/games/gameDetails.html',
    styleUrls: ['app/components/common/formStyles.css'],
    providers: [FORM_PROVIDERS],
    inputs: ['game']
})
@NeedsAuthentication()
export class GameDetails implements OnInit {

    private _needsReset: boolean = false;

    public diagnosticEnabled: boolean;
    public active = true;
    public model: Game = new Game();
    public originalModel: Game = new Game();

    get diagnostic() { return JSON.stringify(this.model); }
    get originalDiagnostic() { return JSON.stringify(this.originalModel); }

    constructor(private _logger: Logger, private _gameService: GamesService, private _router: Router, private _routeParams: RouteParams) {
        this.diagnosticEnabled = assertionsEnabled();
    }

    ngOnInit(): void {
        let id = this._routeParams.get('id');

        if (id === 'new') {
            this.originalModel = this.deepClone(this.model = new Game());
        } else {
            this.loadGame(id);
        }
    }

    loadGame(id: string): void {
        this._gameService.getGame(id)
            .then(game => {
                this.originalModel = this.deepClone(this.model = game);
                if (this._needsReset) this.reset();
            })
            .catch(error => this._logger.logError('Could not find game. Error was: ' + error));
    }

    deepClone<T>(obj: T): T {
        return <T>JSON.parse(JSON.stringify(obj));
    }

    abort(): void {
        this._router.navigate(['GameList']);
    }

    reset(): void {
        this._needsReset = false;

        // Based on: https://angular.io/docs/ts/latest/guide/forms.html
        this.model = this.deepClone(this.originalModel);

        // workaround to re-initialize the actual form controls states
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    saveChanges(): void {
        if (this.model.id === null) {
            this._gameService.addGame(this.model)
                .then(newId => { this._needsReset = true; this.loadGame(newId); });
        } else {
            this._gameService.updateGame(this.model)
                .then(oldId => { this._needsReset = true; this.loadGame(oldId); });
        }
    }

    deleteGame(): void {
        if (window.confirm('Really delete the game "' + this.originalModel.name + '" ?')) {
            this._gameService.deleteGame(this.originalModel.id);
            this.abort();
        }
    }
}
