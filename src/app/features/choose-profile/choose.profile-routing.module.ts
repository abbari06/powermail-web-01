import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserProfileComponent } from './pages/add-user-profile/add-user-profile.component';
import { AllUserProfilesComponent } from './pages/all-user-profiles/all-user-profiles.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
 {
    path: '', component: ProfileComponent, children: [
      { path: 'all-user-profiles', component: AllUserProfilesComponent },
      { path: '', redirectTo: 'all-user-profiles', pathMatch: 'full' },
      { path: 'add-user-profile', component: AddUserProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseProfileRouting { }
