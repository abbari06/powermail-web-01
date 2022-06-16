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
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
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


const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

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
    CampaignMessagesComponent
   
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgWizardModule.forRoot(ngWizardConfig),
  ]
})
export class HomeModule { }
