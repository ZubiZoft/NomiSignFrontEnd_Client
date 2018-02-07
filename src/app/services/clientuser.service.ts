import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import { EmployeeModel } from '../models/employee.model'
import { ClientUserModel } from '../models/clientuser.model'
import { User } from '../models/user.model'

import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

const rootURL: string = environment.serviceUrl;

@Injectable()
export class ClientUserService {

    constructor(private http: Http) { }
   
    //GET/:cid/:eid
    getClientUserById(clientUserId: string): Observable<any> {
        var _headers = new Headers({})
        return this.http.get(rootURL + 'api/clientuser/' + clientUserId, { headers: _headers }).map(response => response.json());
    }
    //PUT
    updateClientUserDetails(clientUserId: string, clientUser: ClientUserModel): Observable<any> {
        var _headers = new Headers({ 'Content-Type': 'application/json' })
        var options = new RequestOptions({ method: 'PUT', headers: _headers })
        var body = JSON.stringify(clientUser);
        var url = rootURL + 'api/clientuser/password/' + clientUserId
        return this.http.put(url, body, options).map(response => response.json());
    }

}