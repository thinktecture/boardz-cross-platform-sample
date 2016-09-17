import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {TokenService} from '../services/tokenService';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private _router: Router, private _tokenService: TokenService) {
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return Observable.create(observer => {
            this._tokenService.isAuthenticated()
                .subscribe(
                    (isAuthenticated) => {
                        isAuthenticated ? observer.next(isAuthenticated) : this.navigateToLogin() && observer.next(false);
                    },
                    (error) => {
                        this.navigateToLogin();
                        observer.next(false);
                    }, () => {
                        observer.complete();
                    });
        });
    }

    private navigateToLogin() {
        this._router.navigate(['/login']);
    }
}
