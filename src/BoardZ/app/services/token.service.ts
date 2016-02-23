import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

const tokenKey: string = 'Authentication::Token';
const usernameKey: string = 'Authentication::Username';
const expiryKey: string = 'Authentication::TokenExpiration';

@Injectable()
export class TokenDataStore {

    private _authenticated: boolean;

    constructor() {
        var token = this.token;
        if ((typeof token !== 'undefined') && (token !== null))
            this._authenticated = true;
    }

    public get token(): string {
        let token = localStorage.getItem(tokenKey);

        return token;
    }

    public set token(token: string) {
        if (token === null) {
            localStorage.removeItem(tokenKey);
            this.username = null;
            this.tokenExpiry = null;
            this._authenticated = false;
        } else {
            localStorage.setItem(tokenKey, token);
            this._authenticated = true;
        }
    }

    public get username(): string {
        let username = localStorage.getItem(usernameKey);

        return username;
    }

    public set username(username: string) {
        if (username === null) {
            localStorage.removeItem(usernameKey);
        } else {
            localStorage.setItem(usernameKey, username);
        }
    }

    public get tokenExpiry(): Date {
        let value = localStorage.getItem(expiryKey);
        return (value !== null) ? new Date(value) : null;
    }

    public set tokenExpiry(expiryDate: Date) {
        if (expiryDate === null) {
            localStorage.removeItem(expiryKey);
        } else {
            localStorage.setItem(expiryKey, expiryDate.toISOString());
        }
    }

    check(): Observable<boolean> {
        return Observable.of(this._authenticated);
    }
}
