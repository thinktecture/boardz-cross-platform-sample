import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router-deprecated';

import {Game} from '../../models/game';
import {GamesService} from '../../services/gamesService';
import {NotificationService} from '../../services/notificationService';
import {NeedsAuthentication} from '../../decorators/needsAuthentication';

@NeedsAuthentication()
@Component({
    moduleId: __moduleName,
    selector: 'game-list',
    templateUrl: 'list.html'
})

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
