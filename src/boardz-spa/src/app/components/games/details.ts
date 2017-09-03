import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Game} from '../../models/game';
import {GamesService} from '../../services/games.service';
import {NotificationService} from '../../services/notifications/notification.service';
import {PlayersService} from '../../services/players.service';
import {Player} from '../../models/player';
import {GeoLocation} from '../../models/geoLocation';
import {LoginService} from '../../services/authentication.service';
import {Notification} from '../../models/notification';
import {NotificationType} from '../../models/notificationType';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AgeRating} from '../../models/ageRating';
import {AgeRatingsService} from '../../services/ageratings.service';
import {Category} from '../../models/category';
import {CategoriesService} from '../../services/categories.service';
import {OfflineDetectionService} from '../../services/offline/offline.detection.service';
import {LogService} from '../../services/infrastructure/log.service';

@Component({
    selector: 'app-games-details',
    templateUrl: 'details.html'
})
export class GameDetailsComponent implements OnInit {

    private _pictureUrl = '';
    private _coordinates: GeoLocation = null;
    public isSending: boolean;
    public ageRatings: Array<AgeRating>;
    public categories: Array<Category>;

    public details = this._formBuilder.group({
        id: [null],
        name: ['', Validators.required],
        description: ['', Validators.required],
        categories: [[]],
        ageRatingId: [''],
        ageRating: [{}]
    });

    public get id(): AbstractControl {
        return this.details.get('id');
    }

    public get name(): AbstractControl {
        return this.details.get('name');
    }

    public get description(): AbstractControl {
        return this.details.get('description');
    }

    private _original: Game;

    constructor(private _router: Router,
                private route: ActivatedRoute,
                private _gameService: GamesService,
                private _notificationService: NotificationService,
                private _categoriesService: CategoriesService,
                private _ageRatingsService: AgeRatingsService,
                private _playersService: PlayersService,
                private _offlineDetectionService: OfflineDetectionService,
                private _loginService: LoginService,
                private _logService: LogService,
                private _formBuilder: FormBuilder) {
    }

    public ngOnInit(): any {
        this._categoriesService.getAllCategories().subscribe(cats => this.categories = cats);
        this._ageRatingsService.getOfflineAgeRatings().subscribe((ars) => {
            this.ageRatings = ars;
        });

        this.route.data.forEach((data: { game: Game }) => {
            if (data.game) {
                this._original = data.game;
                this.details.setValue({
                    id: data.game.id,
                    name: data.game.name,
                    description: data.game.description,
                    ageRatingId: data.game.ageRatingId,
                    ageRating: data.game.ageRating,
                    categories: data.game.categories.map(c => c.id)
                });
            }
        });
    }

    private loadGame(id: string): void {
        this._gameService.getGameById(id)
            .subscribe(
                (game) => {
                    this.details.setValue({
                        id: game.id,
                        name: game.name,
                        description: game.description,
                        categories: game.categories,
                        ageRatingId: game.ageRatingId,
                        ageRating: game.ageRating
                    });
                },
                (error) => {
                    this._logService.logError('Could not find game. Error was: ' + error);
                    this._notificationService.notifyError('Could not load game data.');
                }
            );
    }

    public reset() {
        // todo: apply values from this.original;
        this.details.reset();
    }

    public abort(): void {
        this._router.navigate(['/games/all']);
    }


    public saveChanges(): void {
        const game = JSON.parse(JSON.stringify(this.details.value));
        game.categories = this.categories.filter(c => this.details.value.categories.indexOf(c.id) > -1);
        if (!game.id) {
            this._gameService.addGame(game)
                .subscribe(
                    (newId) => {
                        this._notificationService.notifySuccess('New game was added.');
                        this.loadGame(newId);
                    },
                    () => this._notificationService.notifyError('Could not save new game.')
                );
        } else {
            this._gameService.updateGame(game)
                .subscribe(() => {
                        this._notificationService.notifySuccess('Game data was updated.');
                    },
                    () => {
                        this._notificationService.notifyError('Could not update game data.');
                    }
                );
        }
    }

    public deleteGame(): void {
        if (window.confirm('Really delete the game "' + this.details.value.name + '" ?')) {
            this._gameService.deleteGame(this.details.value.id)
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

    public get isOnline(): boolean {
        return this._offlineDetectionService.isOnline;
    }

    public canPlay() {
        return this._coordinates && this._pictureUrl;
    }

    public iAmPlaying(): void {
        if (!this.canPlay()) {
            return;
        }

        this.isSending = true;
        const player = new Player();
        player.name = this._loginService.username;
        player.gameId = this.details.value.id;
        player.coordinate = this._coordinates;
        player.imageUrl = this._pictureUrl;

        this._playersService.add(player)
            .subscribe(() => {
                    this._notificationService.notify(new Notification(`Thanks for sharing, ${player.name}`, NotificationType.Success));

                },
                () => console.log('error while uploading'),
                () => this.isSending = false
            );
    }
}
