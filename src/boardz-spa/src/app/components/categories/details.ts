import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../services/notifications/notification.service';
import {Category} from '../../models/category';
import {CategoriesService} from '../../services/categories.service';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
    templateUrl: 'details.html'
})
export class CategoryDetailsComponent implements OnInit {

    public details = this._formBuilder.group({
        id: [null],
        name: ['', Validators.required]
    });

    public get name(): AbstractControl {
        return this.details.get('name');
    }

    public get id(): AbstractControl {
        return this.details.get('id');
    }

    private _original: Category;

    constructor(private _formBuilder: FormBuilder,
                private _categoriesService: CategoriesService,
                private _router: Router,
                private route: ActivatedRoute,
                private _notificationService: NotificationService) {
    }

    public ngOnInit(): any {
        this.route.data.forEach((data: { category: Category }) => {
            if (data.category) {
                this._original = data.category;
                this.details.setValue({
                    name: data.category.name,
                    id: data.category.id
                });
            }
        });
    }

    public abort(): void {
        this._router.navigate(['/categories/all']);
    }

    public reset(): void {
        this.details.reset({
            id: this._original.id,
            name: this._original.name
        });
    }

    public saveChanges(): void {
        const category = JSON.parse(JSON.stringify(this.details.value));
        if (!category.id) {
            delete category.id;
            this._categoriesService.addCategory(category)
                .subscribe(
                    (newId) => {
                        this._notificationService.notifySuccess('New category was added.');
                        this._router.navigate(['/categories/all']);
                    },
                    () => this._notificationService.notifyError('Could not save new category.')
                );
        } else {
            this._categoriesService.updateCategory(category)
                .subscribe((oldId) => {
                        this._notificationService.notifySuccess('Category data was updated.');
                        this._router.navigate(['/categories/all']);
                    },
                    () => {
                        this._notificationService.notifyError('Could not update category data.');
                    }
                );
        }
    }

    public deleteCategory(): void {
        if (window.confirm('Really delete the category "' + this.details.value.name + '" ?')) {
            this._categoriesService.deleteCategory(this.details.value)
                .subscribe(
                    () => {
                        this._notificationService.notifySuccess('Category data was deleted.');
                        this.abort();
                    },
                    () => this._notificationService.notifyError('Could not delete category data.')
                );
        }
    }
}
