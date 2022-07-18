import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { UserApi } from 'src/app/core/APIS/User';
import { User } from 'src/app/core/Models/user';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  EditUserFrom!:FormGroup;
  constructor(@Inject (MAT_DIALOG_DATA) private data:User,private fb:FormBuilder,private alert:HotToastService,private http:HttpService
  ) { }

  ngOnInit(): void {
    // console.log(this.data);
    this.CreateForm();
    let Name = this.data.fullName.split(' ');
    this.EditUserFrom.controls['id'].setValue(`${this.data.id}`)
    this.EditUserFrom.controls['firstName'].setValue(Name[0])
    this.EditUserFrom.controls['lastName'].setValue(Name[1])
    this.EditUserFrom.controls['gender'].setValue(`${this.data.gender}`)
    this.EditUserFrom.controls['city'].setValue(`${this.data.city}`)
    this.EditUserFrom.controls['country'].setValue(`${this.data.country}`)
    this.EditUserFrom.controls['socialSituationnstagram'].setValue(`${this.data.socialSituationnstagram}`)
    this.EditUserFrom.controls['instagram'].setValue(`${this.data.instagram}`)
    this.EditUserFrom.controls['whatsApp'].setValue(`${this.data.whatsApp}`)
    this.EditUserFrom.controls['work'].setValue(`${this.data.work}`)
    this.EditUserFrom.controls['graduated'].setValue(`${this.data.graduated}`)

  }

  Edit(EditUserFrom:FormGroup)
  {
    this.alert.loading("Editing Details in ...",{duration:10000000000000,id:"CloseLoading"});
    this.http.Put(UserApi.EditUser,EditUserFrom.value).subscribe(res=>{
      // console.log(res);

      this.alert.close("CloseLoading");
      if (res.message == "success") {
        this.alert.success(res.message)
      } else{
        this.alert.error(res.message)
      }
    })
    // console.log(EditUserFrom.value);

  }
  private CreateForm(){
    this.EditUserFrom = this.fb.group({
      id:['',[Validators.required]],
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      gender:[null,[Validators.required]],
      city:[null],
      country:[null],
      socialSituationnstagram:[null],
      instagram:[null],
      whatsApp:[null],
      graduated:[null],
      work:[null]

    })
  }
}
