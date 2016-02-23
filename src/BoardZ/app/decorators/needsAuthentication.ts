import {CanActivate, ComponentInstruction, Router} from 'angular2/router';
import {Injector} from 'angular2/core';
import {appInjector} from '../services/app.injector';
import {TokenDataStore} from '../services/token.service';

export const NeedsAuthentication = () => {
    return CanActivate((to: ComponentInstruction, from: ComponentInstruction, target = ['/']) => {
        let injector: Injector = appInjector(); // Get the stored reference to the application injector
        let tokenStore: TokenDataStore = injector.get(TokenDataStore);
        let router: Router = injector.get(Router);

        if (tokenStore.token)
            return true;

        router.navigate(['/Login', { target }]);
        return false;
    });
}