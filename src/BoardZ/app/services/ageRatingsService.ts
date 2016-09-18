import {Injectable} from '@angular/core';
import {AuthenticatedHttp} from './authenticatedHttp';
import {AgeRating} from '../models/ageRating';
import {OfflineStorageService} from './offlineStorageService';
import {OfflineDetectionService} from './offlineDetectionService';
import {BaseApiService} from './baseApiService';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AgeRatingsService extends BaseApiService<AgeRating> {

    constructor(http: AuthenticatedHttp, offlineStorageService: OfflineStorageService<AgeRating>, offlineDetectionService: OfflineDetectionService) {
        super(http, offlineStorageService, offlineDetectionService);
        super.initializeEntity(AgeRating);
    }

    public initialize(): void {
        this.getAllAgeRatings()
            .subscribe(() => {
            });
    }

    public getAllAgeRatings(): Observable<Array<AgeRating>> {
        return this.getAll('api/ageratings/list');
    }
}
