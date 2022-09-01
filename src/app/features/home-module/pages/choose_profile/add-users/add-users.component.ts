import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/choose_profile/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  email:string;
  name:string;
  company:string;
  parentUserEmail='';
  id:number;
  totalAccounts:any;
  user:any=undefined;
  constructor(private formBuilder: FormBuilder,private userService:UserService,private authservice:AuthService,private dialogRef: MatDialogRef<AddUsersComponent>) {
    this.user=JSON.parse(localStorage.getItem('user'));
    if(this.user!=undefined){
      this.parentUserEmail=this.user.email;
    }
    else{
      this.parentUserEmail=this.authservice.userModel.email;
    }
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
    if(this.user==undefined){
      this.totalAccounts=this.authservice.userModel.useraccounts;
      var lastindex=this.totalAccounts.length-1;
     this.id=this.totalAccounts[lastindex].id+1;
     console.log(this.id);
    }
    else{
      this.totalAccounts=this.user.useraccounts;
      var lastindex=this.totalAccounts.length-1;
      this.id=this.totalAccounts[lastindex].id+1;
    }
   
  }

addUser(){
  this.userService.addUser(this.AddProfileForm.value).subscribe({
    next:(res:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Useraccount Added Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      this.dialogRef.close("submit");
    },
    error: (err) => {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Labels Add Failed!',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  this.dialogRef.close('submit')
}

}
