import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticatedHttp} from './authenticatedHttp';
import {Category} from '../models/category';
import {BaseApiService} from './baseApiService';
import {OfflineStorageService} from './offlineStorageService';
import {OfflineDetectionService} from './offlineDetectionService';

@Injectable()
export class CategoriesService extends BaseApiService<Category> {
    constructor(http: AuthenticatedHttp, offlineStorageService: OfflineStorageService<Category>, offlineDetectionService: OfflineDetectionService) {
        super(http, offlineStorageService, offlineDetectionService);
        super.initializeEntity(Category);
    }

    public getAllCategories(): Observable<Array<Category>> {
        return this.getAll('api/categories/list');
    }

    public deepClone(category: Category): Category {
        return <Category>JSON.parse(JSON.stringify(category));
    }

    public getCategoryById(id: string): Observable<Category> {
        return this.getSingle(id, `api/categories/single?id=${id}`);
    }

    public addCategory(category: Category): Observable<string> {
        return this.add(category, `api/categories/add`);
    }

    public updateCategory(category: Category): Observable<boolean> {
        return this.update(category, `api/categories/update`)
    }

    public deleteCategory(category: Category): Observable<boolean> {
        return this.deleteItem(category, `api/categories/remove?id=${category.id}`);
    }
}
