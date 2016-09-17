import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {AuthenticatedHttp} from './authenticatedHttp';
import {AgeRating} from '../models/ageRating';

@Injectable()
export class AgeRatingsService {

    constructor(private _http: AuthenticatedHttp) {
    }

    private get _storageKey(): string {
        return '_AGE_RATINGS';
    }

    private getRequestOptions() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Accept', 'text/plain');
        headers.append('Accept', '*/*');
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        return { headers: headers };
    }

    public initialize(): void {
        this._http.get('api/ageratings/list')
            .map(response => (<AgeRating[]>response.json()))
            .subscribe((ratings) => this.store(ratings));
    }

    private store(ageRatings: Array<AgeRating>) {
        localStorage.setItem(this._storageKey, JSON.stringify(ageRatings));
    }

    public getAll(): void {
        return JSON.parse(localStorage.getItem(this._storageKey) || '[]');
    }
}
