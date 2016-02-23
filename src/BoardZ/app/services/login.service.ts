import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Router} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {TokenDataStore} from './token.service';
import {Configuration} from '../app-config';
import {TokenData} from '../models/tokendata';
import {SignalRService} from './signalr.service';

@Injectable()
export class LoginService {

    private _lastLoginUnsuccessful: boolean;

    get isAuthenticated(): boolean {
        return this._tokenStore.token !== null;
    }

    get username(): string {
        return this._tokenStore.username;
    }

    constructor(private _config: Configuration,
                private _http: Http,
                private _router: Router,
                private _tokenStore: TokenDataStore,
                private _signalRService: SignalRService) {
        this._tokenStore.check()
            .subscribe((value) => {
                if (!value) this.logout();
            });
    }

    /**
     * Logout the current user (remove token and navigate to unprotected route)
     */
    public logout(): void {
        this._signalRService.stop();
        this._lastLoginUnsuccessful = false;
        this._tokenStore.token = null;

        this._router.navigate(['Login']);
    }

    /**
     * Login the user by her username and password
     * @param username
     * @param password
     * @returns {Subject<TokenData>}
     */
    public challenge(username: string, password: string): Observable<void> {
        this.logout();

        const body = 'grant_type=password&username=' + username + '&password=' + password;
        const options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) });
        const request = this._http.post(this._config.apiEndpoint + 'token', body, options)
            .map(response => <TokenData>response.json())
            .map(tokenData => {
                    this.saveToken(tokenData.access_token);
                    this._tokenStore.username = username;

                    let expiryDate = new Date();
                    expiryDate.setSeconds(expiryDate.getSeconds() + tokenData.expires_in);
                    this._tokenStore.tokenExpiry = expiryDate;
                },
                error => this.handleError(error)
            );

        return request;
    }

    handleError(error: TokenData) {
        this._lastLoginUnsuccessful = true;
    }

    saveToken(token: string): void {
        this._lastLoginUnsuccessful = false;
        this._tokenStore.token = token;
    }
}

