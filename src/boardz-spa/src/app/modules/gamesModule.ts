import {NgModule} from '@angular/core';
import {SharedModule} from './sharedModule';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {GameDetailsComponent} from '../components/games/details';
import {GamesRootComponent} from '../components/games/gamesRoot';
import {GameListComponent} from '../components/games/list';
import {GameDetailsResolver} from '../resolvers/gameDetailsResolver';
import {AuthGuard} from '../guards/authGuard';

const GAME_ROUTES = [

    {
        path: 'games',
        component: GamesRootComponent,
        canActivate: [AuthGuard],
        children: [
            {path: 'all', component: GameListComponent, data: {displayName: 'Game overview'}},
            {
                path: 'new',
                component: GameDetailsComponent,
                data: {displayName: 'Create a new game'}
            },
            {
                path: 'details/:id',
                component: GameDetailsComponent,
                resolve: {game: GameDetailsResolver},
                data: {displayName: 'Game details'}
            }
        ]
    }

];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(GAME_ROUTES)],

    exports: [],
    declarations: [
        GamesRootComponent,
        GameDetailsComponent,
        GameListComponent
    ],
    providers: [
        GameDetailsResolver
    ]
})
export class GamesModule {

}
