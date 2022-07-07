import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/core/Models/api-response';
import { User } from 'src/app/core/Models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit ,OnDestroy{
  User!:User;
  sub1!:Subscription;
  sub2!:Subscription;
  constructor(private active:ActivatedRoute,private dialog: MatDialog,private auth:AuthService) { }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

//   @HostListener('window:scroll', ['$event']) onScrollEvent($event:any) {
//     console.log(window.pageYOffset);
//     console.log(window.outerHeight);
//     console.log(window.innerHeight);
//     console.log(this.divCurtain.nativeElement.offsetHeight);
//     ;
// }

  ngOnInit(): void {
    this.sub1 = this.active.data.subscribe((res)=>{
      this.User = res['user'].data
      // console.log(this.User);
    })


    this.sub2 = this.auth.newPhoto.subscribe(()=>{
      if (this.auth.newPhoto['_value'] != '') {
        this.User.photoUrl = this.auth.newPhoto['_value']
      }
    })
  }


  openDialog() {
    this.dialog.open(EditPhotoComponent,{
      data : this.User.profilePhotos
    });
  }


}
