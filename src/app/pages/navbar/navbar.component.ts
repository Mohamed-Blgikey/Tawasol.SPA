import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  PhotoUrl!:string;
  CurrentUserId!:string;
  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.PhotoUrl = this.auth.user['_value'].photoUrl;
    this.CurrentUserId = this.auth.user['_value'].nameid;
    this.auth.newPhoto.subscribe(()=>{
      if (this.auth.newPhoto['_value'] != '') {
        this.PhotoUrl = this.auth.newPhoto['_value']
      }else{
        if (localStorage.getItem('newPhoto') != null) {
          let x:any = localStorage.getItem('newPhoto');
          this.PhotoUrl = x;
        }
      }
    })


    // console.log(this.CurrentUserId);

  }

  logOut(){
    localStorage.removeItem('TawasolToken');
    localStorage.removeItem('newPhoto');
    localStorage.removeItem('newCover');
    this.auth.user.next(null)
    this.router.navigate(['/login'])
  }

}
