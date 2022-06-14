import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { user_model } from 'src/app/features/auth/pages/login/models/user_model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  const:string;
  body:string;
  loginError:boolean;
  userModel:user_model=new user_model;
  constructor(private http:HttpClient,private router:Router) {
    this.const=environment.const;
    this.body=environment.body;
   }
  login(loginData){
    this.http.post(this.const+this.body+'users/login',loginData,{observe:'response'}).subscribe({
      next:(res:any)=>{
      this.userModel.firstname = res.body.firstname;
      this.userModel.lastname = res.body.lastname;
      this.userModel.accounttype = res.body.accountType;
      this.userModel.company = res.body.company;
      this.userModel.email = res.body.email;
      this.userModel.emailverified = res.body.emailverified;
      this.userModel.id = res.body.id;
      this.userModel.token= res.headers.get('authorization');
      this.userModel.modifiedAt= res.body.modifiedAt;
      this.userModel.deletedFlag = res.body.deletedFlag;
      this.userModel.useraccounts = res.body.useraccounts;
      localStorage.setItem('user',(JSON.stringify(this.userModel)));
      this.router.navigate(['home']);
      },
      error:(error:any)=>{
        
        if(error.status==403){
           this.loginError=true;
          }
        }
  })
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('user');
  }
  getToken(){
    const userToken=JSON.parse(localStorage.getItem('user'));
    return userToken.token;
  }
  register(registerData){
    this.http.post(this.const+this.body+'users/register',registerData).subscribe({
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

