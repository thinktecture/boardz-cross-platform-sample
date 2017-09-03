import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticatedHttp} from './http.service';
import {Category} from '../models/category';
import {BaseApiService} from './infrastructure/base.api.service';
import {OfflineDetectionService} from './offline/offline.detection.service';
import {DatabaseService} from './offline/database.service';
import {ModelState} from '../models/modelState';

@Injectable()
export class CategoriesService extends BaseApiService<Category> {

    constructor(private _databaseService: DatabaseService,
                http: AuthenticatedHttp,
                offlineDetectionService: OfflineDetectionService) {
        super(http, offlineDetectionService);
        super.initializeEntity(Category);

    }

    public deepClone(category: Category): Category {
        return <Category>JSON.parse(JSON.stringify(category));
    }

    public getAllCategories(): Observable<Array<Category>> {
        return this.getAll('api/categories', this._databaseService.categories,
            Observable.fromPromise(
                this._databaseService.categories.filter(c => c.state !== ModelState.Deleted).toArray()));
    }

    public getCategoryById(id: string): Observable<Category> {

        return this.getSingle(id, `api/categories/${id}`,
            Observable.fromPromise(this._databaseService.categories.get(id)));
    }

    public addCategory(category: Category): Observable<string> {
        return this.add(category, `api/categories`, this.getAddOfflineFallback(category));
    }

    public updateCategory(category: Category): Observable<boolean> {
        return this.update(category, `api/categories/${category.id}`, this.getUpdateOfflineFallback(category));
    }

    public deleteCategory(category: Category): Observable<boolean> {
        return this.deleteItem(category, `api/categories/${category.id}`,
            this.getDeleteOfflineFallback(category));
    }

    private getUpdateOfflineFallback(category: Category): Observable<boolean> {
        const copy = this.deepClone(category);
        copy.state = ModelState.Modified;
        return Observable.fromPromise(this._databaseService.categories.put(category).then(() => {
            return true;
        }, () => {
            return false;
        }));
    }

    private getAddOfflineFallback(category: Category): Observable<string> {
        const copy = this.deepClone(category);
        copy.state = ModelState.New;
        copy.id = `-${(new Date()).getTime()}`;
        return Observable.fromPromise(this._databaseService.categories.add(copy).then(() => {
            return copy.id;
        }, () => {
            return null;
        }));

    }

    private getDeleteOfflineFallback(category: Category): Observable<boolean> {
        const copy = this.deepClone(category);
        return Observable.fromPromise(this._databaseService.categories.update(copy.id, {state: ModelState.Deleted})
            .then(() => {
                return true;
            }, () => {
                return false;
            }));
    }

}
