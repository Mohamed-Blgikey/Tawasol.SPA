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
  UserImage!:Image[];
  UserCover!:Image[];
  postImagePreview:string [] = [];
  postVedioPreview:string [] = [];
  Caption:string = '';
  CurrentUserId:string = '';


  @Input() User!:User;



  sub1:Subscription|undefined;
  sub2:Subscription|undefined;
  constructor(private auth:AuthService,private active:ActivatedRoute) { }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
  }

  ngOnInit(): void {
    this.CurrentUserId = this.auth.user['_value'].nameid;
    // console.log(this.User);
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
