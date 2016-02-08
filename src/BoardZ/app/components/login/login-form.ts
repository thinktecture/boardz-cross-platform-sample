import {Component} from "angular2/core";
import {LoginService} from "../../services/login/login-service";

@Component({
    selector: 'login-form',
    template: `
        <input type="text" [(ngModel)]="credentialModel.username" />
        <input type="password" [(ngModel)]="credentialModel.password" />
        <button (click)="onSubmit()" >Anmelden</button>
    `
})
export class LoginForm {

    public credentialModel;

    constructor(private _loginService: LoginService) {
        this.credentialModel = { username: '', password: '' };
    }

    onSubmit(): void {
        console.log('Submitting...');
        this._loginService.authenticate(this.credentialModel.username, this.credentialModel.password);
    }
}