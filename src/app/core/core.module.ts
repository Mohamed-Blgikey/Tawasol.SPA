import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxPermissionsModule.forChild()
  ],
  exports:[
    NgxPermissionsModule
  ]
})
export class CoreModule { }
