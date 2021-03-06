import { Component, OnInit, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DocumentService } from '../../services/documents.service';
import { UserService } from '../../services/user.service';

import { User } from '../../models/user.model'
import { Document } from '../../models/document.model'

import { Sort } from '@angular/material';
import { MatTableModule } from '@angular/material';
import {DataSource} from '@angular/cdk/collections';

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
    user: User
    documents: Document[];
    //dataSource = new MatTableDataSource<Document>(this.documents);
    isPromiseDone: boolean = false
    showAll = false
    docsWithSignStatus1Exist = false
    displayedColumns = ['position', 'name', 'weight', 'symbol'];

    sortedDocument
    constructor(private documentService: DocumentService, private userService: UserService, private elementRef: ElementRef) {

    }

    sortDocuments(sort: Sort) {
        const data = this.documents.slice();
        if (!sort.active || sort.direction == '') {
            this.sortedDocument = data;
            return;
        }

        this.sortedDocument = data.sort((a, b) => {
            let isAsc = sort.direction == 'asc';
            switch (sort.active) {
                case 'SignStatus': return this.compare(+a.SignStatus, +b.SignStatus, isAsc);
                case 'DocumentId': return this.compare(+a.DocumentId, +b.DocumentId, isAsc);
                default: return 0;
            }
        });
    }

    compare(a, b, isAsc) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    ngOnInit() {
        this.user = this.userService.getUser()
        this.documentService.getDocumentsForClient(this.user.ClientCompanyID).subscribe(data => {
            data.forEach(doc => {
                console.log(doc.SignStatus)
                if (doc.SignStatus === 'Sin Firma'){
                    this.docsWithSignStatus1Exist = true;
                }
            }); 
            this.documents = data;
            this.sortedDocument = this.documents.slice();
            this.isPromiseDone = true;
        });
    }
}