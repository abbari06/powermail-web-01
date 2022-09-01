import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SubscriptionService } from 'src/app/core/services/stripe/subscription.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  constructor(private subscriptioService: SubscriptionService , private router: Router ) { }
  user: any = JSON.parse(localStorage.getItem('userprofile'));
  loader = false;
  ngOnInit(): void {
    console.log(this.user.email);

  }
  manageBilling()
  {
    this.loader = true;
    this.subscriptioService.manageBilling({email:this.user.email}).subscribe({
      next:(res:any)=>{
        this.loader = false;
        console.log(res);
        window.location.href=res.message;
        // (window as any).open(res.message, "_blank");
      },
      error:(err)=>{}
    })
  }

}
