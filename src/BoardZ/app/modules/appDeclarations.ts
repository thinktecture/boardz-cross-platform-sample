import {CloseSidebarOnClickDirective} from '../directives/closeSidebarOnClickDirective';
import {BackButtonDirective} from '../directives/backButtonDirective';
import {PictureItComponent} from '../components/pictureIt/pictureIt';
import {LocateItComponent} from '../components/locateIt/locateIt';
import {WidgetComponent} from '../components/widget/widget';
import {SidebarComponent} from '../components/sidebar/sidebar';
import {HeaderComponent} from '../components/header/header';
import {BoardzAppComponent} from '../app';
import {DashboardComponent} from '../components/dashboard/dashboard';
import {LoginComponent} from '../components/login/login';
import {RadiusSearchComponent} from '../components/radiusSearch/radiusSearch';
import {NotificationsComponent} from '../components/notifications/notifications';

export const APP_DECLARATIONS = [
    BoardzAppComponent,
    DashboardComponent,
    LoginComponent,
    RadiusSearchComponent,
    NotificationsComponent,
    HeaderComponent,
    SidebarComponent,
    WidgetComponent,
    BackButtonDirective,
    CloseSidebarOnClickDirective
];
