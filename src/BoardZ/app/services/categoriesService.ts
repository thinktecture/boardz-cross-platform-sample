import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {AuthenticatedHttp} from './authenticatedHttp';
import {Category} from '../models/category';

@Injectable()
export class CategoriesService {
    constructor(private _http: AuthenticatedHttp) {
    }

    private getRequestOptions() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Accept', 'text/plain');
        headers.append('Accept', '*/*');
        headers.append('Content-Type', 'application/json;charset=UTF-8');

        return { headers: headers };
    }

    public getAll(): Observable<Category[]> {
        return this._http.get('api/categories/list')
            .map(response => (response.json()))
            .map(rawCategories => rawCategories.map(rawCategory => Category.fromRawJson(rawCategory)));
    }

    public deepClone(category: Category): Category {
        return <Category>JSON.parse(JSON.stringify(category));
    }

    public getById(id: string): Observable<Category> {
        return this._http.get(`api/categories/single?id=${id}`)
            .map(response => <Category>response.json());
    }

    public addCategory(category: Category): Observable<string> {
        return this._http.post(`api/categories/add`, JSON.stringify(category), this.getRequestOptions())
            .map(response => <string>response.json());
    }

    public updateCategory(category: Category): Observable<string> {
        return this._http.put(`api/categories/update`, JSON.stringify(category), this.getRequestOptions())
            .map(response => category.id);
    }

    public deleteCategory(id: string): Observable<string> {
        return this._http.delete(`api/categories/remove?id=${id}`)
            .map(response => <string>response.text());
    }
}
