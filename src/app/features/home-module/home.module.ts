import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactsListComponent } from './pages/contacts-list/contacts-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    ContactsListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
