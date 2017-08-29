import {Injectable} from '@angular/core';
import {AuthenticatedHttp} from './authenticatedHttp';
import {AgeRating} from '../models/ageRating';
import {OfflineDetectionService} from './offlineDetectionService';
import {BaseApiService} from './baseApiService';
import {Observable} from 'rxjs/Rx';
import {DatabaseService} from './databaseService';

@Injectable()
export class AgeRatingsService extends BaseApiService<AgeRating> {

    constructor(http: AuthenticatedHttp,
                offlineDetectionService: OfflineDetectionService,
                private _databaseService: DatabaseService) {
        super(http, offlineDetectionService);
        super.initializeEntity(AgeRating);
    }

    public getAllAgeRatings(): Observable<Array<AgeRating>> {
        return this.getAll('api/ageratings/list',
            this._databaseService.ageRatings,
            Observable.fromPromise(this._databaseService.ageRatings.toArray()), true);
    }

    public getOfflineAgeRatings(): Observable<Array<AgeRating>>{
        return Observable.fromPromise(this._databaseService.ageRatings.toArray());
    }
}
