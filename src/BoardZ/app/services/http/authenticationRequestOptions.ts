import {Injectable} from 'angular2/core';
import {BaseRequestOptions, Headers} from 'angular2/http';

import {TokenDataStore} from '../login/tokenDataStore';

@Injectable()
export class AuthenticationRequestOptions extends BaseRequestOptions {

    constructor(tokenStore: TokenDataStore) {
        super();

        let token = tokenStore.token;

        if (token !== null) {
            if (!this.headers)
                this.headers = new Headers();

            this.headers.append('Authorization', 'Bearer ' + token);
        }
    }
}
