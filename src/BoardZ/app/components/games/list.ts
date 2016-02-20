import {Component, OnInit} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Game, GamesService} from '../../services/games/gamesService';
import {NeedsAuthentication} from '../../decorators/needsAuthentication';
import {NotificationService} from '../../services/notifications/notificationService';

@Component({
    selector: 'gamelist',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/games/list.html'
})
@NeedsAuthentication()
export class GameList implements OnInit {

    public games: Game[];

    constructor(private _gamesService: GamesService, private _router: Router, private _notificationService: NotificationService) {
    }
    
    gotoDetails(game: Game): void {
        this._router.navigate(['GameDetails', { id: game.id }])
    }

    ngOnInit() {
        this._gamesService.getGames()
            .then(games => this.games = games)
            .catch(error => this._notificationService.notifyError('Error while fetching games data.'));
    }
}