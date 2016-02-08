import {provide} from "angular2/core";
import {Http, HTTP_PROVIDERS} from "angular2/http";
import {bootstrap} from 'angular2/platform/browser';

import {BoardzApp} from './boardz-app';
import {ApplicationConfiguration} from "./app-config";
import {LoginService} from "./services/login/login-service";

bootstrap(BoardzApp, [
    Http, HTTP_PROVIDERS,
    LoginService,
    [provide('app.config', {useValue: ApplicationConfiguration})]
]);
