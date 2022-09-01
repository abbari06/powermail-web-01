import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { SetNewPasswordComponent } from './pages/set-new-password/set-new-password.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    SetNewPasswordComponent,
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MatDialogModule
  ]
})
export class AuthModule { }
