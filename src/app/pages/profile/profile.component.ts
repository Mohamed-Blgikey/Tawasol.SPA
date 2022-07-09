import { AfterViewChecked, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/core/Models/api-response';
import { Image } from 'src/app/core/Models/profile-image';
import { User } from 'src/app/core/Models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { EditCoverComponent } from './edit-cover/edit-cover.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';
import { ShowImageComponent } from './show-image/show-image.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,AfterViewChecked ,OnDestroy{
  isLoading = true;
  User!:User;
  UserImage!:Image[];
  UserCover!:Image[];
  sub1:Subscription|undefined;
  sub2:Subscription|undefined;
  sub3:Subscription|undefined;
  constructor(private active:ActivatedRoute,private dialog: MatDialog,private auth:AuthService) { }
  ngAfterViewChecked(): void {
    this.isLoading = false
  }
  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
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
      this.UserImage = this.User.profilePhotos.reverse();
      this.UserCover = this.User.coverPhotos.reverse();
      // console.log(this.User);
    })


    this.sub2 = this.auth.newPhoto.subscribe(()=>{
      if (this.auth.newPhoto['_value'] != '') {
        this.User.photoUrl = this.auth.newPhoto['_value']
      }
    })

    this.sub3 = this.auth.newCover.subscribe(()=>{
      if (this.auth.newCover['_value'] != '') {
        this.User.coverUrl = this.auth.newCover['_value']
      }
    })
  }


  openDialogImage() {
    this.dialog.open(EditPhotoComponent,{
      data : this.UserImage
    });
  }

  openDialogCover(){
    this.dialog.open(EditCoverComponent,{
      data:this.UserCover
    })
  }

  openDialogShow(obj:Image[]){
    this.dialog.open(ShowImageComponent,{
      data:obj,
      width : '400px'
    })
  }

}
