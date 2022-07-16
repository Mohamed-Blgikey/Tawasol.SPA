import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  isLoading: boolean = false;

  constructor(private router: Router) {

    // Spinner for lazyload modules
    router.events.forEach((event) => {

      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;

      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });


  }
  ngOnInit(): void {
  }

}
