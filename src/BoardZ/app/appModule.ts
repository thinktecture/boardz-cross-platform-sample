import {NgModule}       from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {BoardzAppComponent} from './app';
import {HeaderComponent} from './components/header/header';
import {SidebarComponent} from './components/sidebar/sidebar';
import {APP_SERVICES} from './services/all';
import {WidgetComponent} from './components/widget/widget';
import {PictureItComponent} from './components/pictureIt/pictureIt';
import {LocateItComponent} from './components/locateIt/locateIt';
import {BackButtonDirective} from './directives/backButtonDirective';
import {CloseSidebarOnClickDirective} from './directives/closeSidebarOnClickDirective';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule],
    declarations: [BoardzAppComponent, ROUTER_DIRECTIVES, HeaderComponent, SidebarComponent, WidgetComponent, LocateItComponent, PictureItComponent, BackButtonDirective, CloseSidebarOnClickDirective],
    providers: APP_SERVICES,
    bootstrap: [BoardzAppComponent],
})
export class AppModule {
}