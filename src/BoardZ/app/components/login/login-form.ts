import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Validators, ControlGroup} from 'angular2/common';

import {LoginService} from '../../services/login/login-service';

@Component({
    selector: 'login-form',
    providers: [LoginService, FormBuilder],
    directives: [FORM_DIRECTIVES],
    template: `
    <style>
        .ng-invalid {
            border: 1px solid red;
        }
    </style>
    <form [ngFormModel]="credentialForm" (submit)="doLogin($event)">

        <label for="username">User name: </label>
        <input id="username" type="text" ngControl="username" placeholder="User name" />
        <span [hidden]="credentialForm.controls['username'].valid || credentialForm.controls['username'].pristine" class="ng-invalid">Username is required</span>

        <label for="password">Password: </label>
        <input id="password" type="password" ngControl="password" placeholer="Password" />
        <span [hidden]="credentialForm.controls['password'].valid || credentialForm.controls['password'].pristine" class="ng-invalid">Password is required</span>

        <button (click)="doLogin($event)" >Login</button>

        <div [hidden]="!loginError" class="ng-invalid">
            Login failed.
        </div>
    </form>
    `
})
export class LoginForm {

    public credentialForm: ControlGroup;
    public loginError: boolean = false;

    constructor(private _loginService: LoginService, formBuilder: FormBuilder) {
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
                () => { this.setError(false); },
                () => { this.setError(true); }
            );
    }

    setError(value: boolean) {
        console.log('Setting error state to: ' + value);
        this.loginError = value;
    }
}