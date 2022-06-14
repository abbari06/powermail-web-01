import { NgModule } from '@angular/core';
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
const routes: Routes = [
  {
    path: '', component: HomeComponent, children:
      [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'contacts', component: ContactsListComponent },
        { path: 'prospects', component: ProspectsLabelsListComponent },
        {
          path: 'outreach', children: [
            { path: '', component: OutreachListComponent },
            {
              path: 'addcampaign', component: WizardStepperComponent, children: [
                { path: 'stepone', component: StepOneComponent },
                { path: 'steptwo', component: StepTwoComponent },
                { path: 'stepthree', component: StepThreeComponent },
                { path: 'stepfour', component: StepFourComponent },
                { path: '', redirectTo: 'stepone', pathMatch: 'full' }
              ]
            },

          ]
        },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
