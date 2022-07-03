import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {

  forgetFrom!:FormGroup;
  constructor(private fb:FormBuilder,private alert:HotToastService,private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.forgetFrom = this.fb.group({
      email:['',[Validators.required,Validators.email]]
    })
  }

  submit(form:FormGroup){
    this.alert.loading("Loading ...",{duration:10000000000,id:"CloseLoading"})
    this.auth.ForgetPass(form.value).subscribe(res=>{
      this.alert.close("CloseLoading");
      if (res.message == "pls create account first ^_^ ") {
        this.alert.warning(res.message)
      }else{
        this.alert.success(res.message);
        this.router.navigate(['/auth'])
      }
    })
    // console.log(form.value);

  }

}
