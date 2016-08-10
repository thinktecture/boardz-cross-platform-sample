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

import {ComponentRef, enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import {appInjector} from './services/appInjector';
import {AppModule} from './modules/appModule';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule)
    .then((appRef: ComponentRef) => {
        appInjector(appRef.injector);
    });
