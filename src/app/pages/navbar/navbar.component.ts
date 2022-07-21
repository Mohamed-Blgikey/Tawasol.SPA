import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersHubService } from 'src/app/core/services/users-hub.service';
import {Image} from 'src/app/core/Models/profile-image'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  PhotoUrl!:string;
  CurrentUserId!:string;
  constructor(private auth:AuthService,private usersHub:UsersHubService) { }

  ngOnInit(): void {
    this.PhotoUrl = this.auth.user['_value'].photoUrl;
    this.CurrentUserId = this.auth.user['_value'].nameid;
    // console.log(this.CurrentUserId);

    this.auth.newPhoto.subscribe(res=>{
      if (res != '') {
        this.PhotoUrl = res;
      }
    })
  }

  logOut(){
    this.auth.logout();
  }

}
