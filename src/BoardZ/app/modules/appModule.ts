import {NgModule} from '@angular/core';
import {ModuleConfiguration} from './config';
import {SharedModule} from './sharedModule';
import {GamesModule} from './gamesModule';

@NgModule({
    imports: [  ModuleConfiguration.App.imports, SharedModule, GamesModule],
    exports: ModuleConfiguration.App.exports,
    declarations: ModuleConfiguration.App.declarations,
    providers: ModuleConfiguration.App.providers,
    bootstrap: ModuleConfiguration.App.bootstraps
})
export class AppModule {

}
