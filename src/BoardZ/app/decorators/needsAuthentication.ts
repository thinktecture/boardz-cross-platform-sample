import {CanActivate, ComponentInstruction, Router} from '@angular/router-deprecated';
import {Injector} from '@angular/core';

import {appInjector} from '../services/appInjector';
import {TokenService} from '../services/tokenService';

export const NeedsAuthentication = () => {
    return CanActivate((to: ComponentInstruction, from: ComponentInstruction, target = ['/']) => {
        let injector: Injector = appInjector(); // Get the stored reference to the application injector
        let tokenService: TokenService = injector.get(TokenService);
        let router: Router = injector.get(Router);

        if (tokenService.token)
            return true;

        router.navigate(['Login', { target }]);
        
        return false;
    });
}
