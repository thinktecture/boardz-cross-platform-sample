import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {NeedsAuthentication} from '../../decorators/needsAuthentication';
import {Game} from '../../models/game';
import {GamesService} from '../../services/gamesService';
import {NotificationService} from '../../services/notificationService';

@Component({
    selector: 'gamelist',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/games/list.html'
})
@NeedsAuthentication()
export class GameListComponent implements OnInit {
    public games: Game[];

    constructor(private _gamesService: GamesService, 
                private _router: Router, 
                private _notificationService: NotificationService) {
    }

    public openGameDetails(game: Game): void {
        this._router.navigate(['GameDetails', { id: game.id }]);
    }

    public openCreateGame():void{
        this._router.navigate(['CreateGame']);
    }

    ngOnInit() {
        this._gamesService.getAll()
            .subscribe(
                (games)=> this.games = games,
                (err) => this._notificationService.notifyError('Error while fetching game data')
            );
    }
}