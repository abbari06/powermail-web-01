import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseProfileRouting } from './choose.profile-routing.module';
import { AllUserProfilesComponent } from './pages/all-user-profiles/all-user-profiles.component';
import { AddUserProfileComponent } from './pages/add-user-profile/add-user-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProfileComponent,
    AllUserProfilesComponent,
    AddUserProfileComponent
  ],
  imports: [
    CommonModule,
    ChooseProfileRouting,
    SharedModule
  ]
})
export class ChoseProfileModule { }
