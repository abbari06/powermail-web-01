import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
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

  signUp() {
    this.openSnackBar();
  }
}
