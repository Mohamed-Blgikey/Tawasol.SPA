import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  hidePassword:boolean = true;
  signinFrom!:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  login(signinFrom:FormGroup){
    console.log(signinFrom.value);
    signinFrom.reset();
  }
  private CreateForm(){
    this.signinFrom = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    })
  }
}
