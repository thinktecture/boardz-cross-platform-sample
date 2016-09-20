import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {LogService} from '../../services/logService';
import {NotificationService} from '../../services/notificationService';
import {Category} from '../../models/category';
import {CategoriesService} from '../../services/categoriesService';

@Component({
    moduleId: module.id,
    selector: 'categoryDetail',
    templateUrl: 'details.html'
})
export class CategoryDetailsComponent implements OnInit {

    private _needsReset: boolean;
    private _sending: boolean;

    public active = true;
    public model: Category = new Category();
    public originalModel: Category = new Category();

    constructor(private _logService: LogService,
                private _categoriesService: CategoriesService,
                private _router: Router,
                private route: ActivatedRoute,
                private _notificationService: NotificationService) {
    }

    public ngOnInit(): any {
        this.route.data.forEach((data: { category: Category }) => {
            this.originalModel = this._categoriesService.deepClone(this.model = data.category || new Category());
            if (this._needsReset) {
                this.reset();
            }
        });
    }

    public abort(): void {
        this._router.navigate(['/categories/all']);
    }

    public reset(): void {
        this._needsReset = false;

        // Based on: https://angular.io/docs/ts/latest/guide/forms.html
        this.model = this._categoriesService.deepClone(this.originalModel);

        // workaround to re-initialize the actual form controls states
        this.active = false;
        setTimeout(() => this.active = true, 0);
    }

    public saveChanges(): void {
        if (this.model.id === null) {
            this._categoriesService.addCategory(this.model)
                .subscribe(
                    (newId) => {
                        this._notificationService.notifySuccess('New category was added.');
                        this._router.navigate(['/categories/all']);
                    },
                    () => this._notificationService.notifyError('Could not save new category.')
                );
        } else {
            this._categoriesService.updateCategory(this.model)
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
        if (window.confirm('Really delete the category "' + this.originalModel.name + '" ?')) {
            this._categoriesService.deleteCategory(this.originalModel)
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
