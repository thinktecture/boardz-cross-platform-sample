import {Injectable, Type} from '@angular/core';
import {AuthenticatedHttp} from './authenticatedHttp';
import {Observable} from 'rxjs/Rx';
import {OfflineDetectionService} from './offlineDetectionService';
import {OfflineStorageService} from './offlineStorageService';
import {ISupportsOfflineStorage} from '../interfaces/supportsOfflineStorage';

@Injectable()
export class BaseApiService<T extends ISupportsOfflineStorage> {

    private _entityType: Type;
    constructor(private _authenticatedHttp: AuthenticatedHttp,
                private _offlineStorageService: OfflineStorageService<T>,
                private _offlineDetectionService: OfflineDetectionService) {


    }

    public initializeEntity(type: Type){
        this._entityType = type;
    }

    /**
     * return all items of the generic type
     */
    protected getAll(url: string): Observable<Array<T>> {

        let httpObservable: Observable<Array<T>> = this._authenticatedHttp.get(url)
            .map(response => response.json())
            .map(rawJsonResults => rawJsonResults.map(rawJsonResult => (new this._entityType()).fromRawJson(rawJsonResult)));

        let offlineObservable: Observable<Array<T>> = Observable.fromPromise(this._offlineStorageService.getAll());
        return Observable.if(()=> {
            return this._offlineDetectionService.isOnline;
        }, httpObservable, offlineObservable);
    }

    /**
     * return either an item by it's identifier or null
     * @param id
     */
    protected getSingle(id: string, url: string): Observable<T> {
        let httpObservable = this._authenticatedHttp.get(url)
            .map(response => response.json())
            .map(rawJsonResult => (new this._entityType()).fromRawJson(rawJsonResult));
        let offlineObservable = Observable.fromPromise(<Promise<>>this._offlineStorageService.getById(id));

        return <Observable<T>>Observable.if(()=> {
            return this._offlineDetectionService.isOnline;
        }, httpObservable, offlineObservable);

    }

    /**
     * persist the new item
     * @param item
     */
    public add(item: T, url: string): Observable<string> {
        let httpObservable = this._authenticatedHttp.post(url, JSON.stringify(item))
            .map(response => response.text());

        let offlineObservable = Observable.fromPromise(this._offlineStorageService.add(item));

        return Observable.if(()=> {
            return this._offlineDetectionService.isOnline;
        }, httpObservable, offlineObservable);
    }

    /**
     * Send an update for the item
     * @param item
     */
    public update(item: T, url: string): Observable<boolean> {
        let httpObservable = this._authenticatedHttp.put(url, JSON.stringify(item))
            .map(response => response.ok);

        let offlineObservable = Observable.fromPromise(this._offlineStorageService.update(item));

        return Observable.if(()=> {
            return this._offlineDetectionService.isOnline;
        }, httpObservable, offlineObservable);
    }

    /**
     * Delete a given item, resolves with false if operation failed or item has no property id
     * @param item
     * @returns {any}
     */
    public deleteItem(item: T, url: string): Observable<boolean> {
        let httpObservable = this._authenticatedHttp.delete(url)
            .map(response => response.status);

        let offlineObservable = Observable.fromPromise(this._offlineStorageService.deleteItem(item));
        return Observable.if(()=> {
            return this._offlineDetectionService.isOnline;
        }, httpObservable, offlineObservable);
        return Observable.of(false);
    }

}
