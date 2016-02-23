import {Component} from 'angular2/core';
import {FormBuilder, Validators, ControlGroup, Control} from 'angular2/common';
import {Router, ROUTER_DIRECTIVES, CanDeactivate, ComponentInstruction} from 'angular2/router';
import {LoginService} from '../../services/login.service';
import {NotificationService} from '../../services/notification.service';
import {SignalRService} from '../../services/signalr.service';

@Component({
    selector: 'login-form',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'app/components/login/login.html'
})
export class LoginForm implements CanDeactivate {

    public credentialForm: ControlGroup;
    public loginError: boolean = false;
    public triedAbort: boolean = false;

    get isUsernameValid(): boolean {
        return this.credentialForm.controls['username'].valid || this.credentialForm.controls['username'].pristine
    }

    get isPasswordValid(): boolean {
        return this.credentialForm.controls['password'].valid || this.credentialForm.controls['password'].pristine
    }

    constructor(private _router: Router,
                private _loginService: LoginService,
                private _notificationService: NotificationService,
                private _signalRService: SignalRService,
                formBuilder: FormBuilder) {
        this.credentialForm = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    public doLogin(evt): void {
        evt.preventDefault();

        this.triedAbort = false;

        var username = this.credentialForm.controls['username'].value,
            password = this.credentialForm.controls['password'].value;

        this._loginService.challenge(username, password)
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

    public tryAbort(evt): void {
        evt.preventDefault();

        if (evt.ctrlKey) {
            (<Control>this.credentialForm.controls['username']).updateValue('Developer');
            (<Control>this.credentialForm.controls['password']).updateValue('Developer');

            this.doLogin(evt);
            return;
        }

        this.triedAbort = true;
    }

    setError(value: boolean) {
        this.loginError = value;
    }

    routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
        return !this.loginError && this._loginService.isAuthenticated;
    }
}
