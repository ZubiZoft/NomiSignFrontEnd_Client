//angular imports
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
//rxjs imports
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

const rootURL: string = environment.serviceUrl;

@Injectable()
export class DocumentService {

    constructor(private http: Http) {}

    getDocumentsForClient(clientId): Observable<any> {
        let _headers = new Headers ({ })
        let options = new RequestOptions({method: 'GET', headers: _headers})
        let url = rootURL + 'api/client/documents/' + clientId;

        return this.http.get(url, options).map(response => response.json());
    }

    getClientDocumentData(clientId, documentId): Observable<any> {
        let _headers = new Headers ({ })
        let options = new RequestOptions({method: 'GET', headers: _headers})
        let url = rootURL + 'api/documents/' + clientId + '/' + documentId;

        return this.http.get(url, options).map(response => response.json());
    }
}