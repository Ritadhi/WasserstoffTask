import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token:String = "MY_TOKEN"

  header = new HttpHeaders({'Authorization': 'Bearer ' + this.token});

  url: string = "http://127.0.0.1:3000/users"

  constructor(private _http:HttpClient) { }

  user(body:any) {
    return this._http.post(this.url + '/user', body, {
      observe: 'body',
      withCredentials: true,
      headers: this.header.append('Content-Type', 'application/json')
    });
  }

  addTopic(body:any) {
    return this._http.post(this.url + '/addTopic', body, {
      observe: 'body',
      withCredentials: true,
      headers: this.header.append('Content-Type', 'application/json')
    });
  }

}
