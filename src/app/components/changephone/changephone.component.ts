﻿import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

//rxjs imports
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/finally'

//import { AlertComponent } from '../alert/alert.component'
import { EmployeeService } from '../../services/employee.service'
import { EmployeeModel } from '../../models/employee.model'
import { SettingsService } from '../../services/settings.service'

//angular material imports
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'ng-changephone',
  templateUrl: './changephone.component.html',
  styleUrls: ['./changephone.component.css'],
  providers: [EmployeeService]
})
export class ChangePhoneComponent implements OnInit {
    constructor(private router: Router, private _location: Location, private route: ActivatedRoute, public snackbar: MatSnackBar, private employeeService: EmployeeService, private _formBuilder: FormBuilder, public dialog: MatDialog) { }

    employee: EmployeeModel;
    employeePasswordDetails: EmployeeModel
    // employeeID: string;
    isPromiseDone: boolean = false;
    usernameFormControl = new FormControl('', [
        Validators.email]);

    passwordFormControl = new FormControl('', [Validators.required]);

    phoneFormControl = new FormControl('', [Validators.required]);

    phoneVerifyFormControl = new FormControl('', [Validators.required, Validators.pattern('')]);

    ngOnInit(): void {
        this.employeePasswordDetails = new EmployeeModel();

      this.route.paramMap
          .switchMap((params: ParamMap) => this.employeeService.getEmployeeById(params.get('uid')))
          .subscribe(data => {
              this.employee = data;
              this.isPromiseDone = true; 
          });
  }

    

    reroute(activeUser) {
       
        // will need phone later maybe  this.employeePasswordDetails.EmailAddress === this.employee.EmailAddress &&
        if ((!this.phoneVerifyFormControl.hasError('pattern')) ) {
            this.employee.CellPhoneNumber = this.employeePasswordDetails.CellPhoneNumber;
            this.updateUserPhone();
            this._location.back();
        }
        else {
            let dialogRef = this.dialog.open(PasswordAlertDialog, {
                width: '50%',
                data: {}
            }); 
        }
      
  }

  updateUserPhone() {
      this.route.paramMap
          .switchMap((params: ParamMap) => this.employeeService.updateEmployeeDetails(this.employee.EmployeeId, this.employee).finally(() => this.snackbar.open("sucessfully updated", "", { duration: 5000 })))
          .subscribe(data => this.employee = data,
          error => this.snackbar.open(error, "", { duration: 5000 }))
  }

}

@Component({
    selector: 'password-alert-dialog',
    templateUrl: '../login/login-alert.dialog.html',
})
export class PasswordAlertDialog {

    constructor(public dialogRef: MatDialogRef<PasswordAlertDialog>) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
