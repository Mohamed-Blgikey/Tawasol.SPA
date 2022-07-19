import { AfterContentInit, AfterViewChecked, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { UserApi } from 'src/app/core/APIS/User';
import { ApiResponse } from 'src/app/core/Models/api-response';
import { Image } from 'src/app/core/Models/profile-image';
import { User } from 'src/app/core/Models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import { UsersHubService } from 'src/app/core/services/users-hub.service';
import { EditCoverComponent } from './edit-cover/edit-cover.component';
import { EditPhotoComponent } from './edit-photo/edit-photo.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ShowImageComponent } from './show-image/show-image.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit ,OnDestroy{

  EditOn:boolean = false;
  viewEditCover:boolean = false;
  MainCover:Image|any;


  EditNameMode = false;


  User!:User;
  UserImage!:Image[];
  UserCover!:Image[];

  CurrentUserId:string = '';
  sub1:Subscription|undefined;
  sub2:Subscription|undefined;
  sub3:Subscription|undefined;
  constructor(private usersHub:UsersHubService, private active:ActivatedRoute,private dialog: MatDialog,private auth:AuthService,private http:HttpService,private alert:HotToastService) { }


  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.usersHub.StopConnection();
  }

//   @HostListener('window:scroll', ['$event']) onScrollEvent($event:any) {
//     console.log(window.pageYOffset);
//     console.log(window.outerHeight);
//     console.log(window.innerHeight);
//     console.log(this.divCurtain.nativeElement.offsetHeight);
//     ;
// }

  ngOnInit(): void {
    this.CurrentUserId = this.auth.user['_value'].nameid;


    this.sub1 = this.active.data.subscribe((res)=>{
      this.User = res['user'].data
      this.UserImage = this.User.profilePhotos.reverse();
      this.UserCover = this.User.coverPhotos.reverse();
      if (this.User.coverUrl != "https://res.cloudinary.com/dz0g6ou0i/image/upload/v1654960873/defualt_w4v99c.png") {
        this.MainCover = this.User.coverPhotos.find(c=>c.isMain) ;
      }
      // console.log(this.User);
    })



    // signalR
    this.usersHub.OpenConnection();
    this.usersHub.hubConnection.on("EditDetails",(res:User)=>{
      this.User.fullName = res.fullName; this.User.gender = res.gender;
      this.User.city = res.city; this.User.country = res.country;
      this.User.whatsApp = res.whatsApp; this.User.instagram = res.instagram;
      this.User.work = res.work; this.User.socialSituationnstagram = res.socialSituationnstagram;
      this.User.graduated = res.graduated;
      // console.log(res);
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

  openDialogEditDetials(obj:User){
    this.dialog.open(EditUserComponent,{
      data:obj,
      width:"400px"
    })
  }


  CoverViewEdit(){
    // console.log(this.MainCover);
    this.alert.loading("Editing Cover in ...",{duration:10000000000000,id:"CloseLoading"});
    this.http.Put(UserApi.CoverViewEdit,this.MainCover).subscribe(
      res=>{
        this.alert.close("CloseLoading");
        // console.log(res);
        if (res.message == 'success') {
          this.alert.success(res.message)
        }else{
          this.alert.error(res.message)
        }
      }
    )
  }

}
