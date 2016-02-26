///<reference path="../../../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {ComponentRef, provide, enableProdMode} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {BoardzApp} from './app';
import {HTTP_PROVIDERS} from 'angular2/http';
import {TokenService} from './services/token.service';
import {appInjector} from './services/app.injector';
import {LogService} from './services/log.service';
import 'rxjs/Rx';

enableProdMode();

bootstrap(BoardzApp, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide("inDiagnosticsMode", { useValue: true }),
    provide(LogService, { useClass: LogService }),
    TokenService,
]).then((appRef: ComponentRef) => {
    // Store a reference to the injector workaround for Dependency Injection in Router lifecycle hook
    appInjector(appRef.injector);
});