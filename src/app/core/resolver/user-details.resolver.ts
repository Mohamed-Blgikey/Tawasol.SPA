import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { UserApi } from '../APIS/User';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsResolver implements Resolve<boolean> {
  /**
   *
   */
  constructor(private http:HttpService,private router:Router) {  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.http.Get(`${UserApi.GetUser}/${route.params['id']}`).pipe(
      catchError((err:any)=>{
        this.router.navigate(['/']);
        return of(err)
      })
    )
    return of(true);
  }
}
