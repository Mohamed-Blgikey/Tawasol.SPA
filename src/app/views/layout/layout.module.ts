import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { BaseComponent } from './base/base.component';



@NgModule({
  declarations: [
    NavbarComponent,
    BaseComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
