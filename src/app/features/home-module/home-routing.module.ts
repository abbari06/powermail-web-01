import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ContactsListComponent } from './pages/contacts-list/contacts-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OutreachListComponent } from './pages/outreach/outreach-list/outreach-list.component';
import { ProspectsLabelsListComponent } from './pages/prospect-labels/prospects-labels-list/prospects-labels-list.component';

const routes: Routes = [
  {path:'', component:HomeComponent, children:
[
  {path:'dashboard', component:DashboardComponent},
  {path:'contacts', component:ContactsListComponent},
  {path:'prospects', component:ProspectsLabelsListComponent},
  {path:'outreach', component:OutreachListComponent},
  {path:'', redirectTo:'dashboard', pathMatch:'full'}
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
