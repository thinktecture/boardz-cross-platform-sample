import {NgModule} from '@angular/core';
import {ModuleConfiguration} from './config';

@NgModule({
    declarations: ModuleConfiguration.Shared.declarations,
    imports: ModuleConfiguration.Shared.imports,
    exports: ModuleConfiguration.Shared.exports,
    providers: ModuleConfiguration.Shared.providers
})
export class SharedModule {

}
