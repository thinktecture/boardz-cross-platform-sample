import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/Observable';

import {TokenService} from './tokenService';
import {AppConfiguration} from '../appConfig';
import {LogService} from './logService';
import {TokenData} from '../models/tokenData';
import {SignalRService} from './signalrService';

@Injectable()
export class LoginService {
    private _lastLoginUnsuccessful: boolean;

    get isAuthenticated(): boolean {
        return this._tokenService.token !== null;
    }

    get username(): string {
        return this._tokenService.username;
    }

    constructor(private _config: AppConfiguration,
                private _logService: LogService,
                private _http: Http,
                private _router: Router,
                private _tokenService: TokenService,
                private _signalRService: SignalRService) {
        this._tokenService.check()
            .subscribe((value) => {
                if (!value) this.logout();
            });
    }

    /**
     * Logout the current user (remove token and navigate to unprotected route)
     */
    public logout(): void {
        this._logService.logDebug('LoginService.logout called');

        this._signalRService.stop();
        this._lastLoginUnsuccessful = false;
        this._tokenService.token = null;

        this._router.navigate(['Login']);
    }

    /**
     * Login the user by her username and password
     * @param username
     * @param password
     * @returns {Subject<TokenData>}
     */
    public login(username: string, password: string): Observable<TokenData> {
        this.logout();

        let body = 'grant_type=password&username=' + username + '&password=' + password,
            options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) });

        return Observable.create((observer)=> {
            this._http.post(this._config.apiEndpoint + 'token', body, options)
                .map(response => <TokenData>response.json())
                .subscribe(
                    (tokenData) => {
                        this.saveToken(tokenData.access_token);
                        this._tokenService.username = username;

                        let expiryDate = new Date();
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

