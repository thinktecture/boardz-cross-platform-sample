import {NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {GameDetailsComponent} from '../components/games/details';
import {GamesRootComponent} from '../components/games/gamesRoot';
import {GameListComponent} from '../components/games/list';
import {GameResolver} from '../resolvers/game.resolver';
import {AuthenticatedGuard} from '../guards/authenticated.guard';

const GAME_ROUTES = [

    {
        path: 'games',
        component: GamesRootComponent,
        canActivate: [AuthenticatedGuard],
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
                resolve: {game: GameResolver},
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
        GameResolver
    ]
})
export class GamesModule {

}
