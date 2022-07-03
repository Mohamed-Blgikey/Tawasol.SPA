import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthApi } from '../APIS/Auth';
import { Authresponse } from '../Models/authresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient,private toast:HotToastService) { }

  Login(obj:any):Observable<Authresponse>{
    return this.http.post<Authresponse>(`${this.baseUrl}${AuthApi.Login}`,obj).pipe()
  }

  Register(obj:any):Observable<Authresponse>{
    return this.http.post<Authresponse>(`${this.baseUrl}${AuthApi.Register}`,obj)
  }

  ConfirmeEmail(obj:any):Observable<Authresponse>{
    return this.http.post<Authresponse>(`${this.baseUrl}${AuthApi.Confirm}`,obj)
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
}
