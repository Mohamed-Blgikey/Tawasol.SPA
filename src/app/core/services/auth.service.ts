import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HotToastService } from '@ngneat/hot-toast';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthApi } from '../APIS/Auth';
import { Authresponse } from '../Models/authresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();


  // const decodedToken = helper.decodeToken(myRawToken);
  // const expirationDate = helper.getTokenExpirationDate(myRawToken);
  // const isExpired = helper.isTokenExpired(myRawToken);
  user = new BehaviorSubject(null);

  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient,private permissionsService:NgxPermissionsService) {
    if (localStorage.getItem('TawasolToken') != null) {
      this.SaveUserData();
    }
  }

  Login(obj:any):Observable<Authresponse>{
    return this.http.post<Authresponse>(`${this.baseUrl}${AuthApi.Login}`,obj)
  }

  Register(obj:any):Observable<Authresponse>{
    return this.http.post<Authresponse>(`${this.baseUrl}${AuthApi.Register}`,obj)
  }

  ConfirmeEmail(obj:any):Observable<Authresponse>{
    return this.http.post<Authresponse>(`${this.baseUrl}${AuthApi.Confirm}`,obj)
  }

  ForgetPass(obj:any):Observable<Authresponse>{
    return this.http.post<Authresponse>(`${this.baseUrl}${AuthApi.ForgetPass}`,obj)
  }

  ResetPass(obj:any):Observable<Authresponse>{
    return this.http.post<Authresponse>(`${this.baseUrl}${AuthApi.ResetPass}`,obj)
  }


  uniqueEmailValidator():AsyncValidatorFn{
    return (control:AbstractControl):Observable<ValidationErrors|null> =>{
      let obj = {
        email:control.value,
        token:'sdfsfdsf'
      }
      return this.ConfirmeEmail(obj).pipe(
        map(res => res.message != "pls create acount first" ? { emailExists: true } : null)
      )
    }
  }


  SaveUserData(){
    const token:any = localStorage.getItem('TawasolToken');
    this.user.next(this.helper.decodeToken(token))
    // console.log(this.user.getValue());
    this.loadPermissions();
  }

  loadPermissions(){
    let Roles = this.user['_value'].roles;
    // console.log(typeof(Roles));
    if (typeof(Roles) == 'string') {
      this.permissionsService.loadPermissions([Roles])
    }else{
      let role = Roles as string []
      this.permissionsService.loadPermissions(role.map(x=>x))
    }

  }

}
