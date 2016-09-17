import {NgModule} from '@angular/core';
import {ModuleConfiguration} from './config';
import {SharedModule} from './sharedModule';

@NgModule({
    imports: [ModuleConfiguration.Categories.imports, SharedModule],
    exports: ModuleConfiguration.Categories.exports,
    declarations: ModuleConfiguration.Categories.declarations,
    providers: ModuleConfiguration.Categories.providers
})
export class CategoriesModule {

}
