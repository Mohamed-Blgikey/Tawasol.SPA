import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tawasol.SPA';
  /**
   *
   */
  constructor(private permissionsService:NgxPermissionsService) {  }
  ngOnInit(): void {
    const perm = ["ADMIN", "EDITOR"];

    this.permissionsService.loadPermissions(perm)
  }
}
