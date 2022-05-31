import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
email:string;
 
  constructor( private formBuilder: FormBuilder) { }
  ngOnInit(): void {
  }
  forgotPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

}
