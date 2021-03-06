import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import { EmployeeModel } from '../models/employee.model'
import { User } from '../models/user.model'

import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

 const rootURL: string = environment.serviceUrl;

@Injectable()
export class EmployeeService {
    
    constructor( private http: Http ) {}
   
    //GET/:cid/:eid
    getEmployeeById(employeeId: string): Observable<any>{
        var _headers = new Headers ({})
        return this.http.get(rootURL + 'api/employee/' + employeeId, {headers: _headers}).map(response => response.json());
    }
    //PUT
    updateEmployeeDetails(employeeId: string, employee: EmployeeModel): Observable<any>{
        var _headers = new Headers ({'Content-Type': 'application/json'})
        var options = new RequestOptions({method: 'PUT', headers: _headers})
        var body = JSON.stringify(employee);
        var url = rootURL + 'api/employees/' + employeeId 
        return this.http.put(url, body, options).map(response => response.json());
    }

}