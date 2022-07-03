import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ConfirmemailComponent,
    ForgetPassComponent,
    ResetPassComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    SharedModule,
    CoreModule
  ]
})
export class AuthModule { }
