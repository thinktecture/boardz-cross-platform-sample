import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/loginService';
import {LogService} from '../../services/logService';
import {NotificationService} from '../../services/notificationService';
import {SignalRService} from '../../services/signalrService';
import {AgeRatingsService} from '../../services/ageRatingsService';

@Component({
    moduleId: module.id,
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
                private _signalRService: SignalRService,
                private _ageRatingsService: AgeRatingsService
    ) {
    }

    public doLogin(): void {
        this._logService.logDebug('LoginComponent.doLogin called');

        this._loginService.login(this._userName, this._password)
            .subscribe(
                () => {
                    this._ageRatingsService.initialize();

                    this._signalRService.start();
                    this.setError(false);
                    this._router.navigate(['']);
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
