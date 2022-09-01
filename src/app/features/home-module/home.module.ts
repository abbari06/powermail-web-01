import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactsListComponent } from './pages/prospects/contacts-list/contacts-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProspectsLabelsListComponent } from './pages/prospect-labels/prospects-labels-list/prospects-labels-list.component';
import { ProspectsLabelsAddComponent } from './pages/prospect-labels/prospects-labels-add/prospects-labels-add.component';
import { OutreachListComponent } from './pages/outreach/outreach-list/outreach-list.component';
import { WizardStepperComponent } from './pages/outreach/add-campaign-wizard/wizard-stepper/wizard-stepper.component';
import { AddSingleProspectComponent } from './pages/prospects/add-single-prospect/add-single-prospect.component';
import { StepOneComponent } from './pages/outreach/add-campaign-wizard/step-one/step-one.component';
import { StepTwoComponent } from './pages/outreach/add-campaign-wizard/step-two/step-two.component';
import { StepThreeComponent } from './pages/outreach/add-campaign-wizard/step-three/step-three.component';
import { StepFourComponent } from './pages/outreach/add-campaign-wizard/step-four/step-four.component';
import { UsersComponent } from './pages/choose_profile/users/users.component';
import { AddUsersComponent } from './pages/choose_profile/add-users/add-users.component';
import { EditCampaignComponent } from './pages/outreach/edit-campaign/edit-campaign.component';
import { CampaignSettingsComponent } from './pages/outreach/edit-campaign/pages/campaign-settings/campaign-settings.component';
import { CampaignStatsComponent } from './pages/outreach/edit-campaign/pages/campaign-stats/campaign-stats.component';
import { CampaignMessagesComponent } from './pages/outreach/edit-campaign/pages/campaign-messages/campaign-messages.component';
import { CsvMappingComponent } from './pages/prospects/csv-importer/csv-mapping/csv-mapping.component';
import { ColorPickerComponent } from './pages/prospect-labels/color-picker/color-picker.component';
import { MailAccountsComponent } from './pages/settings/mail-accounts/mail-accounts.component';
import { AllSchedulesComponent } from './pages/settings/all-schedules/all-schedules.component';
import { ProfileComponent } from './pages/settings/profile/profile.component';
import { BillingComponent } from './pages/settings/billing/billing.component';
import {
  AddScheduleComponent,
  NgbTimeStringAdapter,
} from './pages/settings/all-schedules/add-schedule/add-schedule.component';
import { NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { CampaignProspectsComponent } from './pages/outreach/edit-campaign/pages/campaign-prospects/campaign-prospects.component';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UpdateLabelsComponent } from './pages/outreach/edit-campaign/update-labels/update-labels.component';
import { UpdateScheduleComponent } from './pages/outreach/edit-campaign/update-schedule/update-schedule.component';
import { ContactsComponent } from './pages/prospect-labels/contacts/contacts.component';
import { CampaignsComponent } from './pages/prospect-labels/campaigns/campaigns.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { StripeComponent } from './pages/stripe/stripe.component';
// import { MsalModule, MsalService, MSAL_INSTANCE , MsalBroadcastService, MsalInterceptorConfiguration, MSAL_INTERCEPTOR_CONFIG} from '@azure/msal-angular';
// import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

// export function MSALInstanceFactory(): IPublicClientApplication {
//   return new PublicClientApplication({
//     auth: {
//       clientId: 'd47b1bce-155c-412b-ab3f-838e2eb62757',
//       redirectUri: 'http://localhost:4200',
//     }
//   });
// }
// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   const protectedResourceMap = new Map<string, Array<string>>();
//   protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);
//   protectedResourceMap.set('http://localhost:4200/home', ['api://d16e1a06-3be2-4ae1-8bd4-718c19cecac3/home']);

//   return {
//     interactionType: InteractionType.Popup,
//     protectedResourceMap
//   };
// }



@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    ContactsListComponent,
    ProspectsLabelsListComponent,
    ProspectsLabelsAddComponent,
    OutreachListComponent,
    WizardStepperComponent,
    AddSingleProspectComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    UsersComponent,
    AddUsersComponent,
    EditCampaignComponent,
    CampaignSettingsComponent,
    CampaignStatsComponent,
    CampaignMessagesComponent,
    CsvMappingComponent,
    ColorPickerComponent,
    MailAccountsComponent,
    AllSchedulesComponent,
    ProfileComponent,
    BillingComponent,
    AddScheduleComponent,
    CampaignProspectsComponent,
    UpdateLabelsComponent,
    UpdateScheduleComponent,
    ContactsComponent,
    CampaignsComponent,
    StripeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    // MsalModule
    
  ],
  providers: [{ provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter },
    // 
  ],
})
export class HomeModule {}
