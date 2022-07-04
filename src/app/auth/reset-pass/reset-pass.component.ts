import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/core/services/auth.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('cpassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}

export function passwordsMatch():ValidatorFn{
  return (control:AbstractControl):ValidationErrors|null=>{
    const pass = control.get('password')?.value;
    const cpass = control.get('cpassword')?.value;
    if (pass && cpass && pass !== cpass) {
      return { passwordsDontMatch: true };
    }else{
      return null
    }

  }
}
@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {
  hidePassword:boolean = true;
  hideCPassword:boolean = true;
  resetFrom!:FormGroup;
  email:string|undefined;
  token:string|undefined;
  constructor(private fb:FormBuilder,private alert:HotToastService,private active:ActivatedRoute,private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.email = this.active.snapshot.queryParams['email']
    this.token = this.active.snapshot.queryParamMap.get('token')?.split(' ').join('%')
    this.createForm();
    // console.log(this.email,this.token);

  }

  createForm(){
    this.resetFrom = this.fb.group({
      password:['',[Validators.required,Validators.minLength(6)]],
      cpassword:['',[Validators.required,Validators.minLength(6)]],
    },{validators:passwordsMatch()})
  }

  submit(form:FormGroup){
    this.alert.loading("loading ...",{duration:1000000000,id:"CloseLoading"});
    let obj = {
      email : this.email,
      token : this.token,
      password : form.value.password
    }

    if (obj.email == undefined|| obj.token == undefined||obj.password == undefined) {
      this.alert.close("CloseLoading");
      this.alert.info("Check inbox")

    }else{
      this.auth.ResetPass(obj).subscribe(res=>{
        this.alert.close("CloseLoading");
        if (res.message == "Some thing Error") {
          this.alert.error(res.message)
        }else{
          this.alert.success(res.message);
          this.router.navigate(['/'])
        }
      })
    }

  }
}
