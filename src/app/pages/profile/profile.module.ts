import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { EditCoverComponent } from './edit-cover/edit-cover.component';


@NgModule({
  declarations: [
    ProfileComponent,
    EditPhotoComponent,
    EditCoverComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule
  ]
})
export class ProfileModule { }
