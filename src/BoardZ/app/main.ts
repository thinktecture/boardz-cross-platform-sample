import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';

import {BoardzApp} from './boardz-app';

bootstrap(BoardzApp, [
    ROUTER_PROVIDERS            // Bootstrap the initial routing stuff
]);
