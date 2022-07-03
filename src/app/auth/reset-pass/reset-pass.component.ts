import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

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
  constructor(private fb:FormBuilder,private alert:HotToastService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.resetFrom = this.fb.group({
      password:['',[Validators.required,Validators.minLength(6)]],
      cpassword:['',[Validators.required,Validators.minLength(6)]],
    },{validators:passwordsMatch()})
  }

  submit(form:FormGroup){
    this.alert.success("sada")
    console.log(form.value);

  }
}
