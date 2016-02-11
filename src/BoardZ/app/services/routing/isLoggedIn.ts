import {Injector} from 'angular2/core';
import {ComponentInstruction, Router} from 'angular2/router';

import {appInjector} from './appInjector';
import {TokenDataStore} from '../login/tokenDataStore';

export const isLoggedIn = (to: ComponentInstruction, from: ComponentInstruction, target = ['/Dashboard']) => {
    let injector: Injector = appInjector(); // Get the stored reference to the application injector
    let tokenStore: TokenDataStore = injector.get(TokenDataStore);
    let router: Router = injector.get(Router);

    // return a promise that resolves true/false
    return new Promise((resolve) => {

        tokenStore.check()
            .subscribe((result) => {
                if (result) {
                    resolve(true);
                } else {
                    router.navigate(['/Login', {target}]);
                    resolve(false);
                }
            });
    });
};