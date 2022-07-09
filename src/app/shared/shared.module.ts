import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarouselModule
  ]
  ,
  exports:[
    ReactiveFormsModule,
    CarouselModule
  ]
})
export class SharedModule { }
