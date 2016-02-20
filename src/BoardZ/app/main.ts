///<reference path="../../../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap} from 'angular2/platform/browser';
import {ComponentRef, provide, enableProdMode} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {BoardzApp} from './boardz-app';
import {appInjector} from './services/routing/appInjector';
import {LOGGING_PROVIDERS} from './services/logging/loggingProviders';
import {TokenDataStore} from './services/login/tokenDataStore';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

// rx operators - ALL you can eat

//enableProdMode();

bootstrap(BoardzApp, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide("inDiagnosticsMode", { useValue: true }),
    LOGGING_PROVIDERS,
    TokenDataStore,
]).then((appRef: ComponentRef) => {
    // Store a reference to the injector
    // Workaround for Dependency Injection
    // in Router lifecycle hook
    appInjector(appRef.injector);
});