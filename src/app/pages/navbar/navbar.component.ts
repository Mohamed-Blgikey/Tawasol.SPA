import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  Name!:string;
  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.Name = this.auth.user['_value'].fullName;
  }

  logOut(){
    localStorage.removeItem('TawasolToken');
    this.auth.user.next(null)
    this.router.navigate(['/login'])
  }

}
