import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {GameDetailsComponent} from './details';
import {GameListComponent} from './list';

@Component({
    selector: 'games',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/games/games.html'
})
@RouteConfig([
    { path: '/', component: GameListComponent, name: 'GameList', useAsDefault: true, data: { displayName: 'Game overview' } },
    { path: '/create', component: GameDetailsComponent, name: 'CreateGame', data: { displayName: 'Create a new Game' } },
    { path: '/details/:id', component: GameDetailsComponent, name: 'GameDetails', data: { displayName: 'Game details' } }
])
export class GamesComponent {
}
