import {Component, Input} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Router} from 'angular2/router';

import {Breadcrumb} from '../breadcrumb/breadcrumb';
import {Logger} from '../../services/logging/logger';
import {TokenDataStore} from '../../services/login/tokenDataStore';
import {NotificationsMenu} from './notificationsMenu';
import {LoginService} from '../../services/login/loginService';

@Component({
    selector: 'headerbar',
    directives: [NgClass, Breadcrumb, NotificationsMenu],
    templateUrl: 'app/components/headerbar/headerbar.html'
})
export class Headerbar {
    @Input()
    public showAppname: boolean;

    public loggedIn: boolean = false;

    public currentLocation: string = 'BoardZ!';
    public showUser: boolean = true;
    public notificationsOpen: boolean = false;

    constructor(public loginService: LoginService, public tokenStore: TokenDataStore, private _router: Router, private _logger: Logger) {

        tokenStore.check()
            .subscribe(result => {
                this._logger.logDebug('Headerbar: Received notification about tokenstore status change. Result: ' + result);
                this.loggedIn = result
            });


        while (this._router.parent) {
            this._router = this._router.parent;
        }

        this._router.subscribe(routeUrl => {
            this._logger.logVerbose('Headerbar detected routing to: ' + routeUrl);

            this._router.recognize(routeUrl).then(instruction => {
                while (instruction.child) {
                    instruction = instruction.child;
                }

                this.currentLocation = instruction.component.routeData.get('displayName');
            });
        });
    }

    logout(event): void {
        event.preventDefault();

        this.loginService.logout();

    }
}
