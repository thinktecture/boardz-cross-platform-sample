import {NgModule} from '@angular/core';
import {PictureItComponent} from '../components/pictureIt/pictureIt';
import {LocateItComponent} from '../components/locateIt/locateIt';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CORE_PROVIDERS} from './appProviders';
@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [PictureItComponent, LocateItComponent],
    exports: [PictureItComponent, LocateItComponent],
    providers: [CORE_PROVIDERS]
})
export class CoreModule {

}
