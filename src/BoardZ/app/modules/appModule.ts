import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {BoardzAppComponent} from '../app';
import {APP_PROVIDERS} from './appProviders';
import {APP_DECLARATIONS} from './appDeclarations';
import {APP_ROUTING} from './appRoutes';
import {CoreModule} from './coreModule';
import {GamesModule} from './gamesModule';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, CoreModule, GamesModule, APP_ROUTING],
    declarations: [APP_DECLARATIONS],
    providers: APP_PROVIDERS,
    bootstrap: [BoardzAppComponent],
})
export class AppModule {
}
