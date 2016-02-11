import {bootstrap} from 'angular2/platform/browser';
import {ComponentRef, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {BoardzApp} from './boardz-app';
import {appInjector} from './services/routing/appInjector';
import {TokenDataStore} from './services/login/tokenDataStore';
import {LOGGING_PROVIDERS} from './services/logging/loggingProviders';

bootstrap(BoardzApp, [
    ROUTER_PROVIDERS,            // Bootstrap the initial routing stuff
    provide(LocationStrategy, { useClass: HashLocationStrategy }), // best for auto-reloading
    LOGGING_PROVIDERS,
    TokenDataStore               // this is also required very early, so we need our dependencies registered first
]).then((appRef: ComponentRef) => {
    // Store a reference to the injector
    // Workaround for Dependency Injection
    // in Router lifecycle hook
    appInjector(appRef.injector);
});