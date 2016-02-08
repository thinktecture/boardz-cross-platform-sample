import {Component} from 'angular2/core';

import {LoginForm} from "./components/login/login-form";

@Component({
    selector: 'boardz-app',
    directives: [LoginForm],
    template: `<h1>Hello BoardZ-Gamers!</h1>
        <login-form></login-form>
    `
})
export class BoardzApp {}