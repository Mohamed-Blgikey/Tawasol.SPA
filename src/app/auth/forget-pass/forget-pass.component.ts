import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {

  forgetFrom!:FormGroup;
  constructor(private fb:FormBuilder,private alert:HotToastService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.forgetFrom = this.fb.group({
      email:['',[Validators.required,Validators.email]]
    })
  }

  submit(form:FormGroup){
    this.alert.success("sada")
    console.log(form.value);

  }

}
