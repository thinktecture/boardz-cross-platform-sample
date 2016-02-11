import {Component} from 'angular2/core';

import {LoginService} from '../../services/login/loginService';
import {TokenDataStore} from '../../services/login/tokenDataStore';
import {Logger} from '../../services/logging/logger';

@Component({
    selector: 'usermenu',
    templateUrl: 'app/components/headerbar/usermenu.html'
})
export class UserMenu {

    public loggedIn: boolean = false;
    public open: boolean = false;

    constructor(public loginService: LoginService, tokenStore: TokenDataStore, logger: Logger) {

        tokenStore.check()
            .subscribe(result => {
                logger.logDebug('UserMenu: Received notification about tokenstore status change. Result: ' + result);
                this.loggedIn = result
            });
    }

    logout(event): void {
        event.preventDefault();

        this.loginService.unauthenticate();
        this.open = false;
    }
}
