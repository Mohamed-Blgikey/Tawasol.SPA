import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
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

  }
  ,
  {
    path:'signup',
    component : SignupComponent,
  }
  ,{
    path:'confirmemail/:email/:token',
    component:ConfirmemailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
