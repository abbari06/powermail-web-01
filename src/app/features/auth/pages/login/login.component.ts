import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  token: any;
  status: any;
  message: string = null;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (history.state.data) {
      console.log(history.state.data);
      this.message = `${history.state.data.status}!!  ${history.state.data.message}`;
      if (this.message != null) {
        this.openSnackBar(this.message);
      }
    }
    if (history.state.mode == 'setpassword') {
      this.message = history.state.data;
      console.log(this.message);
      this.openSnackBar(this.message);
    }
  }
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  openSnackBar(message) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  loginUser() {
    this.loading = true;
    this.authService.login(this.loginForm.value);
    setTimeout(() => {
      var isError = this.authService.loginError;
      this.loading = false;
      var message = this.authService.getErrorMessage();
      console.log(message);
      if (isError) {
        console.log(isError);
        this.authService.loginError = false;
        this.openSnackBar(message);
        this.loading = false;
      }
      this.authService.loginError = false;
      console.log(message);
    }, 2000);
  }
  openDialogue(): void {
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '400px',
      height: '290px',
      data: { email: this.email },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      setTimeout(() => {
        result = this.authService.returnMessage();
        if (result != undefined) {
          console.log(result);
          this.openSnackBar(result);
        }
        console.log(this.authService.returnMessage());
      }, 2000);
    });
  }
}
