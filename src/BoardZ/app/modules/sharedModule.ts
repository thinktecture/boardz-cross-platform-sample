import {NgModule} from '@angular/core';
import {ModuleConfiguration} from './modulesConfig';

@NgModule({
    declarations: ModuleConfiguration.Shared.declarations,
    imports: ModuleConfiguration.Shared.imports,
    exports: ModuleConfiguration.Shared.exports,
    providers: ModuleConfiguration.Shared.providers
})
export class SharedModule {

}
