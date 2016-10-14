import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '../components/dashboard/dashboard';
import {LoginComponent} from '../components/login/login';
import {NotificationsComponent} from '../components/notifications/notifications';
import {RadiusSearchComponent} from '../components/radiusSearch/radiusSearch';
import {GameDetailsResolver} from '../resolvers/gameDetailsResolver';
import {GameDetailsComponent} from '../components/games/details';
import {GameListComponent} from '../components/games/list';
import {GamesRootComponent} from '../components/games/gamesRoot';
import {AuthenticationGuard} from '../guards/authenticationGuard';

const appRootRoutes: Routes = [

    { path: '',  canActivate: [AuthenticationGuard], component: DashboardComponent },
    { path: 'login',  component: LoginComponent },
    { path: 'notifications', canActivate: [AuthenticationGuard], component: NotificationsComponent },
    { path: 'radiussearch',  canActivate: [AuthenticationGuard], component: RadiusSearchComponent }
];

const gameRoutes: Routes = [

    {
        path: 'games',
        component: GamesRootComponent,
        canActivate: [AuthenticationGuard],
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
export const appRoutingProviders: any[] = [AuthenticationGuard];

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(appRootRoutes);
export const GAMES_ROUTING: ModuleWithProviders = RouterModule.forChild(gameRoutes);
