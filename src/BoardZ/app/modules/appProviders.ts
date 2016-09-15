import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {XHRBackend, ConnectionBackend} from '@angular/http';
import {AppConfiguration} from '../appConfig';
import {NativeIntegrationService} from '../services/nativeIntegrationService';
import {AuthenticatedHttp} from '../services/authenticatedHttp';
import {TokenService} from '../services/tokenService';
import {LoginService} from '../services/loginService';
import {LogService} from '../services/logService';
import {GamesService} from '../services/gamesService';
import {GeolocationService} from '../services/geolocationService';
import {PlayersService} from '../services/playersService';
import {NotificationService} from '../services/notificationService';
import {PlatformInformationService} from '../services/platformInformationService';
import {CameraService} from '../services/cameraService';
import {UiNotificationService} from '../services/uiNotificationService';
import {SignalRService} from '../services/signalrService';
import {MobileCameraService} from '../services/mobileCameraService';
import {DesktopCameraService} from '../services/desktopCameraService';
import {appRoutingProviders} from './appRoutes';

export const CORE_PROVIDERS = [
    {
        provide: CameraService, useFactory: (()=> {
        return (platformInformationService: PlatformInformationService): CameraService => {
            return platformInformationService.isMobile ? new MobileCameraService() : new DesktopCameraService();
        };
    })(), deps: [PlatformInformationService]
    },
    GeolocationService
];

export const APP_PROVIDERS = [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: ConnectionBackend, useClass: XHRBackend },
    AppConfiguration,
    NativeIntegrationService,
    AuthenticatedHttp,
    TokenService,
    LoginService,
    LogService,
    GamesService,
    ,
    PlayersService,
    NotificationService,
    PlatformInformationService,

    UiNotificationService,
    SignalRService,
    appRoutingProviders
];
