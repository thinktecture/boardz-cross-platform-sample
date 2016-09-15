import {Component, AfterViewInit} from '@angular/core';
import {LogService} from './services/logService';
import {LogLevel} from './models/logLevel';
import {SignalRService} from './services/signalrService';
import {LoginService} from './services/loginService';
import {NotificationService} from './services/notificationService';
import {UiNotificationService} from './services/uiNotificationService';
import {NativeIntegrationService} from './services/nativeIntegrationService';
import {IBoardZAppWindow} from './interfaces/boardzAppWindow';

declare var window: IBoardZAppWindow;

@Component({
    moduleId: module.id,
    selector: 'boardz-app',
    templateUrl: 'app.html'
})

export class BoardzAppComponent implements AfterViewInit {
    constructor(private _signalRService: SignalRService,
                private _loginService: LoginService,
                private _notificationService: NotificationService,
                private _nativeIntegrationService: NativeIntegrationService,
                private _uiNotificationService: UiNotificationService,
                private _logService: LogService) {
        _logService.maximumLogLevel = LogLevel.Verbose;
        _uiNotificationService.subscribeToNotifications();
    }

    public ngAfterViewInit(): any {
        if (window.initAdminLTE) {
            window.initAdminLTE();
        }

        if (this._loginService.isAuthenticated) {
            this._signalRService.start();
        }

        this._signalRService.someoneJoinedAGame.subscribe(message => {
            this._notificationService.notifyInformation(message);
        });

        this._nativeIntegrationService.registerNavigationHook();
    }
}
