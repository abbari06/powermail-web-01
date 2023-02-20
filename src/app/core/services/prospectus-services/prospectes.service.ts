import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProspectesService {
  API_BASE_URL = '';
  constructor(private http: HttpClient) {
    this.API_BASE_URL = environment.API_BASE_URL;
  }
  fetchProspectes(data) {
    return this.http.post(this.API_BASE_URL + 'users/prospects/list', data);
  }
  addSingleProspect(form) {
    return this.http.post(this.API_BASE_URL + 'users/prospects/add', form);
  }
  editProspect(form) {
    return this.http.post(this.API_BASE_URL + 'users/prospects/update', form);
  }
  deleteProspects(userId, userAccountId, prospects) {
    return this.http.post(this.API_BASE_URL + 'users/prospects/delete', {
      userId,
      userAccountId,
      prospects,
    });
  }
  addBulkLabels(userId, userAccountId, prospectLabels, prospects) {
    return this.http.post(
      this.API_BASE_URL + 'users/prospects/updatelabels?mode=add',
      {
        userId,
        userAccountId,
        prospectLabels,
        prospects,
      }
    );
  }
  removeBulkLabels(userId, userAccountId, prospectLabels, prospects) {
    return this.http.post(
      this.API_BASE_URL + 'users/prospects/updatelabels?mode=remove',
      {
        userId,
        userAccountId,
        prospectLabels,
        prospects,
      }
    );
  }
}
