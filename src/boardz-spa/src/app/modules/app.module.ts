import {NgModule} from '@angular/core';
import {SharedModule} from './shared.module';
import {GamesModule} from './games.module';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {OfflineDetectionService} from '../services/offline/offline.detection.service';
import {AuthenticatedHttp} from '../services/http.service';
import {TokenService} from '../services/token.service';
import {DesktopService} from '../services/infrastructure/desktop.service';
import {LoginService} from '../services/authentication.service';
import {LogService} from '../services/infrastructure/log.service';
import {GamesService} from '../services/games.service';
import {PlayersService} from '../services/players.service';
import {NotificationService} from '../services/notifications/notification.service';
import {UiNotificationService} from '../services/notifications/ui.notification.service';
import {RuntimeService} from '../services/infrastructure/runtime.service';
import {CloseSidebarDirective} from '../directives/close.sidebar.directive';
import {BackDirective} from '../directives/back.directive';
import {WidgetComponent} from '../components/widget/widget';
import {SidebarComponent} from '../components/sidebar/sidebar';
import {HeaderComponent} from '../components/header/header';
import {NotificationsComponent} from '../components/notifications/notifications';
import {RadiusSearchComponent} from '../components/radiusSearch/radiusSearch';
import {LoginComponent} from '../components/login/login';
import {DashboardComponent} from '../components/dashboard/dashboard';
import {BoardzAppComponent} from '../app';
import {AuthenticatedGuard} from '../guards/authenticated.guard';
import {CategoriesModule} from './categories.module';
import {SyncService} from '../services/offline/sync.service';
import {DatabaseService} from '../services/offline/database.service';
import {AgeRatingsService} from '../services/ageratings.service';
import {CategoriesService} from '../services/categories.service';
import {DashboardService} from '../services/dashboard.service';
import {OfflineIndicatorDirective} from '../directives/offline.indicator.directive';

const ROOT_ROUTES = [

    {path: '', name: 'Dashboard', canActivate: [AuthenticatedGuard], component: DashboardComponent},
    {path: 'login', name: 'Login', component: LoginComponent},
    {path: 'notifications', name: 'Notifications', canActivate: [AuthenticatedGuard], component: NotificationsComponent},
    {path: 'radiussearch', name: 'RadiusSearch', canActivate: [AuthenticatedGuard], component: RadiusSearchComponent}
];

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot(ROOT_ROUTES, {useHash: true}),
        SharedModule,
        GamesModule,
        CategoriesModule
    ],
    exports: [],
    declarations: [
        BoardzAppComponent,
        DashboardComponent,
        LoginComponent,
        RadiusSearchComponent,
        NotificationsComponent,
        HeaderComponent,
        SidebarComponent,
        WidgetComponent,
        BackDirective,
        CloseSidebarDirective,
        OfflineIndicatorDirective
    ],
    providers: [
        OfflineDetectionService,
        DesktopService,
        AuthenticatedHttp,
        TokenService,
        LoginService,
        DashboardService,
        LogService,
        GamesService,
        PlayersService,
        NotificationService,
        RuntimeService,
        UiNotificationService,
        SyncService,
        DatabaseService,
        AgeRatingsService,
        CategoriesService,
        AuthenticatedGuard
    ],
    bootstrap: [BoardzAppComponent]
})
export class AppModule {

}
