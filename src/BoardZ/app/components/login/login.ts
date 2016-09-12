import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';

import {LoginService} from '../../services/loginService';
import {LogService} from '../../services/logService';
import {NotificationService} from '../../services/notificationService';
import {SignalRService} from '../../services/signalrService';

@Component({
    moduleId: __moduleName,
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    private _userName: string;
    private _password: string;

    public _hasError: boolean = false;
    
    constructor(private _router: Router,
                private _loginService: LoginService,
                private _logService: LogService,
                private _notificationService: NotificationService,
                private _signalRService: SignalRService) {
    }

    public doLogin(): void {
        this._logService.logDebug('LoginComponent.doLogin called');
        
        this._loginService.login(this._userName, this._password)
            .subscribe(
                () => {
                    this._signalRService.start();
                    this.setError(false);
                    this._router.navigate(['Dashboard'])
                },
                () => {
                    this.setError(true);
                    this._notificationService.notifyError('Login was unsuccessful.');
                }
            );
    }

    setError(value: boolean) {
        this._logService.logDebug('LoginComponent.setError: Setting error state to: ' + value);
        this._hasError = value;
    }
}
