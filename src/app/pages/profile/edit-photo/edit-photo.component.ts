import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { UserApi } from 'src/app/core/APIS/User';
import { ProfileImage } from 'src/app/core/Models/profile-image';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.scss']
})
export class EditPhotoComponent implements OnInit ,OnDestroy{

  sub1!:Subscription;
  MyPhoto!:ProfileImage [];
  createPhoto:FormData = new FormData();
  createPhotoValid:FormGroup = new FormGroup({
    f:new FormControl('',[Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProfileImage[],private fb:FormBuilder,private auth:AuthService,private http:HttpService,private alert:HotToastService) { }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

  GetPhoto(e:any){
    // console.log(e.target.files[0]);
    let file = e.target.files[0];
    this.createPhoto.append('File', file, file.name);
    this.createPhoto.append('UserId',this.auth.user['_value'].nameid);
    this.createPhoto.append('Type','p');

    this.createPhotoValid.controls['f'].setValue('sd');
  }

  Done(){
    this.alert.loading("Editing in ...",{duration:10000000000000,id:"CloseLoading"});
    console.log(this.createPhoto);
    this.sub1 = this.http.Post(UserApi.UploadImage,this.createPhoto).subscribe(res=>{
      this.alert.close("CloseLoading");
      if (res.message == 'success') {
        this.alert.success("Image changed ^_^ ")
        console.log(res.data);
        this.MyPhoto.unshift(res.data)
        localStorage.setItem('newPhoto',this.MyPhoto[0].url)
        this.auth.newPhoto.next(this.MyPhoto[0].url);

      }else{
        this.alert.error(res.message)
      }
    })
    this.createPhotoValid.reset();
  }

  ngOnInit(): void {
    this.MyPhoto = this.data.reverse();
  }

}
