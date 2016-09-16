import {FormsModule} from '@angular/forms';
import {BoardzAppComponent} from '../app';
import {DashboardComponent} from '../components/dashboard/dashboard';
import {LoginComponent} from '../components/login/login';
import {RadiusSearchComponent} from '../components/radiusSearch/radiusSearch';
import {NotificationsComponent} from '../components/notifications/notifications';
import {HeaderComponent} from '../components/header/header';
import {SidebarComponent} from '../components/sidebar/sidebar';
import {WidgetComponent} from '../components/widget/widget';
import {BackButtonDirective} from '../directives/backButtonDirective';
import {CloseSidebarOnClickDirective} from '../directives/closeSidebarOnClickDirective';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, XHRBackend, ConnectionBackend} from '@angular/http';
import {APP_ROUTING, appRoutingProviders, GAMES_ROUTING} from '../routes/index';
import {ApiConfig} from '../apiConfig';
import {HashLocationStrategy, LocationStrategy, CommonModule} from '@angular/common';
import {NativeIntegrationService} from '../services/nativeIntegrationService';
import {AuthenticatedHttp} from '../services/authenticatedHttp';
import {TokenService} from '../services/tokenService';
import {LoginService} from '../services/loginService';
import {LogService} from '../services/logService';
import {GamesService} from '../services/gamesService';
import {PlayersService} from '../services/playersService';
import {NotificationService} from '../services/notificationService';
import {PlatformInformationService} from '../services/platformInformationService';
import {UiNotificationService} from '../services/uiNotificationService';
import {SignalRService} from '../services/signalrService';
import {GameListComponent} from '../components/games/list';
import {GameDetailsComponent} from '../components/games/details';
import {GamesRootComponent} from '../components/games/gamesRoot';
import {GameDetailsResolver} from '../resolvers/gameDetailsResolver';
import {CameraService} from '../services/cameraService';
import {MobileCameraService} from '../services/mobileCameraService';
import {DesktopCameraService} from '../services/desktopCameraService';
import {PictureItComponent} from '../components/pictureIt/pictureIt';
import {LocateItComponent} from '../components/locateIt/locateIt';
import {GeolocationService} from '../services/geolocationService';

export namespace ModuleConfiguration {

    export class App {

        public static declarations = [
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

        public static imports = [
            BrowserModule,
            HttpModule,
            FormsModule,
            APP_ROUTING
        ];

        public static exports = [];

        public static providers = [{ provide: LocationStrategy, useClass: HashLocationStrategy },
            { provide: ConnectionBackend, useClass: XHRBackend },
            ApiConfig,
            NativeIntegrationService,
            AuthenticatedHttp,
            TokenService,
            LoginService,
            LogService,
            GamesService,
            PlayersService,
            NotificationService,
            PlatformInformationService,
            UiNotificationService,
            SignalRService,
            appRoutingProviders];

        public static bootstraps = [BoardzAppComponent]
    }

    export class Games {

        public static declarations = [GamesRootComponent, GameDetailsComponent, GameListComponent];

        public static imports = [CommonModule, FormsModule, GAMES_ROUTING];

        public static exports = [];

        public static providers = [GameDetailsResolver];
    }

    export class Shared {

        public static declarations = [PictureItComponent, LocateItComponent];

        public static imports = [CommonModule, FormsModule];

        public static exports = [PictureItComponent, LocateItComponent];

        public static providers = [
            {
                provide: CameraService, useFactory: (() => {
                return (platformInformationService: PlatformInformationService): CameraService => {
                    return platformInformationService.isMobile ? new MobileCameraService() : new DesktopCameraService();
                };
            })(), deps: [PlatformInformationService]
            },
            GeolocationService
        ];
    }
}

