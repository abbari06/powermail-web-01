import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { TopMenuComponent } from './layouts/top-menu/top-menu.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatStepperModule } from '@angular/material/stepper';
import { MomentTimezonePickerModule } from 'moment-timezone-picker';
import { AvatarModule } from 'ngx-avatar';
@NgModule({
  declarations: [SidebarComponent, TopMenuComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    MatStepperModule,
    MomentTimezonePickerModule,
  ],
  exports: [
    SidebarComponent,
    TopMenuComponent,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    MatStepperModule,
    MomentTimezonePickerModule,
    AvatarModule,
  ],
})
export class SharedModule {}
