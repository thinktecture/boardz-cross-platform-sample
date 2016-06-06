import {provide} from '@angular/core';
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
import {NativeIntegrationService} from "./nativeIntegrationService";

declare var window;

export var APP_SERVICES = [
    provide(ConnectionBackend, { useClass: XHRBackend }),
    AppConfiguration,
    PlatformInformationService,
    NativeIntegrationService,
    AuthenticatedHttp,
    LoginService,
    GamesService,
    GeolocationService,
    PlayersService,
    NotificationService,
    provide(CameraService, { useClass: 
        window.cordova ? MobileCameraService : DesktopCameraService 
    }),
    UiNotificationService,
    SignalRService
];
