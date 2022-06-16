import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_BASE_URL:string;
  body:string;
  constructor(private http:HttpClient) { 
    this.API_BASE_URL=environment.API_BASE_URL;
  }
 addUser(userData){
  return this.http.post(this.API_BASE_URL+'users/account/add',userData)
 } 
}
