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
import { StripeComponent } from 'src/app/features/home-module/pages/stripe/stripe.component';
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
  loading:any;
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
   let error= this.authService.login(this.loginForm.value)
   // console.log(error);
    
    //setTimeout(() => {
      // if(!this.authService.userModel.trialPlan){
      //   this.loading=false;
      //     this.openStripeDialogue(this.authService.userModel.email) 
      // }
      if(error){
        console.log(error);
        setTimeout(() => {
          this.loading=false;
        }, 1000);
       // 
        
       }
   // }, 1000);
    
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
        if (result !=='') {
          console.log(result);
          this.openSnackBar(result);
        }
        console.log(this.authService.returnMessage());
      }, 2000);
    });
  }
  // openStripeDialogue(email): void {
  //   console.log(email);
    
  //   const dialogRef = this.dialog.open(StripeComponent, {
  //     disableClose: true,
  //     data:email,
  //     width: '95%',
  //     height: '95%',
      
  //   });
  //   dialogRef.afterClosed().subscribe({
  //     next:()=>{
        
  //     }
  //     })
  // }
}
