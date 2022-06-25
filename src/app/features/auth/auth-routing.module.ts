import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SetNewPasswordComponent } from './pages/set-new-password/set-new-password.component';

const routes: Routes = [
  {path:'', component:AuthComponent, children:[
    {path:'login', component:LoginComponent},
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'register',component:RegisterComponent},
    {path:'setpassword',component:SetNewPasswordComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
