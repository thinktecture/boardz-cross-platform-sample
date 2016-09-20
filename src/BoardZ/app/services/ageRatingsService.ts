import {Injectable} from '@angular/core';
import {AuthenticatedHttp} from './authenticatedHttp';
import {AgeRating} from '../models/ageRating';
import {OfflineDetectionService} from './offlineDetectionService';
import {BaseApiService} from './baseApiService';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AgeRatingsService extends BaseApiService<AgeRating> {

    constructor(http: AuthenticatedHttp, offlineDetectionService: OfflineDetectionService) {
        super(http, offlineDetectionService);
        super.initializeEntity(AgeRating);
    }

    public initialize(): void {
        this.getAllAgeRatings()
            .subscribe(() => {
                //todo: store those 
            });
    }

    public getAllAgeRatings(): Observable<Array<AgeRating>> {
        return this.getAll('api/ageratings/list', null);
    }
}
