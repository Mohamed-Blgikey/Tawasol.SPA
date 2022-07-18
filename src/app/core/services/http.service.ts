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
    return this.http.get<ApiResponse>(this.FullPath(EndPoint))
  }

  Post(EndPoint:string,obj:any = null):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.FullPath(EndPoint),obj)
  }

  Put(EndPoint:string,obj:any = null):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(this.FullPath(EndPoint),obj)
  }

  Delete(EndPoint:string,obj:any = null):Observable<any>{
    return this.http.delete(this.FullPath(EndPoint),obj)
  }

  private FullPath(EndPoint:string):string{
    return `${this.baseUrl}/${EndPoint}`;
  }
}
