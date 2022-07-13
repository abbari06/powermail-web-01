import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OutreachService {
  API_BASE_URL = environment.API_BASE_URL;

  constructor(private http: HttpClient) {}
  getAccountDetails(userId, userAccountId) {
    return this.http.post(this.API_BASE_URL + 'users/account/get', {
      userId,
      userAccountId,
    });
  }
  listAllSchedules(userId, userAccountId) {
    return this.http.post(this.API_BASE_URL + 'users/account/schedules/list', {
      userId,
      userAccountId,
    });
  }
}
