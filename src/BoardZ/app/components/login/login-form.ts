import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup} from 'angular2/common';
import {Router, ROUTER_DIRECTIVES, CanDeactivate, ComponentInstruction} from 'angular2/router';

import {LoginService} from '../../services/login/login-service';

@Component({
    selector: 'login-form',
    directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
    templateUrl: 'components/login/login-form.html'
})
export class LoginForm implements CanDeactivate {

    public credentialForm: ControlGroup;
    public loginError: boolean = false;

    constructor(private _router: Router, private _loginService: LoginService, formBuilder: FormBuilder) {
        this.credentialForm = formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    doLogin(evt): void {
        console.log('Submitting by event: ' + evt.toString())
        evt.preventDefault();

        var username = this.credentialForm.controls['username'].value,
            password = this.credentialForm.controls['password'].value;

        console.log('Calling "authenticate" and submitting: ' + username + ':' + password);

        this._loginService.authenticate(username, password)
            .subscribe(
                () => { this.setError(false); this._router.navigate(['Dashboard']) },
                () => { this.setError(true); }
            );
    }

    setError(value: boolean) {
        console.log('Setting error state to: ' + value);
        this.loginError = value;
    }

    routerCanDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
        return !this.loginError && this._loginService.isLoggedIn;
    }
}