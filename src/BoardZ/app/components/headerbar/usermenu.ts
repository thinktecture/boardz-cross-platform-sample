import {Component} from 'angular2/core';

import {LoginService} from '../../services/login/loginService';

@Component({
    selector: 'usermenu',
    templateUrl: 'app/components/headerbar/usermenu.html',
    styleUrls: ['app/components/headerbar/userMenuStyles.css']
})
export class UserMenu {
    public open: boolean = false;

    constructor(public loginService: LoginService) { }

    logout(event): void {
        event.preventDefault();

        this.loginService.unauthenticate();
        this.open = false;
    }
}
