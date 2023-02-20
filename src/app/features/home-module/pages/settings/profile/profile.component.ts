import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private formbuilder: FormBuilder) {}
  userDetails!: FormGroup;
  isDisabled = true;
  btndsbl = true;
  icoe = false;
  icoc = true;
  ngOnInit(): void {
    this.formm();
  }
  enableForm() {
    this.icoe = true;
    this.icoc = false;
    this.isDisabled = false;
    this.btndsbl = false;
    // this.formm();
    this.userDetails.enable();
  }

  disableForm() {
    this.icoe = false;
    this.icoc = true;
    this.isDisabled = true;
    this.btndsbl = true;
    this.userDetails.disable();
    // this.formm();
  }

  formm() {
    this.userDetails = new FormGroup({
      firstname: new FormControl(
        { value: this.firstName, disabled: true },
        [Validators.required]
      ),
      lastname: new FormControl(
        { value: this.lastName, disabled:true },
        [Validators.required]
      ),
      mobile: new FormControl(
        { value: this.Phone, disabled: true },
        [Validators.required]
      ),
      company: new FormControl(
        { value: this.Company, disabled: true },
        [Validators.required]
      ),
      email: new FormControl({ value: this.Email, disabled: true }, [
        Validators.required,
      ]),
    });
  }

  userObj = JSON.parse(localStorage.getItem('user'));
  firstName = this.userObj.firstname;
  lastName = this.userObj.lastname;
  Phone = this.userObj.phone;
  Email = this.userObj.email;
  Company = this.userObj.company;
  accountType = this.userObj.accounttype;
  timeZone = '';
  fullname = this.firstName + ' ' + this.lastName;
}
