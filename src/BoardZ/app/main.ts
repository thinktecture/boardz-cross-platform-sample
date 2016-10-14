import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './modules/appModule';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
