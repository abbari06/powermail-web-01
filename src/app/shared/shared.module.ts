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
// import { AvatarModule } from 'ngx-avatar';
import { QuillModule } from 'ngx-quill'
import { Time24to12Format } from '../core/pipes/24to12pipe/time24to12.pipe';
import { LayoutModule } from '@angular/cdk/layout';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {AvatarModule} from 'primeng/avatar';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import { ChipModule } from 'primeng/chip';
import {MenuModule} from 'primeng/menu';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {PasswordModule} from 'primeng/password';
import {StepsModule} from 'primeng/steps';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';
import {TabMenuModule} from 'primeng/tabmenu';
import {InputSwitchModule} from 'primeng/inputswitch';
import {AccordionModule} from 'primeng/accordion';
import {InputNumberModule} from 'primeng/inputnumber';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {BadgeModule} from 'primeng/badge';

@NgModule({
  declarations: [SidebarComponent, TopMenuComponent , Time24to12Format],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    MatStepperModule,
    MomentTimezonePickerModule,
    QuillModule,
    LayoutModule,
    MatTooltipModule,
    CardModule,
    ButtonModule,
    DividerModule,
    AvatarModule,
    TableModule,
    ToolbarModule,
    InputTextModule,
    PaginatorModule,
    ChipModule,
    MenuModule,
    BreadcrumbModule,
    PasswordModule,
    StepsModule,
    NgDynamicBreadcrumbModule,
    TabMenuModule,
    InputSwitchModule,
    AccordionModule,
    InputNumberModule,
    DialogModule,
    MultiSelectModule,
    BadgeModule
    
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
    QuillModule,
    Time24to12Format,
    LayoutModule,
    MatTooltipModule,
    CardModule,
    ButtonModule,
    DividerModule,
    TableModule,
    ToolbarModule,
    InputTextModule,
    PaginatorModule,
    ChipModule,
    MenuModule,
    BreadcrumbModule,
    PasswordModule,
    StepsModule,
    NgDynamicBreadcrumbModule,
    TabMenuModule,
    InputSwitchModule,
    AccordionModule,
    InputNumberModule,
    DialogModule,
    MultiSelectModule,
    BadgeModule
  ],
})
export class SharedModule {}
