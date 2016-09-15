import {Routes, RouterModule} from '@angular/router';
import {GamesComponent} from './games';
import {AuthGuard} from '../../guards/authGuard';
import {GameDetailsComponent} from './details';
import {GameListComponent} from './list';
import {ModuleWithProviders} from '@angular/core';
import {GameDetailsResolver} from './gameDetailsResolver';

const gameRoutes: Routes = [

    {
        path: 'games',
        component: GamesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'all', component: GameListComponent, data: { displayName: 'Game overview' } },
            {
                path: 'new',
                component: GameDetailsComponent,
                name: 'CreateGame',
                data: { displayName: 'Create a new game' }
            },
            {
                path: 'details/:id',
                component: GameDetailsComponent,
                name: 'GameDetails',
                resolve: { game: GameDetailsResolver },
                data: { displayName: 'Game details' }
            }
        ]
    }

];

export const gamesRouting: ModuleWithProviders = RouterModule.forChild(gameRoutes);
