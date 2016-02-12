import {Component, OnInit} from 'angular2/core';
import {ControlContainer, FORM_PROVIDERS} from 'angular2/common';
import {RouteParams, Router} from 'angular2/router';

import {Game, GamesService} from '../../services/games/gamesService';
import {Logger} from '../../services/logging/logger';

@Component({
    selector: 'gameDetail',
    templateUrl: 'app/components/games/gameDetails.html',
    styleUrls: ['app/components/common/formStyles.css'],
    providers: [FORM_PROVIDERS],
    inputs: ['game']
})
export class GameDetails implements OnInit {

    public active = true;
    public model: Game = new Game();
    public originalModel: Game = new Game();

    get diagnostic() { return JSON.stringify(this.model); }
    get originalDiagnostic() { return JSON.stringify(this.originalModel); }

    constructor(private _logger: Logger, private _gameService: GamesService, private _router: Router, private _routeParams: RouteParams) {}

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
            .then(game => this.originalModel = this.deepClone(this.model = game))
            .catch(error => this._logger.logError('Could not find game. Error was: ' + error));
    }

    deepClone<T>(obj: T): T {
        return <T>JSON.parse(JSON.stringify(obj));
    }

    abort(): void {
        this._router.navigate(['GameList']);
    }

    reset(): void {
        // Based on: https://angular.io/docs/ts/latest/guide/forms.html
        this.model = this.deepClone(this.originalModel);

        // workaround to re-initialize the actual form controls states
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    saveGame(): void {
        this._gameService.saveOrUpdateGame(this.model)
            ; // .then(id => this.loadGame(id));
    }
}
