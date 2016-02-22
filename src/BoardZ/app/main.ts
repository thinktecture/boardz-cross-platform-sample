///<reference path="../../../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {ComponentRef, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {BoardzApp} from './app';
import {HTTP_PROVIDERS} from 'angular2/http';
import {TokenDataStore} from './services/token.service';
import {appInjector} from './services/app.injector';
import {ConsoleLogger} from './services/console.log.service';
import {Logger} from './services/log.service';
import 'rxjs/Rx';

//enableProdMode();

bootstrap(BoardzApp, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide("inDiagnosticsMode", { useValue: true }),
    provide(Logger, { useClass: ConsoleLogger }),
    TokenDataStore,
]).then((appRef: ComponentRef) => {
    // Store a reference to the injector workaround for Dependency Injection in Router lifecycle hook
    appInjector(appRef.injector);
});