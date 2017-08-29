import {NgModule} from '@angular/core';
import {SharedModule} from './sharedModule';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {GAME_ROUTES} from '../routes/index';
import {GameDetailsComponent} from '../components/games/details';
import {GamesRootComponent} from '../components/games/gamesRoot';
import {GameListComponent} from '../components/games/list';
import {GameDetailsResolver} from '../resolvers/gameDetailsResolver';

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
