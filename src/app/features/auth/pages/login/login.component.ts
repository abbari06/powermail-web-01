import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  email:string;
  token: any;
  status:any;
  message:string = null;
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private authService:AuthService,
    private router:Router
  ) {}
  ngOnInit(): void {
    if(history.state.data){
    this.message = `${history.state.data.status}!!  ${history.state.data.message}`
    if(this.message != null){
      this.openSnackBar()
    }
    }
  
  }
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  openSnackBar() {
    this._snackBar.open(this.message, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  
  }
  loginUser(){
    this.authService.login(this.loginForm.value);
    // if(this.authService.loginError==false){
    //   console.log( this.authService.button) ;
    //   this._snackBar.open("Invalid Credentials", 'Close', {
    //     horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //   });
    // }
 
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
}
