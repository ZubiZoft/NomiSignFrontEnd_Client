import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { ActivatedRoute, ParamMap } from '@angular/router';

//rxjs imports
import "rxjs/add/operator/switchMap";
import 'rxjs/add/operator/finally'

//import { AlertComponent } from '../alert/alert.component'
import { EmployeeService } from '../../services/employee.service'
import { ClientUserService } from '../../services/clientuser.service'
import { EmployeeModel } from '../../models/employee.model'
import { ClientUserModel } from '../../models/clientuser.model'
import { SettingsService } from '../../services/settings.service'

//angular material imports
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'ng-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [EmployeeService]
})
export class AccountComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute, public snackbar: MatSnackBar, private clientUserService: ClientUserService, private _formBuilder: FormBuilder, public dialog: MatDialog) { }

    clientUser: ClientUserModel;
    clientUserPasswordDetails: ClientUserModel
    // employeeID: string;
    isPromiseDone: boolean = false;
    usernameFormControl = new FormControl('', [
        Validators.email]);

    securityCodeFormControl = new FormControl('', [Validators.required]);

    passwordFormControl = new FormControl('', [Validators.required]);

    passwordVerifyFormControl = new FormControl('', [Validators.required, Validators.pattern('')]);

    ngOnInit(): void {
        this.clientUser = new ClientUserModel();
        this.clientUserPasswordDetails = new ClientUserModel();

      this.route.paramMap
          .switchMap((params: ParamMap) => this.clientUserService.getClientUserById(params.get('uid')))
          .subscribe(data => {
              this.clientUser = data;
              this.isPromiseDone = true; 
          });
  }

    reroute(activeUser) {
       
        // will need phone later maybe  this.employeePasswordDetails.EmailAddress === this.employee.EmailAddress &&
        if ( (!this.passwordVerifyFormControl.hasError('pattern')) ) {
            this.clientUser.PasswordHash = this.clientUserPasswordDetails.PasswordHash;
            //this.employee.SecurityCode = this.employeePasswordDetails.SecurityCode;
            // set user to active
            this.clientUser.UserStatus = 2;
            this.updateUserPassword();
            this.router.navigate(['/login']);
        }
        else {
            let dialogRef = this.dialog.open(PasswordAlertDialog, {
                width: '50%',
                data: {}
            }); 
        }
      
  }

  updateUserPassword() {
      this.route.paramMap
          .switchMap((params: ParamMap) => this.clientUserService.updateClientUserDetails(this.clientUser.ClientUserID.toString(), this.clientUser).finally(() => this.snackbar.open("sucessfully updated", "", { duration: 5000 })))
          .subscribe(data => this.clientUser = data,
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
