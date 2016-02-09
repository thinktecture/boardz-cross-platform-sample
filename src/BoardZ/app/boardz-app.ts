import {Component, provide} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publish';
import 'rxjs/add/operator/publishReplay';

import {ApplicationConfiguration} from './app-config';
import {LoginService} from './services/login/login-service';
import {LoginForm} from './components/login/login-form';

@Component({
    selector: 'boardz-app',
    directives: [LoginForm],
    providers: [
        Http,
        HTTP_PROVIDERS,
        LoginService,
        [provide('app.config', {useValue: ApplicationConfiguration})]
    ],
    template: `<h1>Hello BoardZ-Gamers!</h1>
        <login-form></login-form>
    `
})
export class BoardzApp {}