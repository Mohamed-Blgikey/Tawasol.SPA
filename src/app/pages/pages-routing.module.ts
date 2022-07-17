import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path :'',
    component:PagesComponent,
    children:[
      {
        path:'',
        redirectTo :'home',
        pathMatch:'full'
      },
      {
        path:'home',
        loadChildren:()=> import ('./home/home.module').then(h=>h.HomeModule),
      },
      {
        path:'profile',
        loadChildren:()=> import('../pages/profile/profile.module').then(p=>p.ProfileModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
