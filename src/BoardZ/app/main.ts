import {bootstrap} from 'angular2/platform/browser';
import {ComponentRef, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {BoardzApp} from './boardz-app';
import {appInjector} from './services/routing/appInjector';
import {LOGGING_PROVIDERS} from './services/logging/loggingProviders';
import {TokenDataStore} from './services/login/tokenDataStore';

bootstrap(BoardzApp, [
    ROUTER_PROVIDERS,            // Bootstrap the initial routing stuff
    provide(LocationStrategy, { useClass: HashLocationStrategy }), // best for auto-reloading

    // These are required before activating the Main component that defines the other dependencies
    LOGGING_PROVIDERS,
    TokenDataStore,
]).then((appRef: ComponentRef) => {
    // Store a reference to the injector
    // Workaround for Dependency Injection
    // in Router lifecycle hook
    appInjector(appRef.injector);
});