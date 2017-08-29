import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Game} from '../../models/game';
import {GamesService} from '../../services/gamesService';
import {NotificationService} from '../../services/notificationService';
import {SignalRService} from '../../services/signalrService';
import {PlayersService} from '../../services/playersService';
import {Player} from '../../models/player';
import {GeoLocation} from '../../models/geoLocation';
import {LoginService} from '../../services/loginService';
import {Notification} from '../../models/notification';
import {NotificationType} from '../../models/notificationType';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AgeRating} from '../../models/ageRating';
import {AgeRatingsService} from '../../services/ageRatingsService';
import {Category} from '../../models/category';
import {CategoriesService} from '../../services/categoriesService';
import {OfflineDetectionService} from '../../services/offlineDetectionService';

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
    public active = true;

    public details = this._formBuilder.group({
        id: [null],
        name: ['', Validators.required],
        description: ['', Validators.required]
    });

    public get id(): AbstractControl {
        return this.details.get('id');
    }

    public get name(): AbstractControl {
        return this.details.get('name');
    }

    public selectedCategories: Array<String> = [];
    public get description(): AbstractControl {
        return this.details.get('description');
    }

    constructor(private _router: Router,
                private route: ActivatedRoute,
                private _gameService: GamesService,
                private _notificationService: NotificationService,
                private _categoriesService: CategoriesService,
                private _ageRatingsService: AgeRatingsService,
                private _playersService: PlayersService,
                private _signalRService: SignalRService,
                private _offlineDetectionService: OfflineDetectionService,
                private _loginService: LoginService,
                private _formBuilder: FormBuilder) {
    }

    public ngOnInit(): any {
        this._categoriesService.getAllCategories().subscribe(cats=>this.categories = cats);
        this._ageRatingsService.getOfflineAgeRatings().subscribe((ars)=>{
            this.ageRatings = ars;
        });

        this.route.data.forEach((data: { game: Game }) => {
            if (data.game) {
                this.details.setValue({
                    id: data.game.id,
                    name: data.game.name,
                    description: data.game.description
                });
            }
        });
    }

    private loadGame(id: string): void {
        this._gameService.getById(id)
            .subscribe(
                (game) => {
                    this.details.setValue({
                        id: game.id,
                        name: game.name,
                        description: game.description
                    });
                },
                (error) => {
                    this._logService.logError('Could not find game. Error was: ' + error);
                    this._notificationService.notifyError('Could not load game data.');
                }
            );
    }

    public reset() {
        this.details.reset();
    }

    public abort(): void {
        this._router.navigate(['/games/all']);
    }


    public saveChanges(): void {

        this.model.categories = this.categories.filter(cat => this.selectedCategories.indexOf(cat.id) > -1);

        if (this.model.ageRatingId) {
            let found = this.ageRatings.filter(ar=>ar.id === this.model.ageRatingId);
            if (found && found.length > 0) {
                this.model.ageRating = found[0];
            }

        }
        if (this.details.value.id === null) {
            this._gameService.addGame(this.details.value)
                .subscribe(
                    (newId) => {
                        this._notificationService.notifySuccess('New game was added.');
                        this.loadGame(newId);
                        this.model.id = this.originalModel.id = newId;
                    },
                    () => this._notificationService.notifyError('Could not save new game.')
                );
        } else {
            this._gameService.updateGame(this.details.value)
                .subscribe((oldId) => {
                        this._notificationService.notifySuccess('Game data was updated.');
                        this.loadGame(oldId);
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

    public get isOnline(): boolean{
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
        this._signalRService.sendIAmGaming(this.details.value.name);

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
