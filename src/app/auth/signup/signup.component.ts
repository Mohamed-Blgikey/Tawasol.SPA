import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  hidePassword:boolean = true;
  hideCPassword:boolean = true;

  SignupFrom!:FormGroup;

  constructor(private fb:FormBuilder,private router:Router,private auth:AuthService,private alert:HotToastService) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  Signup(SignupFrom:FormGroup){
    this.alert.loading("Signing up in ...",{duration : 100000,id:"closeLoading"})

    let obj = {
      email : SignupFrom.value.email,
      password : SignupFrom.value.password,
      firstName : SignupFrom.value.firstName,
      lastName : SignupFrom.value.lastName,
      gender : SignupFrom.value.gender == "true"?true:false
    }
    // console.log(obj);
    this.auth.Register(obj).subscribe(res=>{
      // console.log(res.message,res.token,res.expiresOn);
      if (res.message == 'success') {
        this.alert.success(`Wellcom ${res.fullName} ^_^`)
        this.alert.close("closeLoading")
        this.router.navigate(['/auth/login'])
        SignupFrom.reset();
      }else{
        this.alert.error(res.message)
        this.alert.close("closeLoading")
      }
    })
    // this.router.navigate(['/login'])
  }
  private CreateForm(){
    this.SignupFrom = this.fb.group({
      email:['',{
        validators: [Validators.required, Validators.email],
        asyncValidators: [this.auth.uniqueEmailValidator()],
        updateOn:'blur'
      }],
      password:['',[Validators.required,Validators.minLength(6)]],
      cpassword:['',[Validators.required,Validators.minLength(6)]],
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      gender:[null,[Validators.required]],
    },{validators:passwordsMatchValidator()})
  }

}
