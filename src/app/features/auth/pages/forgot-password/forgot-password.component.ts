import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
email:string;
 
  constructor( private formBuilder: FormBuilder,private router:Router,private authservice:AuthService) { }
  ngOnInit(): void {
  }
  forgotPasswordForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  resetPasswordInitiate(){
    this.authservice.resetInitiated(this.forgotPasswordForm.value)
  }
}
