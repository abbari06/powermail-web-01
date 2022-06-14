import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user-profile',
  templateUrl: './add-user-profile.component.html',
  styleUrls: ['./add-user-profile.component.scss']
})
export class AddUserProfileComponent implements OnInit {
  email:string;
  name:string;
  company:string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  AddProfileForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    name: ['', [Validators.required]],
    company: ['', [Validators.required]],

  });
}
