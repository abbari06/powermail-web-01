import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/spinner-service/spinner.service';
import { catchError, tap } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  openSnackBar(message) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  omitCalls=["login","register","forgotpassword","email","setpassword","graph","start"]
  skipInterceptor:boolean; 
  constructor(private authService:AuthService,private spinnerService: SpinnerService , private _snackBar: MatSnackBar,) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.skipInterceptor=false;
    let authReq = req;
    this.omitCalls.forEach(api => {
      if (req.url.includes(api)) {
        this.spinnerService.show();

         this.skipInterceptor = true;
        }  
   })
      if(!this.skipInterceptor){
        const token= this.authService.getToken();

        this.spinnerService.show();

        authReq = req.clone({
         headers: req.headers.set('Authorization',token)
      })
    }
      return next.handle(authReq).pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
            this.spinnerService.hide();
        }
    }, (error) => {
        this.spinnerService.hide();
     }
     )
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        this.spinnerService.hide();
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
              errorMsg = `Error: ${error.error.message}`;
          } else {
            switch (error.status) {
              case 0:{
                errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                this.openSnackBar("check your internet connection");
                break;
              }
              case 404:{
                errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                this.openSnackBar("Not Found!");
                break;
              }
              case 403:{
                errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                this.openSnackBar("Invalid Credentials");
                break;
              }
              case 500:{
                errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                this.openSnackBar("Something went wrong!");
                break;
              }
              case 409:{
                errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                this.openSnackBar("Email already registered!");
                break;
              }
              
              default:
                break;
            }
              errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          return throwError(errorMsg);
      })
  );
}
   }

