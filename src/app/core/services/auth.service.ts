import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { user_model } from 'src/app/features/auth/pages/login/models/user_model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_BASE_URL: string;
  body: string;
  //button='hello'
  loginError = false;
  message = '';
  errorMessage = '';
  resetToken = '';
  userModel: user_model = new user_model();
  constructor(private http: HttpClient, private router: Router) {
    this.API_BASE_URL = environment.API_BASE_URL;
  }
  getErrorMessage() {
    this.loginError = true;
    return this.errorMessage;
  }
  login(loginData) {
    this.http
      .post(this.API_BASE_URL + 'users/login', loginData, {
        observe: 'response',
      })
      .subscribe({
        next: (res: any) => {
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
          if (this.userModel.accounttype == 'client') {
            localStorage.setItem('user', JSON.stringify(this.userModel));
            localStorage.setItem(
              'userprofile',
              JSON.stringify(res.body.useraccounts[0])
            );
            this.router.navigate(['home']);
          } else if (this.userModel.accounttype == 'agency') {
            this.router.navigate(['home'], { state: { mode: 'agency' } }); //here choose-profile popup will be shown
          }
        },
        error: (error: any) => {
          if (error) {
            this.errorMessage = error.error.message;
            this.getErrorMessage();
          }
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
    this.http
      .post(this.API_BASE_URL + 'users/register', registerData)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.router.navigate(['auth'], { state: { data: res } });
        },
        error: (error: any) => {
          alert(error);
          console.log(error);
        },
      });
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
}
