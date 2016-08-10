import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {CloseSidebarOnClickDirective} from '../directives/closeSidebarOnClickDirective';
import {BackButtonDirective} from '../directives/backButtonDirective';
import {PictureItComponent} from '../components/pictureIt/pictureIt';
import {LocateItComponent} from '../components/locateIt/locateIt';
import {WidgetComponent} from '../components/widget/widget';
import {SidebarComponent} from '../components/sidebar/sidebar';
import {HeaderComponent} from '../components/header/header';
import {BoardzAppComponent} from '../app';

export const APP_DECLARATIONS = [
    BoardzAppComponent,
    ROUTER_DIRECTIVES,
    HeaderComponent,
    SidebarComponent,
    WidgetComponent,
    LocateItComponent,
    PictureItComponent,
    BackButtonDirective,
    CloseSidebarOnClickDirective
];