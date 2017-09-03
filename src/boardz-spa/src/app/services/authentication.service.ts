import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {TokenService} from './token.service';
import {LogService} from './infrastructure/log.service';
import {TokenData} from '../models/tokenData';
import {environment} from '../../environments/environment';

@Injectable()
export class LoginService {
    private _lastLoginUnsuccessful: boolean;

    get isAuthenticated(): boolean {
        return this._tokenService.token !== null;
    }

    get username(): string {
        return this._tokenService.username;
    }

    constructor(private _logService: LogService,
                private _http: Http,
                private _router: Router,
                private _tokenService: TokenService) {
        this._tokenService.isAuthenticated()
            .subscribe((value) => {
                if (!value) {
                    this.logout();
                }
            });
    }

    /**
     * Logout the current user (remove token and navigate to unprotected route)
     */
    public logout(routeToLogin: boolean = true): void {
        this._logService.logDebug('LoginService.logout called');
        this._lastLoginUnsuccessful = false;
        this._tokenService.token = null;

        if (routeToLogin) {
            this._router.navigate(['/login']);
        }
    }

    /**
     * Login the user by her username and password
     * @param username
     * @param password
     * @returns {Subject<TokenData>}
     */
    public login(username: string, password: string): Observable<TokenData> {
        this.logout(false);

        const body = `grant_type=${environment.authN.grant}` +
            `&client_id=${environment.authN.clientId}` +
            `&client_secret=${environment.authN.clientSecret}` +
            `&username=${username}` +
            `&password=${password}` +
            `&scope=${environment.authN.scope}`;
        const options = new RequestOptions({headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})});

        return Observable.create((observer) => {
            this._http.post(`${environment.authN.url}connect/token`, body, options)
                .map(response => <TokenData>response.json())
                .subscribe(
                    (tokenData) => {
                        this.saveToken(tokenData.access_token);
                        this._tokenService.username = username;

                        const expiryDate = new Date();
                        expiryDate.setSeconds(expiryDate.getSeconds() + tokenData.expires_in);
                        this._tokenService.tokenExpiry = expiryDate;
                        observer.next(tokenData);
                    },
                    (error) => observer.error(error),
                    () => observer.complete()
                );
        });
    }

    handleError(error: TokenData) {
        this._logService.logDebug('LoginService encountered an error: ' + error);
        this._lastLoginUnsuccessful = true;
    }

    saveToken(token: string): void {
        this._logService.logVerbose('LoginService.saveToken: Saving token ' + token);
        this._lastLoginUnsuccessful = false;
        this._tokenService.token = token;
    }
}
