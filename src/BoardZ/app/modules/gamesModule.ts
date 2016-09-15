import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CoreModule} from './coreModule';
import {gamesRouting} from '../components/games/gamesRoutes';
import {GamesComponent} from '../components/games/games';
import {GameDetailsComponent} from '../components/games/details';
import {GameListComponent} from '../components/games/list';
import {GameDetailsResolver} from '../components/games/gameDetailsResolver';

@NgModule({
        imports: [CommonModule, FormsModule, CoreModule, gamesRouting],
        declarations: [
            GamesComponent,
            GameDetailsComponent,
            GameListComponent
        ],
        providers: [GameDetailsResolver]
    }
)
export class GamesModule {

}
