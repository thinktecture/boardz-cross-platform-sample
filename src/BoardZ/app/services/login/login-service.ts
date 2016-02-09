import {Injectable, Inject} from 'angular2/core';
import {Http, Headers, RequestOptions, Response} from 'angular2/http';
import {Configuration} from '../../app-config';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import createLanguageServiceSourceFile = ts.createLanguageServiceSourceFile;

interface TokenData{
    access_token: string;
    token_type: string;
    expires_in: number;
}

@Injectable()
export class LoginService {

    private _token: string = null;
    private _lastLoginUnsuccessful: boolean = false;


    get token(): string {
        return this._token;
    }

    get isLoggedIn(): boolean {
        return this._token !== null;
    }

    constructor(@Inject('app.config') private _config: Configuration, private _http: Http) { }

    unauthenticate() : void {
        console.log('Unauthenticating...');
        this._lastLoginUnsuccessful = false;
        this._token = null;
    }

    authenticate (username: string, password: string): Observable<TokenData> {
        this.unauthenticate();

        let body = 'grant_type=password&username=' + username + '&password=' + password,
            options = new RequestOptions( { headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})}),
            request = this._http.post(this._config.apiEndpoint + 'token', body, options)
                .map(response => <TokenData>response.json()),
            multiplexer = new Subject();

        multiplexer.subscribe(
            tokenData => this.saveToken(tokenData.access_token),
            error => this.handleError(error)
        );

        request.subscribe(multiplexer);
        return multiplexer;
    }

    handleError (error: Response) {
        console.log('Error: ' + error);

        this._lastLoginUnsuccessful = true;
    }

    saveToken (token: string): void {
        console.log('Saving token: ' + token);

        this._lastLoginUnsuccessful = false;
        this._token = token;
    }
}

