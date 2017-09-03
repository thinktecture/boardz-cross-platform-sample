import {NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CategoryResolver} from '../resolvers/category.resolver';
import {CategoryDetailsComponent} from '../components/categories/details';
import {CategoryListComponent} from '../components/categories/list';
import {AuthenticatedGuard} from '../guards/authenticated.guard';
import {CategoryRootComponent} from '../components/categories/categoryRoot';

const CATEGORY_ROUTES = [

    {
        path: 'categories',
        component: CategoryRootComponent,
        canActivate: [AuthenticatedGuard],
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
                resolve: { category: CategoryResolver },
                data: { displayName: 'Category details' }
            }
        ]
    }

];


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(CATEGORY_ROUTES)
    ],
    exports: [],
    declarations: [
        CategoryRootComponent,
        CategoryListComponent,
        CategoryDetailsComponent
    ],
    providers: [
        CategoryResolver
    ]
})
export class CategoriesModule {

}
