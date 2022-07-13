import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPermissionsModule } from 'ngx-permissions';
import { HotToastModule } from '@ngneat/hot-toast';
import { UserDetailsResolver } from './core/resolver/user-details.resolver';
import { TokenInterceptorService } from './core/services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPermissionsModule.forRoot(),
    HotToastModule.forRoot(),
    MatProgressSpinnerModule
  ],
  providers: [UserDetailsResolver,{
	  provide: HTTP_INTERCEPTORS,
	  useClass: TokenInterceptorService,
	  multi: true,
	},],
  bootstrap: [AppComponent]
})
export class AppModule { }
