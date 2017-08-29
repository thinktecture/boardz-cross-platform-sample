import {NgModule} from '@angular/core';
import {SharedModule} from './sharedModule';
import {GamesModule} from './gamesModule';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ApiConfig} from '../apiConfig';
import {OfflineConfig} from '../offlineConfig';
import {OfflineDetectionService} from '../services/offlineDetectionService';
import {AuthenticatedHttp} from '../services/authenticatedHttp';
import {TokenService} from '../services/tokenService';
import {NativeIntegrationService} from '../services/nativeIntegrationService';
import {LoginService} from '../services/loginService';
import {LogService} from '../services/logService';
import {GamesService} from '../services/gamesService';
import {PlayersService} from '../services/playersService';
import {NotificationService} from '../services/notificationService';
import {UiNotificationService} from '../services/uiNotificationService';
import {PlatformInformationService} from '../services/platformInformationService';
import {SignalRService} from '../services/signalrService';
import {CloseSidebarOnClickDirective} from '../directives/closeSidebarOnClickDirective';
import {BackButtonDirective} from '../directives/backButtonDirective';
import {WidgetComponent} from '../components/widget/widget';
import {SidebarComponent} from '../components/sidebar/sidebar';
import {HeaderComponent} from '../components/header/header';
import {NotificationsComponent} from '../components/notifications/notifications';
import {RadiusSearchComponent} from '../components/radiusSearch/radiusSearch';
import {LoginComponent} from '../components/login/login';
import {DashboardComponent} from '../components/dashboard/dashboard';
import {BoardzAppComponent} from '../app';
import {AuthGuard} from '../guards/authGuard';
import {CategoriesModule} from './categoriesModule';
import {SyncService} from '../services/syncService';
import {DatabaseService} from '../services/databaseService';
import {AgeRatingsService} from '../services/ageRatingsService';
import {CategoriesService} from '../services/categoriesService';
import {DashboardService} from '../services/dashboardService';

const ROOT_ROUTES = [

    {path: '', name: 'Dashboard', canActivate: [AuthGuard], component: DashboardComponent},
    {path: 'login', name: 'Login', component: LoginComponent},
    {path: 'notifications', name: 'Notifications', canActivate: [AuthGuard], component: NotificationsComponent},
    {path: 'radiussearch', name: 'RadiusSearch', canActivate: [AuthGuard], component: RadiusSearchComponent}
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
        BackButtonDirective,
        CloseSidebarOnClickDirective
    ],
    providers: [
        ApiConfig,
        OfflineConfig,
        OfflineDetectionService,
        NativeIntegrationService,
        AuthenticatedHttp,
        TokenService,
        LoginService,
        DashboardService,
        LogService,
        GamesService,
        PlayersService,
        NotificationService,
        PlatformInformationService,
        UiNotificationService,
        SyncService,
        DatabaseService,
        AgeRatingsService,
        CategoriesService,
        SignalRService,
        AuthGuard
    ],
    bootstrap: [BoardzAppComponent]
})
export class AppModule {

}
