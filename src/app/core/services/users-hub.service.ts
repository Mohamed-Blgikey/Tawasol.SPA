import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersHubService {
  hubConnection!:HubConnection;
  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(`${environment.baseUrl}/UsersActions`).build();
  }

  OpenConnection(){
    this.hubConnection.start().then(()=>{
      // console.log("Start");
    }).catch(err=>{
      console.log(err);
    });
  }


  StopConnection(){
    this.hubConnection.stop().then(()=>{
      // console.log("Stop");
    }).catch(err=>{
      console.log(err);
    });
  }

}
