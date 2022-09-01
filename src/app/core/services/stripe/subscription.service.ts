import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  API_BASE_URL:string;
  constructor(private http: HttpClient) { 
    this.API_BASE_URL = environment.API_BASE_URL;
    console.log(this.API_BASE_URL);
    
  }

  startSubscription(email,stripePaymentToken,planType)
  {
    console.log(email,stripePaymentToken,planType);
    
   return this.http.post(this.API_BASE_URL+'users/subscription/start',{email,stripePaymentToken,planType})
  }

  manageBilling(email)
  {
    return this.http.post(this.API_BASE_URL+'users/billing/manage/url', email)
  }
}
