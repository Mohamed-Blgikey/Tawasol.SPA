import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  }
  ,
  {
    path:'login',
    component:SigninComponent,

  },
  {
    path:'signup',
    component : SignupComponent,
  },
  {
    path:'confirmemail/:email/:token',
    component:ConfirmemailComponent
  },
  {
    path:'forgetpass',
    component:ForgetPassComponent
  },
  {
    path:'resetpass/:email/:token',
    component:ResetPassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
