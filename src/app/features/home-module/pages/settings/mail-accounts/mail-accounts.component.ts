import { Component, HostListener, OnInit } from '@angular/core';
import { MailAccountSettingsService } from 'src/app/core/services/settings/mail-account-settings.service';


import Swal from 'sweetalert2';
declare var gapi: any;
declare var auth2: any;
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private mailAccountSettings: MailAccountSettingsService,private dashboardService:DashboardService,private route:ActivatedRoute
   ) {}

  ngOnInit(): void {
    this.fetchAccountDetails();
    if(this.route.snapshot.queryParams.code)
      this.outlookSignInHandler(this.route.snapshot.queryParams.code)
      
  }
  
  fetchAccountDetails() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userAccount = JSON.parse(localStorage.getItem('userprofile'));
    this.mailAccountSettings
      .getAccountDetails(this.user.id, this.userAccount.id)
      .subscribe({
        next: (res: any) => {
          console.log(res.mailaccounts.length);
          this.mailAccounts = res.mailaccounts;
          console.log(this.mailAccounts.length);
    
          if(this.mailAccounts.length!=0){
            this.dashboardService.completedStep1=true;
            console.log(this.dashboardService.completedStep1);
            
          }
        },
        error: (error: any) => {
          
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
  token:string;
  childWindow:any;
  async connectOutlookAccount(): Promise<void> {
    const msConfig = {
      client_id: environment.MSOAuthSettings.appId,
      response_type: 'code',
      redirect_uri: window.location.href,
      response_mode: 'query',
      scope: environment.MSOAuthSettings.scopes.join(' ')
    };
  
    const msConfigString = Object.keys(msConfig).map((p, index) => `${p}=${msConfig[p]}`).join('&');

    this.childWindow = window.open(`${environment.MSOAuthSettings.baseURL}?${msConfigString}`, "MSAUthentication", "modal=1,height=600,width=500,left=50");
    
  }
  
  // @HostListener('window:message', ['$event'])
  // onmessage(e) {
  //   console.log(e);
  //   console.log(this.route.snapshot.queryParams.code);
    
    
  // }
  /**
   * Callback for handling outlook Signin response
   */
   outlookSignInHandler(code: string): void {
    
    console.log(code);
   //setTimeout(() => {
     // if (code) {
        
        this.mailAccountSettings.connectOutlookAccount(code,this.userAccount.id)
        .subscribe({
          next: (res: any) => {
            window.top.close();
            console.log(res);
            this.fetchAccountDetails();
            window.location.reload();
          },
          error: (err) => {
           window.top.close();
            console.log('No contact found');
           
          },
        });
  
      // } else {
      //  // this.toastr.error("Outlook account could not be connected!", "Oops!");
      // }
      
   // }, 100);
   // this.childWindow.close();
  
    
  }
}
