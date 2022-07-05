import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../shared/material.module';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [
    PagesComponent,
    NavbarComponent,

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    NgxPermissionsModule.forChild()
  ]
})
export class PagesModule { }
