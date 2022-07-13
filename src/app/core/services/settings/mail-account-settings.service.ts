import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailAccountSettingsService {
  API_BASE_URL = environment.API_BASE_URL;

  constructor(private http: HttpClient) {}
  getAccountDetails(userId, userAccountId) {
    return this.http.post(this.API_BASE_URL + 'users/account/get', {
      userId,
      userAccountId,
    });
  }

  //api call for google
  google(auth_code, userAccountId): Observable<any> {
    return this.http.post(this.API_BASE_URL + 'users/account/linkmailaccount', {
      auth_code,
      userAccountId,
    });
  }
}
