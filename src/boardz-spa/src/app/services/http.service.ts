import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {TokenService} from './token.service';
import {environment} from '../../environments/environment';
@Injectable()
export class AuthenticatedHttp {
    constructor(private _http: Http,
                private _tokenService: TokenService) {
    }

    private buildUrl(appendix: string): string {
        return `${environment.apiRootUrl}${appendix}`;
    }

    private getRequestOptions(): RequestOptions {
        const requestOptions = new RequestOptions();
        requestOptions.headers = new Headers();

        requestOptions.headers.append('Accept', 'application/json');
        requestOptions.headers.append('Accept', 'text/plain');
        requestOptions.headers.append('Accept', '*/*');
        requestOptions.headers.append('Content-Type', 'application/json;charset=UTF-8');
        const token = this._tokenService.token;
        if (token) {
            requestOptions.headers.append('Authorization', 'Bearer ' + token);
        }
        return requestOptions;
    }

    public request(url: string): Observable<Response> {
        url = this.buildUrl(url);
        return this._http.request(url, this.getRequestOptions());
    }

    public get(url: string): Observable<Response> {
        url = this.buildUrl(url);
        return this._http.get(url, this.getRequestOptions());
    }

    public post(url: string, body: string): Observable<Response> {
        url = this.buildUrl(url);
        return this._http.post(url, body, this.getRequestOptions());
    }

    public put(url: string, body: string): Observable<Response> {
        url = this.buildUrl(url);
        return this._http.put(url, body, this.getRequestOptions());
    }

    public delete(url: string): Observable<Response> {
        url = this.buildUrl(url);
        return this._http.delete(url, this.getRequestOptions());
    }
}
