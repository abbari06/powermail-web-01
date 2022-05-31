import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactsListComponent } from './pages/contacts-list/contacts-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProspectsLabelsListComponent } from './pages/prospect-labels/prospects-labels-list/prospects-labels-list.component';
import { ProspectsLabelsAddComponent } from './pages/prospect-labels/prospects-labels-add/prospects-labels-add.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    ContactsListComponent,
    ProspectsLabelsListComponent,
    ProspectsLabelsAddComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
