import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  User:any;
  constructor(private active:ActivatedRoute) { }

  ngOnInit(): void {
    this.active.data.subscribe(res=>{
      // console.log(res['user']);
      this.User = res['user']
    })
  }

}
