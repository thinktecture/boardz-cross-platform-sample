import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {GameDetails} from './gameDetails';
import {GameList} from './gameList';

@Component({
    selector: 'games',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <div class="row">
        <div class="col-md-12">
            <h1>Games</h1>
        </div>
    </div>
    <router-outlet></router-outlet>`
})
@RouteConfig([
    { path: '/', component: GameList, name: 'GameList', useAsDefault: true, data: { displayName: 'Game overview' }},
    { path: '/details/:id', component: GameDetails, name: 'GameDetails', data: { displayName: 'Game details' }}
])
export class Games {}
