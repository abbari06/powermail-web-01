import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ContactsListComponent } from './pages/prospects/contacts-list/contacts-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WizardStepperComponent } from './pages/outreach/add-campaign-wizard/wizard-stepper/wizard-stepper.component';
import { OutreachListComponent } from './pages/outreach/outreach-list/outreach-list.component';
import { ProspectsLabelsListComponent } from './pages/prospect-labels/prospects-labels-list/prospects-labels-list.component';
import { StepOneComponent } from './pages/outreach/add-campaign-wizard/step-one/step-one.component';
import { StepTwoComponent } from './pages/outreach/add-campaign-wizard/step-two/step-two.component';
import { StepThreeComponent } from './pages/outreach/add-campaign-wizard/step-three/step-three.component';
import { StepFourComponent } from './pages/outreach/add-campaign-wizard/step-four/step-four.component';
import { EditCampaignComponent } from './pages/outreach/edit-campaign/edit-campaign.component';
import { CampaignSettingsComponent } from './pages/outreach/edit-campaign/pages/campaign-settings/campaign-settings.component';
import { CampaignMessagesComponent } from './pages/outreach/edit-campaign/pages/campaign-messages/campaign-messages.component';
import { CampaignStatsComponent } from './pages/outreach/edit-campaign/pages/campaign-stats/campaign-stats.component';
import { MailAccountsComponent } from './pages/settings/mail-accounts/mail-accounts.component';
import { AllSchedulesComponent } from './pages/settings/all-schedules/all-schedules.component';
import { ProfileComponent } from './pages/settings/profile/profile.component';
import { BillingComponent } from './pages/settings/billing/billing.component';
import { CampaignProspectsComponent } from './pages/outreach/edit-campaign/pages/campaign-prospects/campaign-prospects.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Home',
          breadcrumb: [
            {
              label: 'Home',
              url: 'dashboard',
            },

            {
              label: 'Dashboard',
              url: '',
            },
          ],
        },
      },
      {
        path: 'contacts',
        component: ContactsListComponent,
        data: {
          title: 'Home',
          breadcrumb: [
            {
              label: 'Home',
              url: 'dashboard',
            },

            {
              label: 'Contacts',
              url: '',
            },
          ],
        },
      },
      {
        path: 'prospects',
        component: ProspectsLabelsListComponent,
        data: {
          title: 'Home',
          breadcrumb: [
            {
              label: 'Home',
              url: 'dashboard',
            },

            {
              label: 'Labels',
              url: '',
            },
          ],
        },
      },
      {
        path: 'outreach',

        children: [
          { path: '', component: OutreachListComponent },
          {
            path: 'editcampaign',
            component: EditCampaignComponent,

            children: [
              {
                path: 'settings',
                component: CampaignSettingsComponent,
                data: {
                  title: 'Home',
                  breadcrumb: [
                    {
                      label: 'Home',
                      url: 'dashboard',
                    },

                    {
                      label: 'Outreachs',
                      url: 'outreach',
                    },
                    {
                      label: 'Edit Outeach',
                      url: '',
                    },
                  ],
                },
              },
              {
                path: 'messages',
                component: CampaignMessagesComponent,
                data: {
                  title: 'Home',
                  breadcrumb: [
                    {
                      label: 'Home',
                      url: 'dashboard',
                    },

                    {
                      label: 'Outreachs',
                      url: 'outreach',
                    },
                    {
                      label: 'Edit Outeach',
                      url: '',
                    },
                  ],
                },
              },
              {
                path: 'prospects',
                component: CampaignProspectsComponent,
                data: {
                  title: 'Home',
                  breadcrumb: [
                    {
                      label: 'Home',
                      url: 'dashboard',
                    },

                    {
                      label: 'Outreachs',
                      url: 'outreach',
                    },
                    {
                      label: 'Edit Outeach',
                      url: '',
                    },
                  ],
                },
              },
              {
                path: 'stats',
                component: CampaignStatsComponent,
                data: {
                  title: 'Home',
                  breadcrumb: [
                    {
                      label: 'Home',
                      url: 'dashboard',
                    },

                    {
                      label: 'Outreachs',
                      url: 'outreach',
                    },
                    {
                      label: 'Edit Outeach',
                      url: '',
                    },
                  ],
                },
              },
              { path: '', redirectTo: 'messages', pathMatch: 'full' },
            ],
          },

          {
            path: 'addcampaign',
            component: WizardStepperComponent,
            children: [
              {
                path: 'stepone',
                component: StepOneComponent,
                data: {
                  title: 'Home',
                  breadcrumb: [
                    {
                      label: 'Home',
                      url: 'dashboard',
                    },

                    {
                      label: 'Outreachs',
                      url: 'outreach',
                    },
                    {
                      label: 'New Outreach',
                      url: '',
                    },
                  ],
                },
              },
              { path: 'steptwo', component: StepTwoComponent },
              { path: 'stepthree', component: StepThreeComponent },
              { path: 'stepfour', component: StepFourComponent },
              { path: '', redirectTo: 'stepone', pathMatch: 'full' },
            ],
          },
        ],
        data: {
          title: 'Home',
          breadcrumb: [
            {
              label: 'Home',
              url: 'dashboard',
            },

            {
              label: 'Outreachs',
              url: '',
            },
          ],
        },
      },
      {
        path: 'settings',
        children: [
          {
            path: 'mailaccounts',
            component: MailAccountsComponent,
            data: {
              title: 'Home',
              breadcrumb: [
                {
                  label: 'Home',
                  url: 'dashboard',
                },

                {
                  label: 'Settings',
                  url: '',
                },
                {
                  label: 'Mail-Accounts',
                  url: '',
                },
              ],
            },
          },
          {
            path: 'schedules',
            component: AllSchedulesComponent,
            data: {
              title: 'Home',
              breadcrumb: [
                {
                  label: 'Home',
                  url: 'dashboard',
                },

                {
                  label: 'Settings',
                  url: '',
                },
                {
                  label: 'Schedules',
                  url: '',
                },
              ],
            },
          },
          {
            path: 'profile',
            component: ProfileComponent,
            data: {
              title: 'Home',
              breadcrumb: [
                {
                  label: 'Home',
                  url: 'dashboard',
                },

                {
                  label: 'Settings',
                  url: '',
                },
                {
                  label: 'Profile',
                  url: '',
                },
              ],
            },
          },
          {
            path: 'billing',
            component: BillingComponent,
            data: {
              title: 'Home',
              breadcrumb: [
                {
                  label: 'Home',
                  url: 'dashboard',
                },

                {
                  label: 'Settings',
                  url: '',
                },
                {
                  label: 'Billing',
                  url: '',
                },
              ],
            },
          },
        ],
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
