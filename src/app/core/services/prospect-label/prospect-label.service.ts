import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProspectLabelService {
  API_BASE_URL = '';

  constructor(private http: HttpClient) {
    this.API_BASE_URL = environment.API_BASE_URL;
  }
  getLabels(data) {
    return this.http.post(
      this.API_BASE_URL + 'users/prospects/labels/list',
      data
    );
  }
  addLabels(userId, userAccountId, name, description, colorHex) {
    return this.http.post(this.API_BASE_URL + 'users/prospects/labels/add', {
      userId,
      userAccountId,
      name,
      description,
      colorHex,
    });
  }
  updateLabels(userId, userAccountId, id, name, description, colorHex) {
    return this.http.post(this.API_BASE_URL + 'users/prospects/labels/update', {
      userId,
      userAccountId,
      id,
      name,
      description,
      colorHex,
    });
  }
  deleteLabels(userId, userAccountId, prospectLabels) {
    return this.http.post(this.API_BASE_URL + 'users/prospects/labels/delete', {
      userId,
      userAccountId,
      prospectLabels,
    });
  }
}
