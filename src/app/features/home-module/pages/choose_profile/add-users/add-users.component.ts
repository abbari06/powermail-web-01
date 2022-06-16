import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/choose_profile/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  email:string;
  name:string;
  company:string;
  parentUserEmail=this.authservice.userModel.email;
  id:number;
  totalAccounts:any;

  constructor(private formBuilder: FormBuilder,private userService:UserService,private authservice:AuthService) {
    // this.parentUserEmail=
   }
AddProfileForm: FormGroup
  ngOnInit(): void {
    this.getId();
    this.AddProfileForm = this.formBuilder.group({
      id:[this.id],
      parentUserEmail:[this.parentUserEmail],
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
    });
    console.log(this.parentUserEmail);
    
  }
  getId(){
    this.totalAccounts=this.authservice.userModel.useraccounts;
    var lastindex=this.totalAccounts.length-1;
   this.id=this.totalAccounts[lastindex].id+1;
   console.log(this.id);
  }

addUser(){
  this.userService.addUser(this.AddProfileForm.value).subscribe({
    next:(res:any)=>{
      this.totalAccounts.push(res);
      console.log(res);
    },
    error:(error:any)=>{
      alert(error);
      console.log(error);
    }
  })
}
}
