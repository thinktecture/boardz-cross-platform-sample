import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgClass, Control} from 'angular2/common';
import {Router, ROUTER_DIRECTIVES, CanDeactivate, ComponentInstruction} from 'angular2/router';

import {LoginService} from '../../services/login/login-service';
import {Logger} from '../../services/logging/logger';

@Component({
    selector: 'login-form',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES, NgClass],
    templateUrl: 'app/components/login/login-form.html'
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

    constructor(private _router: Router, private _loginService: LoginService, private _logger: Logger, formBuilder: FormBuilder) {
        this.credentialForm = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    doLogin(evt): void {
        this._logger.logDebug('LoginForm.doLogin called via event: ' + evt.toString());
        evt.preventDefault();

        this.triedAbort = false;

        var username = this.credentialForm.controls['username'].value,
            password = this.credentialForm.controls['password'].value;

        this._logger.logVerbose('LoginForm.doLogin calling "authenticate" and submitting: ' + username + ':' + password);

        this._loginService.authenticate(username, password)
            .subscribe(
                () => { this.setError(false); this._router.navigate(['Dashboard']) },
                () => { this.setError(true); }
            );
    }

    tryAbort(evt): void {
        evt.preventDefault();

        if (evt.ctrlKey)
        {
            this._logger.logDebug('LoginForm: Developer-shortcut activated.');
            (<Control>this.credentialForm.controls['username']).updateValue('Developer');
            (<Control>this.credentialForm.controls['password']).updateValue('Developer');

            this.doLogin(evt);
            return;
        }

        this.triedAbort = true;
    }

    setError(value: boolean) {
        this._logger.logDebug('LoginForm.setError: Setting error state to: ' + value);
        this.loginError = value;
    }

    routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
        return !this.loginError && this._loginService.isLoggedIn;
    }
}