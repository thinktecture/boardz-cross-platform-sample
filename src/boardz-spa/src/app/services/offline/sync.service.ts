import {Injectable} from '@angular/core';
import {DatabaseService} from './database.service';
import {OfflineDetectionService} from './offline.detection.service';
import {AuthenticatedHttp} from '../http.service';
import {Category} from '../../models/category';
import {ModelState} from '../../models/modelState';
import {Game} from '../../models/game';
import {NotificationService} from '../notifications/notification.service';
import {Notification} from '../../models/notification';
import {NotificationType} from '../../models/notificationType';

@Injectable()
export class SyncService {

    constructor(private _authenticatedHttp: AuthenticatedHttp,
                private _databaseService: DatabaseService,
                private _offlineDetectionService: OfflineDetectionService,
                private _notificationService: NotificationService) {

        this._offlineDetectionService.connectionRestoring
            .asObservable()
            .subscribe(() => {
                this.onConnectionRestored();
            });

    }

    /**
     * Will be triggered once the client transitions from offline to any valid online state
     */
    private onConnectionRestored() {
        const categories = this._databaseService
            .categories
            .filter(category => category.state !== ModelState.Clean)
            .toArray()
            .then(dirtyCategories => this.syncCategories(dirtyCategories));

        const games = this._databaseService
            .games
            .filter(game => game.state !== ModelState.Clean)
            .toArray()
            .then(dirtyGames => this.syncGames(dirtyGames));

        Promise.all([categories, games]).then(results => {
            this._notificationService.notify(
                new Notification('Device is back online and data has been synced', NotificationType.Success));
        });

    }

    /**
     * authenticated http call to sync all local modified categories
     * @param categories
     * @returns {Promise<number>}
     */
    private syncCategories(categories: Array<Category>): Promise<number> {
        return this._authenticatedHttp.post('api/sync/categories', JSON.stringify(categories))
            .map(response => response.status)
            .toPromise();
    }

    /**
     * authenticated http call to sync all local modified games
     * @param games
     * @returns {Promise<R>}
     */
    private syncGames(games: Array<Game>): Promise<number> {
        return this._authenticatedHttp.post('api/sync/games', JSON.stringify(games))
            .map(response => response.status)
            .toPromise();

    }
}
