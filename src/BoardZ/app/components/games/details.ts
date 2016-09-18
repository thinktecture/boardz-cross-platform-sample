import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
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
import {AgeRating} from '../../models/ageRating';
import {AgeRatingsService} from '../../services/ageRatingsService';
import {Category} from '../../models/category';
import {CategoriesService} from '../../services/categoriesService';

@Component({
    moduleId: module.id,
    selector: 'gameDetail',
    templateUrl: 'details.html'
})
export class GameDetailsComponent implements OnInit {

    private _needsReset: boolean;
    private _pictureUrl: string = '';
    private _coordinates: GeoLocation = null;
    private _sending: boolean;
    public ageRatings: Array<AgeRating>;
    public categories: Array<Category>;
    public active = true;
    public model: Game = new Game();
    public originalModel: Game = new Game();
    public selectedCategories: Array<String> = [];

    constructor(private _logService: LogService,
                private _gameService: GamesService,
                private _router: Router,
                private route: ActivatedRoute,
                private _notificationService: NotificationService,
                private _categoriesService: CategoriesService,
                private _ageRatingsService: AgeRatingsService,
                private _playersService: PlayersService,
                private _signalRService: SignalRService,
                private _loginService: LoginService) {
    }

    public ngOnInit(): any {
        this._categoriesService.getAllCategories().subscribe(cats=>this.categories = cats);
        this._ageRatingsService.getAllAgeRatings().subscribe(ars=>this.ageRatings = ars);

        this.route.data.forEach((data: { game: Game }) => {
            this.originalModel = this._gameService.deepClone(this.model = data.game || new Game());
            this.selectedCategories = this.originalModel.categories.map(c=>c.id);
            if (this._needsReset) {
                this.reset();
            }
        });
    }

    public abort(): void {
        this._router.navigate(['/games/all']);
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

        this.model.categories = this.categories.filter(cat => this.selectedCategories.indexOf(cat.id) > -1);

        if (this.model.ageRatingId) {
            let found = this.ageRatings.filter(ar=>ar.id === this.model.ageRatingId);
            if (found && found.length > 0) {
                this.model.ageRating = found[0];
            }

        }
        if (this.model.id === null) {
            this._gameService.addGame(this.model)
                .subscribe(
                    (newId) => {
                        this._notificationService.notifySuccess('New game was added.');
                        this._needsReset = true;
                        this.model.id = this.originalModel.id = newId;
                    },
                    () => this._notificationService.notifyError('Could not save new game.')
                );
        } else {
            this._gameService.updateGame(this.model)
                .subscribe(() => {
                        this._notificationService.notifySuccess('Game data was updated.');
                        this._needsReset = true;
                    },
                    () => {
                        this._notificationService.notifyError('Could not update game data.');
                    }
                );
        }
    }

    public deleteGame(): void {
        if (window.confirm('Really delete the game "' + this.originalModel.name + '" ?')) {
            this._gameService.deleteGame(this.originalModel)
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

        let player = new Player();
        player.name = this._loginService.username;
        player.gameId = this.model.id;
        player.coordinate = this._coordinates;
        player.imageUrl = this._pictureUrl;

        this._playersService.add(player)
            .subscribe(() => {
                    this._notificationService.notify(new Notification(`Thanks for sharing, ${player.name}`, NotificationType.Success));

                },
                () => console.log('error while uploading'),
                () => this._sending = false
            );
    }
}
