import {enableProdMode, NgModuleRef} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {appInjector} from './services/appInjector';
import {AppModule} from './modules/appModule';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule)
    .then((ngModuleRef: NgModuleRef) => {
        appInjector(ngModuleRef.injector);
    });
