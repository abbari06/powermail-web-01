import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { user_model } from 'src/app/features/auth/pages/login/models/user_model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_BASE_URL:string;
  body:string;
  //button='hello'
  //loginError="";
  error = {
    mode:false,
    message:''
  }
  userModel:user_model=new user_model;
  constructor(private http:HttpClient,private router:Router) {
    this.API_BASE_URL=environment.API_BASE_URL;
   }
   getErrorMessage(){
    //var message="Invalid credentials";
    return this.error;
   }
  login(loginData){
    this.http.post(this.API_BASE_URL+'users/login',loginData,{observe:'response'}).subscribe({
      next:(res:any)=>{
      this.userModel.firstname = res.body.firstname;
      this.userModel.lastname = res.body.lastname;
      this.userModel.accounttype = res.body.accounttype;
      this.userModel.company = res.body.company;
      this.userModel.email = res.body.email;
      this.userModel.emailverified = res.body.emailverified;
      this.userModel.id = res.body.id;
      this.userModel.token= res.headers.get('authorization');
      this.userModel.modifiedAt= res.body.modifiedAt;
      this.userModel.deletedFlag = res.body.deletedFlag;
      this.userModel.useraccounts = res.body.useraccounts;
      if(this.userModel.accounttype=="client"){
        localStorage.setItem('user',(JSON.stringify(this.userModel)));
        localStorage.setItem('useraccount',(JSON.stringify(res.body.useraccounts[0])));
        this.router.navigate(['home']);
      }
      else if(this.userModel.accounttype=="agency"){
        this.router.navigate(['home'],{state:{mode:'agency'}});//here choose-profile popup will be shown
      }
      
      },
      error:(error:any)=>{
        console.log(error.error.message)
        this.error.message = error.error.message;
        this.error.mode = true;
        console.log(this.getErrorMessage());
        
        this.getErrorMessage();
        if(error.status=='ERROR'){
        // this.getErrorMessage(error.message);
        
      }
    }
  })
  }
  isLoggedIn():boolean{
    if(this.userModel.accounttype=="agency"){
      return true;
    }
    else{
      return !!localStorage.getItem('user');
    }
  }
  getToken(){
     const userToken=this.userModel.token;
    return userToken;
  }
  register(registerData){
    this.http.post(this.API_BASE_URL+'users/register',registerData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.router.navigate(['auth'],{state:{data:res}});
      },
      error:(error:any)=>{
        alert(error);
        console.log(error);
      }
    })
  }
  }

