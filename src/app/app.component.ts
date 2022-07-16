import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tawasol.SPA';

  isLoading: boolean = true;

  constructor(private router: Router) {

    // Spinner for lazyload modules
    // router.events.forEach((event) => {

    //   if (event instanceof RouteConfigLoadStart) {
    //     this.isLoading = true;
    //   } else if (event instanceof RouteConfigLoadEnd) {
    //       this.isLoading = false;
    //   }
    // });


  }
  ngOnInit(): void {
  }
}
