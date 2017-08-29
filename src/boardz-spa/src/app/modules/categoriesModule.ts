import {NgModule} from '@angular/core';
import {SharedModule} from './sharedModule';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CategoryDetailsResolver} from '../resolvers/categoryDetailsResolver';
import {CategoryDetailsComponent} from '../components/categories/details';
import {CategoryListComponent} from '../components/categories/list';
import {AuthGuard} from '../guards/authGuard';
import {CategoryRootComponent} from '../components/categories/categoryRoot';

const CATEGORY_ROUTES = [

    {
        path: 'categories',
        component: CategoryRootComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'all', component: CategoryListComponent, data: { displayName: 'Category overview' } },
            {
                path: 'new',
                component: CategoryDetailsComponent,
                data: { displayName: 'Create a new category' }
            },
            {
                path: 'details/:id',
                component: CategoryDetailsComponent,
                resolve: { category: CategoryDetailsResolver },
                data: { displayName: 'Category details' }
            }
        ]
    }

];


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild(CATEGORY_ROUTES)
    ],
    exports: [],
    declarations: [
        CategoryRootComponent,
        CategoryListComponent,
        CategoryDetailsComponent
    ],
    providers: []
})
export class CategoriesModule {

}
