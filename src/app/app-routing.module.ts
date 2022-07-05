import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    loadChildren : () => import('../app/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'home',
    canActivate:[AuthGuard],
    loadChildren : () => import('../app/pages/pages.module').then(m=>m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
