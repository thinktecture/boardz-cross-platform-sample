import {Component} from '@angular/core';
import {RouteConfig} from '@angular/router-deprecated';

import {NeedsAuthentication} from '../../decorators/needsAuthentication';
import {GameDetailsComponent} from './details';
import {GameListComponent} from './list';

@Component({
    moduleId: __moduleName,
    selector: 'games',
    templateUrl: 'games.html'
})
@RouteConfig([
    { path: '/', component: GameListComponent, name: 'GamesList', useAsDefault: true, data: { displayName: 'Game overview' } },
    { path: '/create', component: GameDetailsComponent, name: 'CreateGame', data: { displayName: 'Create a new game' } },
    { path: '/details/:id', component: GameDetailsComponent, name: 'GameDetails', data: { displayName: 'Game details' } }
])
@NeedsAuthentication()
export class GamesComponent {
}
