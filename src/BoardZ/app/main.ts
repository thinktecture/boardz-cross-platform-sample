// require all 3rd party libs
import 'bootstrap/js/bootstrap';
import 'admin-lte/js/app';
import 'hammerjs/hammer';
import 'jquery/jquery.hammer';
import 'jquery/jquery.slimscroll';
import 'pNotify/pnotify-adapter';
import 'signalr/signalr';
import 'leaflet/leaflet';
import 'fastclick/fastclick';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {ComponentRef, enableProdMode} from '@angular/core';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HTTP_PROVIDERS} from '@angular/http';
import {BoardzAppComponent} from './app';
import {TokenService} from './services/tokenService';
import {appInjector} from './services/appInjector';
import {LogService} from './services/logService';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {PlatformInformationService} from './services/platformInformationService';

enableProdMode();

bootstrap(BoardzAppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    PlatformInformationService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    LogService,
    TokenService,
]).then((appRef: ComponentRef) => {
    appInjector(appRef.injector);
});
