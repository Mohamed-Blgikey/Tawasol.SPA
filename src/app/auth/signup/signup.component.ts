import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  Signup(SignupFrom:FormGroup){
    console.log(SignupFrom.value);
    SignupFrom.reset();
    this.router.navigate(['/login'])
  }
  private CreateForm(){
    this.SignupFrom = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      cpassword:['',[Validators.required,Validators.minLength(6)]],
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      gender:['',[Validators.required]],
    },{validators:passwordsMatchValidator()})
  }

}
