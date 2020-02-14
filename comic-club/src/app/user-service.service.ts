import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import {map, take} from 'rxjs/operators';
// import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  user: User = {
    comicIdList: [],
    Id: '',
    nickname: 'miske55',
    index: 16382,
    password: '',
    fax: 1,
    picture: '../assets/proba.jpg'
  };
  searchUser: User;
  searching: boolean = false;
  userName: string;
  userPic: string;
  check: any = null;
  url: string = 'http://localhost:23785/';
  constructor(private http: HttpClient) {
    this.searchUser = {
      comicIdList: [],
      Id: '',
      nickname: '',
      index: 0,
      password: '',
      fax: 0,
      picture: ''
    };
   }

  getUser(): Promise<any>{
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json',
    });
    const options = {
      headers: httpHeaders
    };

    return this.http.get<any>(`${this.url}GetUserByNameAndPassword/${this.searchUser.nickname}/${this.searchUser.password}`, options).toPromise();

  }
  async loginUser() {
    
    this.check = await this.getUser();
    return new Promise((resolve,reject)=> {
        resolve(this.check);
    })
    
  }
  async registerUser(newUser: any) {
    this.check = await this.getUser();
    if (this.check.Index === newUser.index && this.check.Fax === parseInt(newUser.fax))
    {
      return new Promise<boolean>( resolve => resolve(false));
    }
    else {
      const httpHeaders = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type' : 'application/json'
  
      });
      const options = {
        headers: httpHeaders
      };
      this.http.post<User>(`${this.url}AddUser`,newUser, options).subscribe();
      return new Promise<boolean>( resolve => resolve(true));
    }
  }
  updateUser(newUser: User) {
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'

    });
    const options = {
      headers: httpHeaders
    };
    this.http.post<User>(`${this.url}UpdateUser`,newUser, options).subscribe();
  }
  searchName(name: string) {
    const httpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type' : 'application/json'

    });
    const options = {
      headers: httpHeaders
    };
    return this.http.get<User[]>(`${this.url}SearchUserName?name=${name}`, options);
  }
  setSearch(name: string,fax: number, pass: string) {
    this.searchUser.nickname = name;
    this.searchUser.fax = fax;
    this.searchUser.password = pass;
  }
}
