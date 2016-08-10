import {NgModule}       from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {BoardzAppComponent} from '../app';
import {APP_PROVIDERS} from './appProviders';
import {APP_DECLARATIONS} from './appDeclarations';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule],
    declarations: APP_DECLARATIONS,
    providers: APP_PROVIDERS,
    bootstrap: [BoardzAppComponent],
})
export class AppModule {
}