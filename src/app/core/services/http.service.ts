import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  Get(EndPoint:string):Observable<any>{
    let token = localStorage.getItem('TawasolToken');
    let header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
    };
    return this.http.get(this.FullPath(EndPoint),header)
  }

  private FullPath(EndPoint:string):string{
    return `${this.baseUrl}/${EndPoint}`;
  }
}
