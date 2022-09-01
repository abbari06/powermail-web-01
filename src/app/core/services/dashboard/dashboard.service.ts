import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  completedStep1=false;
  completedStep2=false;
  completedStep3=false;
  completedStep4=false;
  API_BASE_URL = environment.API_BASE_URL;
  constructor(private http:HttpClient) { }
  getDashboardData(userId,userAccountId){
   return this.http.post(this.API_BASE_URL+'users/account/dashboard/data/1',{userId,userAccountId})
  }
}
