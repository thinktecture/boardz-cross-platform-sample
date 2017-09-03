import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Category} from '../models/category';
import {CategoriesService} from '../services/categories.service';

@Injectable()
export class CategoryResolver implements Resolve<Category> {
    constructor(private _categoriesService: CategoriesService) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<Category> {
        const id = route.params['id'];
        return new Promise((resolve) => {
            this._categoriesService.getCategoryById(id).subscribe(category => {
                if (category) {
                    resolve(category);
                } else {
                    resolve(new Category());
                }
            });
        });
    }
}
