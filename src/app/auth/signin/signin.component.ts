import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  hidePassword:boolean = true;
  signinFrom!:FormGroup;
  constructor(private fb:FormBuilder, private auth:AuthService,private alert:HotToastService,private router:Router) { }

  ngOnInit(): void {
    if (this.auth.user.value != null) {
      this.router.navigate(['/pages'])
    }
    this.CreateForm();
  }

  login(signinFrom:FormGroup){
    this.alert.loading("Logining in ...",{duration : 100000,id:"closeLoading"})
    // console.log(signinFrom.value);
    this.auth.Login(signinFrom.value).subscribe(res=>{
      // console.log(res);
      if (res.message != 'success') {
       this.alert.error(res.message)
       this.alert.close("closeLoading")
      }else{
        this.alert.success(`Wellcom ${res.fullName} ^_^`)
        localStorage.setItem('TawasolToken',res.token);
        this.auth.SaveUserData();
        this.router.navigate(['/pages'])
        this.alert.close("closeLoading")
        signinFrom.reset();
      }
    })
  }
  private CreateForm(){
    this.signinFrom = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    })
  }
}
