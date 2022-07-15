import { Component, OnDestroy, OnInit } from '@angular/core';
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
  User!:User;
  UserImage!:Image[];
  UserCover!:Image[];
  postImagePreview:string = '';
  sub1:Subscription|undefined;
  constructor(private http:HttpService,private auth:AuthService) { }
  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
  }

  ngOnInit(): void {
    this.sub1 = this.http.Get(`${UserApi.GetUser}/${this.auth.user['_value'].nameid}`).subscribe((res)=>{
      this.User = res.data
      console.log(this.User);
    })
  }

  UploadPost(e:any){
    console.log(e.target.files[0]);
    let file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      this.postImagePreview = reader.result as string
    }

  }

}
