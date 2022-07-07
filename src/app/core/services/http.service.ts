import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../Models/api-response';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  Get(EndPoint:string):Observable<ApiResponse>{
    let token = localStorage.getItem('TawasolToken');
    let header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
    return this.http.get<ApiResponse>(this.FullPath(EndPoint),header)
  }

  Post(EndPoint:string,obj:any = null):Observable<ApiResponse>{
    let token = localStorage.getItem('TawasolToken');
    let header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
    return this.http.post<ApiResponse>(this.FullPath(EndPoint),obj,header)
  }

  private FullPath(EndPoint:string):string{
    return `${this.baseUrl}/${EndPoint}`;
  }
}
