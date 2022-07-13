import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  API_BASE_URL = environment.API_BASE_URL;
  constructor(private http: HttpClient) {}
  addNewSchedule(userId, userAccountId, schedule) {
    return this.http.post(this.API_BASE_URL + 'users/account/schedules/add', {
      userId,
      userAccountId,
      schedule,
    });
  }
  listAllSchedules(userId, userAccountId) {
    return this.http.post(this.API_BASE_URL + 'users/account/schedules/list', {
      userId,
      userAccountId,
    });
  }
  deleteSchedule(userId, userAccountId, schedule) {
    return this.http.post(
      this.API_BASE_URL + 'users/account/schedules/delete',
      {
        userId,
        userAccountId,
        schedule,
      }
    );
  }
  updateSchedule(userId, userAccountId, schedule) {
    return this.http.post(
      this.API_BASE_URL + 'users/account/schedules/update',
      {
        userId,
        userAccountId,
        schedule,
      }
    );
  }
}
