//angular imports
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
//rxjs imports
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
const rootURL: string = environment.serviceUrl;

@Injectable()
export class AuthService {
    constructor(private http: Http) {}

    loginUser(user): Observable<any> {
        let _headers = new Headers ({'Content-Type': 'application/json'})
        let options = new RequestOptions({method: 'POST', headers: _headers})
        let url = rootURL + 'api/clientlogin';
        let body = JSON.stringify(user)
        return this.http.post(url, body, options).map(response => response.json());
    }

    sendPasswordReset(user): Observable<any> {
        let _headers = new Headers({ 'Content-Type': 'application/json' })
        let options = new RequestOptions({ method: 'POST', headers: _headers })
        let url = rootURL + 'api/clientlogin/reset';
        let body = JSON.stringify(user)
        return this.http.post(url, body, options).map(response => response.json());
    }
}