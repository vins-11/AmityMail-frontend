import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

export interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  emailId: string;
  password: string;
  deviceInfo: object;
  state: string;
  city: string;
  roles: string;
  role_name:string;
  name?: string;
}
export interface User {
  _id: string;
  emailId: string;
  name: string;
  mobNo:string;
  roles: string;
  role_name:string;
  accessToken: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root',

})
export class AuthenticationService {
  decode() {
    throw new Error("Method not implemented.");
  }

  private token: string;
  private settings: object;
  constructor(private http: HttpClient, private router: Router) {
  }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/login');
  }
  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    // console.log(user);
    return this.request('post', 'login', user);
  }

  public getUserDetails(): User {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
 
  private request(method: 'post'|'get', type: 'login'|'register', user?: TokenPayload): Observable<any> {
    let base;
    if (method === 'post') {
      console.log('inside request funs');
      // console.log(user);
      base = this.http.post(environment.apiURL + `user/${type}`, user);
    } else {
      base = this.http.get(environment.apiURL + `user/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
    return base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
          console.log(data.token);
        }
        return data;
      })
    );
  }
}
