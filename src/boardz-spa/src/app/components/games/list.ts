import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Game} from '../../models/game';
import {GamesService} from '../../services/gamesService';
import {NotificationService} from '../../services/notificationService';

@Component({
    selector: 'app-games-list',
    templateUrl: 'list.html'
})
export class GameListComponent implements OnInit {
    public games: Game[];

    constructor(private _gamesService: GamesService,
                private _router: Router,
                private _route: ActivatedRoute,
                private _notificationService: NotificationService) {
    }

    public openGameDetails(game: Game): void {
        this._router.navigate(['../details', game.id], {relativeTo: this._route});
    }

    public openCreateGame(): void {
        this._router.navigate(['../new'], {relativeTo: this._route});
    }

    public ngOnInit(): void {
        this._gamesService.getAllGames()
            .subscribe(
                (games) => this.games = games,
                (err) => this._notificationService.notifyError('Error while fetching game data')
            );
    }
}
