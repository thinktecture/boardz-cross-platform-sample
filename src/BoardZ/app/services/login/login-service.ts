import {Injectable, Inject} from "angular2/core";
import {Http, Headers} from "angular2/http";
import {Configuration} from "../../app-config";
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
    private _token: string;

    constructor(@Inject('app.config') private _config: Configuration, private _http: Http) { }

    authenticate (username: string, password: string): void {

        let body = 'grant_type=password&username=' + username + '&password=' + password,
            headers = new Headers();

        headers.append('Content-Type', 'application/x-www-form-urlencoded')

        this._http.post(this._config.apiEndpoint + 'token',
            body, { headers: headers })
            .map(response => response.json())
            .subscribe(
                data => this.saveToken(data.access_token),
                err => this.handleError(err),
                () => console.log('Authentication complete')
            );
    }

    handleError (error): void {
        console.log('Error: ' + error);
    }

    saveToken (token: string): void {
        console.log('Savin token: ' + token);
        this._token = token;
    }

    getToken (): string {
        return this._token;
    }

}

