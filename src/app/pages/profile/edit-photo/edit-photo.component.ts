import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Subscription } from 'rxjs';
import { UserApi } from 'src/app/core/APIS/User';
import { Image } from 'src/app/core/Models/profile-image';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.scss']
})
export class EditPhotoComponent implements OnInit ,OnDestroy{

  sub1:Subscription|undefined;
  sub2:Subscription|undefined;
  sub3:Subscription|undefined;
  sub4:Subscription|undefined;
  MyPhoto!:Image [];
  imageSrc!:string;
  createPhoto:FormData = new FormData();
  createPhotoValid:FormGroup = new FormGroup({
    f:new FormControl('',[Validators.required])
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Image[],private fb:FormBuilder,private auth:AuthService,private http:HttpService,private alert:HotToastService) { }

  ngOnInit(): void {
    this.MyPhoto = this.data;
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe();
    this.sub2?.unsubscribe();
    this.sub3?.unsubscribe();
    this.sub4?.unsubscribe();
    this.alert.close("CloseLoading");
  }

  GetProfilePhoto(e:any){
    // console.log(e.target.files[0]);
    this.createPhoto.delete("File");
    this.createPhoto.delete("UserId");
    this.createPhoto.delete("Type");

    let file = e.target.files[0];
    this.createPhoto.append('File', file, file.name);
    this.createPhoto.append('UserId',this.auth.user['_value'].nameid);
    this.createPhoto.append('Type','p');

    this.createPhotoValid.controls['f'].setValue('sd');
    const reader = new FileReader();
    reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;
      }
  }

  UploadProfilePhoto(){
    this.createPhotoValid.reset();
    this.alert.loading("Editing in ...",{duration:10000000000000,id:"CloseLoading"});
    // console.log(this.createPhoto);
    this.sub1 = this.http.Post(UserApi.UploadImage,this.createPhoto).subscribe(res=>{
      this.alert.close("CloseLoading");
      if (res.message == 'success') {
        this.MyPhoto.forEach(e=>{e.isMain = false})
        this.alert.success("Image changed ^_^ ")
        // console.log(res.data);
        this.MyPhoto.unshift(res.data)
        localStorage.setItem('newPhoto',this.MyPhoto[0].url)
        this.auth.newPhoto.next(this.MyPhoto[0].url);
        this.createPhoto.delete("File");
        this.createPhoto.delete("UserId");
        this.createPhoto.delete("Type");
        this.imageSrc = '';

      }else{
        this.alert.error(res.message)
      }
    })
  }

  SetMainProfilePhoto(photo:Image){
    this.alert.loading("Editing in ...",{duration:10000000000000,id:"CloseLoading"});
    let old:any = this.MyPhoto.find(i=>i.isMain == true);
    old.isMain = false;
    photo.isMain = true;
    let updateRange:Image[] = [] ;   updateRange.push(old);  updateRange.push(photo);

    // console.log(updateRange);
    this.sub2 = this.http.Put(`${UserApi.SetMain}/profile`,updateRange).subscribe(res=>{
      this.alert.close("CloseLoading");
      if (res.message == 'success') {
        this.alert.success("Image changed ^_^ ")
        localStorage.setItem('newPhoto',photo.url)
      }else{
        this.alert.error(res.message+' ' + res.code);
        old.isMain = true;
        photo.isMain = false;
      }
      this.auth.newPhoto.next(photo.url);
    })
    // console.log(photo);


  }

  DeleteProfilePhoto(photo:Image){
    this.alert.loading("Deleteing in ...",{duration:10000000000000,id:"CloseLoading"});

    // console.log(photo);
    this.sub3 = this.http.Post(`${UserApi.DeleteImage}/profile`,photo).subscribe(res=>{
      // console.log(res);

      this.alert.close("CloseLoading");
      if (res.message == "success") {
        this.alert.success("Image Deleted ^_^ ")
        let indexPhotoDelete = this.MyPhoto.findIndex(s=>s.id == photo.id);  this.MyPhoto.splice(indexPhotoDelete,1);
        if (photo.isMain) {
          if (this.MyPhoto.length>0) {
            this.MyPhoto[0].isMain = true;
            let newPhoto = this.MyPhoto[0];
            // console.log(newPhoto);
            let photos:Image[] = []; photos.push(newPhoto);
            this.sub4 = this.http.Put(`${UserApi.SetMain}/profile`,photos).subscribe(res=>{
              if (res.message == 'success') {
                localStorage.setItem('newPhoto',photos[0].url)
              }else{
                this.alert.error(res.message+' ' + res.code);
              }
            })
            this.auth.newPhoto.next(this.MyPhoto[0].url);
          }else{
            let defualt:string = "https://res.cloudinary.com/dz0g6ou0i/image/upload/v1654960873/defualt_w4v99c.png";
            this.auth.newPhoto.next(defualt);
            localStorage.setItem('newPhoto',defualt)

          }
          // console.log(y[0]);
        }
      }
    })
  }

}
