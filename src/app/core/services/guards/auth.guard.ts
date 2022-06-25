import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private router:Router){
    console.log("Auth");
  }
  canActivate(
    ): boolean  {
      if(this.authService.isLoggedIn()){
        //console.log("Auth +");

        return true;
      }
      else{
        this.router.navigate(['auth'])
        return false;
      }
    
  }
  
}
