import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsResolver } from 'src/app/core/resolver/user-details.resolver';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:':id',
        component:ProfileComponent,
        resolve:{
          user:UserDetailsResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
