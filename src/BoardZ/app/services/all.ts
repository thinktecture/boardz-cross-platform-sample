import {provide} from 'angular2/core';
import {ApplicationConfiguration, Configuration} from '../app-config';
import {AuthenticatedHttp} from './authenticated.http';
import {LoginService} from './login.service';
import {LogLevel} from '../models/loglevel';
import {GamesService} from './games.service';
import {GeolocationService} from './geolocation.service';
import {PlayersService} from './players.service';
import {NotificationService} from './notification.service';
import {SignalRService} from './signalr.service';
import {UiNotificationService} from './ui.notification.service';
import {CameraService} from './camera.service';
import {DesktopCameraService} from './desktop.camera.service';
import {MobileCameraService} from './mobile.camera.service';

declare var window;

export var APP_SERVICES = [
    Configuration,
    AuthenticatedHttp,
    LoginService,
    LogLevel,
    GamesService,
    GeolocationService,
    PlayersService,
    NotificationService,
    provide(CameraService, { useClass: window.cordova ? MobileCameraService : DesktopCameraService }),
    UiNotificationService,
    SignalRService,
];
