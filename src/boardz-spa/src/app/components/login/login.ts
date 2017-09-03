import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/authentication.service';
import {LogService} from '../../services/infrastructure/log.service';
import {NotificationService} from '../../services/notifications/notification.service';
import {AgeRatingsService} from '../../services/ageratings.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: 'login.html'
})
export class LoginComponent {

    public hasError = false;

    public login = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    get username(): AbstractControl {
        return this.login.get('username');
    }

    get password(): AbstractControl {
        return this.login.get('password');
    }

    constructor(private _router: Router,
                private _loginService: LoginService,
                private _logService: LogService,
                private _notificationService: NotificationService,
                private _ageRatingsService: AgeRatingsService) {
    }

    public doLogin(): void {
        this._logService.logDebug('LoginComponent.doLogin called');

        this._loginService.login(this.login.value.username, this.login.value.password)
            .subscribe(
                () => {
                    this._ageRatingsService.getAllAgeRatings().subscribe();
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
        this.hasError = value;
    }
}
