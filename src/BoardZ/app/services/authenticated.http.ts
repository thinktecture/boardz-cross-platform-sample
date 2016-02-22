import {Injectable} from 'angular2/core';
import {Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Configuration} from '../app-config';
import {TokenDataStore} from './token.service';


@Injectable()
export class AuthenticatedHttp extends Http {

    constructor(protected _backend: ConnectionBackend, protected _defaultOptions: RequestOptions, protected _config: Configuration, protected _tokenStore: TokenDataStore) {
        super(_backend, _defaultOptions);
    }
    private buildUrl(appendix: string): string{
        return `${this._config.apiEndpoint}${appendix}`;
    }
    request(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.buildUrl(url);
        options = this.prepareOptions(options);
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.buildUrl(url);
        options = this.prepareOptions(options);
        return super.get(url, options);
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.buildUrl(url);
        options = this.prepareOptions(options);
        return super.post(url, body, options);
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.buildUrl(url);
        options = this.prepareOptions(options);
        return super.put(url, body, options);
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.buildUrl(url);
        options = this.prepareOptions(options);
        return super.delete(url, options);
    }
    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.buildUrl(url);
        options = this.prepareOptions(options);
        return super.patch(url, body, options);
    }

    head(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.buildUrl(url);
        options = this.prepareOptions(options);
        return super.head(url, options);
    }

    protected prepareOptions(options: RequestOptionsArgs): RequestOptionsArgs {
        var token = this._tokenStore.token;

        if (token) {
            options = options ||{ };

            if (!options.headers)
                options.headers = new Headers();

            options.headers.append('Authorization', 'Bearer ' + token);
        }

        return options;
    }
}
