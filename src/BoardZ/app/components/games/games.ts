import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {GameDetails} from './details';
import {GameList} from './list';

@Component({
    selector: 'games',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/games/games.html'
})
@RouteConfig([
    { path: '/', component: GameList, name: 'GameList', useAsDefault: true, data: { displayName: 'Game overview' } },
    { path: '/create', component: GameDetails, name: 'CreateGame', data: { displayName: 'Create a new Game' } },
    { path: '/details/:id', component: GameDetails, name: 'GameDetails', data: { displayName: 'Game details' } }
])
export class Games {

}
