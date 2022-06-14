import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  omitCalls=["login","register"]
  skipInterceptor:boolean; 
  constructor(private authService:AuthService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.skipInterceptor=false;
    let authReq = req;
    this.omitCalls.forEach(api => {
      if (req.url.includes(api)) {
         this.skipInterceptor = true;
        }  
   })
      if(!this.skipInterceptor){

        const token= this.authService.getToken();
        authReq = req.clone({
         headers: req.headers.set('Authorization',token)
      })
    }
      return next.handle(authReq);
   }
}
