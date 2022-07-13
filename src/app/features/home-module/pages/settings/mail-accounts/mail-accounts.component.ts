import { Component, OnInit } from '@angular/core';
import { MailAccountSettingsService } from 'src/app/core/services/settings/mail-account-settings.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var gapi: any;
declare var auth2: any;
@Component({
  selector: 'app-mail-accounts',
  templateUrl: './mail-accounts.component.html',
  styleUrls: ['./mail-accounts.component.scss'],
})
export class MailAccountsComponent implements OnInit {
  gridColumn = 3;
  user = {
    id: undefined,
  };
  userAccount = {
    id: undefined,
  };
  mailAccounts = [];
  constructor(private mailAccountSettings: MailAccountSettingsService) {}

  ngOnInit(): void {
    this.fetchAccountDetails();
  }
  fetchAccountDetails() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    this.mailAccountSettings
      .getAccountDetails(this.user.id, this.userAccount.id)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.mailAccounts = res.mailaccounts;
        },
        error: (error: any) => {
          alert(error);
          console.log(error);
        },
      });
  }
  connectGoogleAccount() {
    console.log('called');
    auth2
      .grantOfflineAccess({
        redirect_uri: 'postmessage',
        prompt: 'consent select_account',
      })
      .then(
        (response) => this.signInCallback(response),
        (closed) => {
          console.log('djkhkdjhkdh');
        }
      );
  }

  signInCallback(authResult: any): void {
    console.log('hsgjhdhdhdhdhdd');
    // console.log('AuthCode ' + authResult['code']);
    // this.loader = true;
    let auth_code = authResult.code;
    console.log(auth_code);
    this.mailAccountSettings.google(auth_code, this.userAccount.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.fetchAccountDetails();
      },
      error: (err) => {
        console.log('No contact found');
      },
    });
  }
}
