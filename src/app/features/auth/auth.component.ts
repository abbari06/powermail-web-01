import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  routerLink:any;
  value:any;
  constructor(  router: Router) { 
    // console.log("hello")
    // if(this.url.snapshot.routeConfig.path == 'auth/login'){
    //   this.routerLink="register",
    //   this.value ="Register"
    // }
    // else{
    //   this.routerLink = "login",
    //   this.value ="Login"
    // }
   }

  ngOnInit(): void {
  }

}
