import {Injectable} from '@angular/core';
import {AuthenticatedHttp} from './http.service';
import {AgeRating} from '../models/ageRating';
import {OfflineDetectionService} from './offline/offline.detection.service';
import {BaseApiService} from './infrastructure/base.api.service';
import {Observable} from 'rxjs/Rx';
import {DatabaseService} from './offline/database.service';

@Injectable()
export class AgeRatingsService extends BaseApiService<AgeRating> {

    constructor(http: AuthenticatedHttp,
                offlineDetectionService: OfflineDetectionService,
                private _databaseService: DatabaseService) {
        super(http, offlineDetectionService);
        super.initializeEntity(AgeRating);
    }

    public getAllAgeRatings(): Observable<Array<AgeRating>> {
        return this.getAll('api/ageratings',
            this._databaseService.ageRatings,
            Observable.fromPromise(this._databaseService.ageRatings.toArray()), true);
    }

    public getOfflineAgeRatings(): Observable<Array<AgeRating>> {
        return Observable.fromPromise(this._databaseService.ageRatings.toArray());
    }
}
