import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {TokenService} from '../services/tokenService';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _tokenService: TokenService) {

    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return Observable.create(observer => {
            this._tokenService.isAuthenticated()
                .subscribe(
                    (isOk) => {
                        //noinspection TsLint
                        if (isOk) {
                            return observer.next(isOk);
                        }
                        this.navigateToLogin();
                        return observer.next(false);
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
