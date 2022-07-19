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

    // signalR
    this.usersHub.hubConnection.on("EditImageProfile",(res:Image[])=>{
      // console.log(res);
      let Main:any = res.find(i=>i.isMain)?.url;
      this.PhotoUrl = Main;
    });

    this.usersHub.hubConnection.on("MainProfile",(res:Image[])=>{
      let Main:any = res.find(i=>i.isMain)?.url;
      this.PhotoUrl = Main;

    })

  }

  logOut(){
    this.auth.logout();
  }

}
