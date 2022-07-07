import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProfileComponent,
    EditPhotoComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ProfileModule { }
