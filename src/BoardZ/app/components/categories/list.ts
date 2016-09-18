import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {NotificationService} from '../../services/notificationService';
import {CategoriesService} from '../../services/categoriesService';
import {Category} from '../../models/category';
@Component({
    moduleId: module.id,
    selector: 'ist',
    templateUrl: 'list.html'
})

export class CategoryListComponent implements OnInit {
    public categories: Category[];

    constructor(private _categoriesService: CategoriesService,
                private _router: Router,
                private _route: ActivatedRoute,
                private _notificationService: NotificationService) {
    }

    public openDetails(category: Category): void {
        this._router.navigate(['../details', category.id], { relativeTo: this._route });
    }

    public openAdd(): void {
        this._router.navigate(['../new'], { relativeTo: this._route });
    }

    public ngOnInit(): void {
        this._categoriesService.getAllCategories()
            .subscribe(
                (categories) => this.categories = categories,
                (err) => this._notificationService.notifyError('Error while fetching category data')
            );
    }
}
