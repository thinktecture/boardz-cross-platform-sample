import {NgModule} from '@angular/core';
import {ModuleConfiguration} from './config';
import {SharedModule} from './sharedModule';

@NgModule({
    imports: [ModuleConfiguration.Games.imports, SharedModule],
    exports: ModuleConfiguration.Games.exports,
    declarations: ModuleConfiguration.Games.declarations,
    providers: ModuleConfiguration.Games.providers
})
export class GamesModule {

}
