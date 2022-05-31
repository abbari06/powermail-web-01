import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  accountType = false;

account= null;
  constructor( private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
  }

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    phone: ['',Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
    company: [''],
    password: ['', [Validators.required, Validators.minLength(6)]],
    accountType: ['this.account'],
  });

}
