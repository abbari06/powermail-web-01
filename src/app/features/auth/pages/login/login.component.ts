import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email:string;

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  openSnackBar() {
    this._snackBar.open('Email or Password are incorrect', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  
  }
    openDialogue(): void {
      const dialogRef = this.dialog.open(ForgotPasswordComponent, {
        width: '400px',
        height: '290px',
        data: {email: this.email},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.email = result;
      });
    }

  signUp() {
    this.openSnackBar();
  }
}
