import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup, NgClass} from 'angular2/common';
import {Router, ROUTER_DIRECTIVES, CanDeactivate, ComponentInstruction} from 'angular2/router';

import {LoginService} from '../../services/login/login-service';

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

    constructor(private _router: Router, private _loginService: LoginService, formBuilder: FormBuilder) {
        this.credentialForm = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    doLogin(evt): void {
        console.log('Submitting by event: ' + evt.toString())
        evt.preventDefault();

        this.triedAbort = false;

        var username = this.credentialForm.controls['username'].value,
            password = this.credentialForm.controls['password'].value;

        console.log('Calling "authenticate" and submitting: ' + username + ':' + password);

        this._loginService.authenticate(username, password)
            .subscribe(
                () => { this.setError(false); this._router.navigate(['Dashboard']) },
                () => { this.setError(true); }
            );
    }

    tryAbort(evt): void {
        evt.preventDefault();

        this.triedAbort = true;
    }

    setError(value: boolean) {
        console.log('Setting error state to: ' + value);
        this.loginError = value;
    }

    routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
        return !this.loginError && this._loginService.isLoggedIn;
    }
}