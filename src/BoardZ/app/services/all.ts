import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {XHRBackend, ConnectionBackend} from '@angular/http';

import {AppConfiguration} from '../appConfig';
import {AuthenticatedHttp} from './authenticatedHttp';
import {LoginService} from './loginService';
import {GamesService} from './gamesService';
import {GeolocationService} from './geolocationService';
import {PlayersService} from './playersService';
import {NotificationService} from './notificationService';
import {SignalRService} from './signalrService';
import {UiNotificationService} from './uiNotificationService';
import {CameraService} from './cameraService';
import {DesktopCameraService} from './desktopCameraService';
import {MobileCameraService} from './mobileCameraService';
import {PlatformInformationService} from './platformInformationService';
import {NativeIntegrationService} from './nativeIntegrationService';
import {TokenService} from './tokenService';
import {LogService} from './logService';

declare let window;

let evaluateCameraService = ()=> {
    return (platformInformationService: PlatformInformationService): CameraService => {
        return platformInformationService.isMobile ? new MobileCameraService() : new DesktopCameraService();
    };

};

export const APP_SERVICES = [
    ROUTER_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: ConnectionBackend, useClass: XHRBackend },
    AppConfiguration,
    NativeIntegrationService,
    AuthenticatedHttp,
    TokenService,
    LoginService,
    LogService,
    GamesService,
    GeolocationService,
    PlayersService,
    NotificationService,
    PlatformInformationService,
    { provide: CameraService, useFactory: evaluateCameraService(), deps: [PlatformInformationService] },
    UiNotificationService,
    SignalRService
];
