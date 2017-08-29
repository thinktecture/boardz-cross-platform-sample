import {Injectable} from '@angular/core';
import {DatabaseService} from './databaseService';
import {OfflineDetectionService} from './offlineDetectionService';
import {AuthenticatedHttp} from './authenticatedHttp';
import {Category} from '../models/category';
import {ModelState} from '../models/modelState';
import {Game} from '../models/game';
import {NotificationService} from './notificationService';
import {Notification} from '../models/notification';
import {NotificationType} from '../models/notificationType';

@Injectable()
export class SyncService {

    constructor(private _authenticatedHttp: AuthenticatedHttp,
                private _databaseService: DatabaseService,
                private _offlineDetectionService: OfflineDetectionService,
                private _notificationService: NotificationService) {

        this._offlineDetectionService.connectionRestoring
            .asObservable()
            .subscribe(()=> {
                this.onConnectionRestored()
            });

    }

    /**
     * Will be triggered once the client transitions from offline to any valid online state
     */
    private onConnectionRestored() {
        let categories = this._databaseService
            .categories
            .filter(cat => cat.state !== ModelState.Clean)
            .toArray()
            .then(categories => this.syncCategories(categories));

        let games = this._databaseService
            .games
            .filter(games => games.state !== ModelState.Clean)
            .toArray()
            .then(games => this.syncGames(games));

        Promise.all([categories, games]).then(results => {
            this._notificationService.notify(new Notification("Device is back online and data has been synced", NotificationType.Success));
        });

    }

    /**
     * authenticated http call to sync all local modified categories
     * @param categories
     * @returns {Promise<number>}
     */
    private syncCategories(categories: Array<Category>): Promise<number> {
        return this._authenticatedHttp.post('api/sync/synccategories', JSON.stringify(categories))
            .map(response => response.status)
            .toPromise()
    }

    /**
     * authenticated http call to sync all local modified games
     * @param games
     * @returns {Promise<R>}
     */
    private syncGames(games: Array<Game>): Promise<number> {
        return this._authenticatedHttp.post('api/sync/syncgames', JSON.stringify(games))
            .map(response => response.status)
            .toPromise()

    }
}
