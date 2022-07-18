import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/Models/user';
import { Image } from 'src/app/core/Models/profile-image';
import { HttpService } from 'src/app/core/services/http.service';
import { UserApi } from 'src/app/core/APIS/User';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit ,OnDestroy{
  isLoad:boolean = false;
  User!:User;
  userId:string ='';
  UserImage!:Image[];
  UserCover!:Image[];
  postImagePreview:string [] = [];
  postVedioPreview:string [] = [];
  Caption:string = '';
  sub1:Subscription|undefined;
  sub2:Subscription|undefined;
  constructor(private http:HttpService,private auth:AuthService,private active:ActivatedRoute) { }
  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
  }

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
      }else{
        if (localStorage.getItem('newPhoto') != null) {
          let x:any = localStorage.getItem('newPhoto');
          this.User.photoUrl = x;
        }
      }
    })
  }

  UploadPost(e:any){
    this.postImagePreview = [];
    this.postVedioPreview = [];
    let files = e.target.files
    for (let i = 0; i < files.length; i++) {
      this.isLoad = true;
      // console.log(files[i]);
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = ()=>{
        if (files[i].type.includes("image")) {
          this.postImagePreview.push(reader.result as string)
          this.isLoad = false;
        }else{
          this.isLoad = false;
          this.postVedioPreview.push(reader.result as string)
        }
      }
    }

  }

  UploadCation(e:any){
    // console.log(e.target.value);
    this.Caption = e.target.value;

  }

}
