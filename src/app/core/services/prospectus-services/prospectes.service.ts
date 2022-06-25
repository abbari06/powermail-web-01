import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProspectesService {
  API_BASE_URL="";
  constructor(private http:HttpClient) {
    this.API_BASE_URL=environment.API_BASE_URL;
   }
   fetchProspectes(data){
    console.log(data)
    return this.http.post(this.API_BASE_URL+'users/prospects/list',data)
   }
}
