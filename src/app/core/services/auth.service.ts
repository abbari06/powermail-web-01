import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { user_model } from 'src/app/features/auth/pages/login/models/user_model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  completedStep1=false;
  completedStep2=false;
  completedStep3=false;
  completedStep4=false;
  API_BASE_URL: string;
  body: string;
  //button='hello'
  loginError = false;
  message = '';
  errorMessage = '';
  resetToken = '';
  userModel: user_model = new user_model();
  constructor(private http: HttpClient, private router: Router, private authentic: AngularFireAuth) {
    this.API_BASE_URL = environment.API_BASE_URL;
  }
  userStateSource = new BehaviorSubject(this.getCurrentUser);

  get getCurrentUser() {
    // onAuthStateChanged(this.authentic, (user) => {
    //   if (user) {
    //     console.log(user);

    //      this.uid = user.uid;
    //      console.log(this.uid);

    //   }
    // });

    return localStorage.getItem('U_tk');
  }

  setUserState(user: any) {
    this.userStateSource.next(user);
  }
  getErrorMessage() {
    this.loginError = true;
    return this.errorMessage;
  }
  login(loginData) {
   return this.http
      .post(this.API_BASE_URL + 'users/login', loginData, {
        observe: 'response',
      })
      .subscribe({
        next: (res: any) => {
          console.log('resssssssssss',res);
          this.userModel.mailAccountconnected=res.body.mailAccountConnected;
         this.userModel.prospectsAdded=res.body.prospectsAdded;
        this.userModel.prospectLabelAdded= res.body.prospectLabelAdded;
         this.userModel.campaignCreated= res.body.campaignCreated;
          this.userModel.firstname = res.body.firstname;
          this.userModel.lastname = res.body.lastname;
          this.userModel.accounttype = res.body.accounttype;
          this.userModel.company = res.body.company;
          this.userModel.email = res.body.email;
          this.userModel.emailverified = res.body.emailverified;
          this.userModel.id = res.body.id;
          this.userModel.token = res.headers.get('authorization');
          this.userModel.modifiedAt = res.body.modifiedAt;
          this.userModel.deletedFlag = res.body.deletedFlag;
          this.userModel.useraccounts = res.body.useraccounts;
          this.userModel.fb_token=res.headers.get('x-fb-token');
          this.userModel.trialPlan=res.body.trialPlan;
          this.firebaseLogin(this.userModel.fb_token);
          if (this.userModel.accounttype == 'client') {
            localStorage.setItem('user', JSON.stringify(this.userModel));
            localStorage.setItem(
              'userprofile',
              JSON.stringify(res.body.useraccounts[0])
            );
            this.router.navigate(['home'],{ state: { mode: 'client' } });
          } else if (this.userModel.accounttype == 'agency') {
            this.router.navigate(['home'], { state: { mode: 'agency' } }); //here choose-profile popup will be shown
          }
        },
        error: (error: any) => {
          return error;
        },
      });
  }
  isLoggedIn(): boolean {
    if (this.userModel.accounttype == 'agency') {
      return true;
    } else {
      return !!localStorage.getItem('user');
    }
  }
  firebaseLogin(token) {
    console.log(token);
    
    this.authentic
      .signInWithCustomToken(token)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential);
       // this.uid = userCredential.user.uid;
        localStorage.setItem('U_tk', userCredential.user.uid);
        this.setUserState(user);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });

}
  getToken() {
    if (this.userModel.token != undefined) {
      const userToken = this.userModel.token;
      console.log(userToken);
      return userToken;
    } else {
      var user = JSON.parse(localStorage.getItem('user'));
      const userToken = user.token;
      return userToken;
    }
  }
  register(registerData) {
  return this.http
      .post(this.API_BASE_URL + 'users/register', registerData)
      
  }
  resetInitiated(email) {
    return this.http
      .post(this.API_BASE_URL + 'users/forgotpassword', email, {
        observe: 'response',
      })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.message = res.body.message;
          this.resetToken = res.headers.get('Authorisation');
          console.log(this.resetToken);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }
  checkResetToken(token) {
    return this.http.post(
      this.API_BASE_URL + 'users/email/verify?token=' + token,
      null,
      { observe: 'response' }
    );
  }
  returnMessage() {
    console.log(this.message);
    return this.message;
  }
  setNewPassword(data, token) {
    const headers = new HttpHeaders({});
    this.http
      .post(this.API_BASE_URL + 'users/setpassword', data, {
        headers: new HttpHeaders({ Authorization: token }),
      })
      .subscribe({
        next: (res: any) => {
          console.log(res.message);
          var message = res.message;
          this.router.navigate(['auth'], {
            state: { mode: 'setpassword', data: message },
          });
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }
user:any=undefined;
parentUserEmail='';
  getUserAccounts(){
    this.user=JSON.parse(localStorage.getItem('user'));
    if(this.user!=undefined){
      this.parentUserEmail=this.user.email;
    }
    else{
      this.parentUserEmail=this.userModel.email;
    }
    return this.http
      .post(this.API_BASE_URL + 'users/account/list',{'parentUserEmail':this.parentUserEmail})
  }
  getUserID(){
    return localStorage.getItem('U_tk');
  }
}
