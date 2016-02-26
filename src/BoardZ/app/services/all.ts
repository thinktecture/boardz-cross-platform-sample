import {provide} from 'angular2/core';
import {Configuration} from '../app-config';
import {AuthenticatedHttp} from './authenticated.http';
import {LoginService} from './login.service';
import {GamesService} from './games.service';
import {GeolocationService} from './geolocation.service';
import {PlayersService} from './players.service';
import {NotificationService} from './notification.service';
import {SignalRService} from './signalr.service';
import {UiNotificationService} from './ui.notification.service';
import {CameraService} from './camera.service';
import {DesktopCameraService} from './desktop.camera.service';
import {MobileCameraService} from './mobile.camera.service';
import {XHRBackend, ConnectionBackend} from 'angular2/http';
import {PlatformInformationService} from './platform.information.service';

declare var window;

export var APP_SERVICES = [
    provide(ConnectionBackend, { useClass: XHRBackend }),
    Configuration,
    AuthenticatedHttp,
    LoginService,
    GamesService,
    GeolocationService,
    PlayersService,
    NotificationService,
    provide(CameraService, { useClass: window.cordova ? MobileCameraService : DesktopCameraService }),
    UiNotificationService,
    SignalRService,
    PlatformInformationService
];
