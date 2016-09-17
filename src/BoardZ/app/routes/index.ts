import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../components/dashboard/dashboard';
import {LoginComponent} from '../components/login/login';
import {NotificationsComponent} from '../components/notifications/notifications';
import {RadiusSearchComponent} from '../components/radiusSearch/radiusSearch';
import {AuthGuard} from '../guards/authGuard';
import {GameDetailsResolver} from '../resolvers/gameDetailsResolver';
import {GameDetailsComponent} from '../components/games/details';
import {GameListComponent} from '../components/games/list';
import {GamesRootComponent} from '../components/games/gamesRoot';
import {CategoryRootComponent} from '../components/categories/categoryRoot';
import {CategoryListComponent} from '../components/categories/list';
import {CategoryDetailsComponent} from '../components/categories/details';
import {CategoryDetailsResolver} from '../resolvers/categoryDetailsResolver';

const appRootRoutes: Routes = [

    { path: '', name: 'Dashboard', canActivate: [AuthGuard], component: DashboardComponent },
    { path: 'login', name: 'Login', component: LoginComponent },
    { path: 'notifications', name: 'Notifications', canActivate: [AuthGuard], component: NotificationsComponent },
    { path: 'radiussearch', name: 'RadiusSearch', canActivate: [AuthGuard], component: RadiusSearchComponent }
];

const gameRoutes: Routes = [

    {
        path: 'games',
        component: GamesRootComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'all', component: GameListComponent, data: { displayName: 'Game overview' } },
            {
                path: 'new',
                component: GameDetailsComponent,
                data: { displayName: 'Create a new game' }
            },
            {
                path: 'details/:id',
                component: GameDetailsComponent,

                resolve: { game: GameDetailsResolver },
                data: { displayName: 'Game details' }
            }
        ]
    }

];

const categoryRoutes: Routes = [

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
export const appRoutingProviders: any[] = [AuthGuard];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(appRootRoutes);
export const GAMES_ROUTING: ModuleWithProviders = RouterModule.forChild(gameRoutes);
export const CATEGORIES_ROUTING: ModuleWithProviders = RouterModule.forChild(categoryRoutes);
