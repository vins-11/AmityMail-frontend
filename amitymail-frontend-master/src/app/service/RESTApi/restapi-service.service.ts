import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../Authentication/authentication.service';
import { HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RESTApiService {
  authHeader;
  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.authHeader = new HttpHeaders().set('authorization', 'Bearer ' + authService.getToken());
  }

  get(URL): Observable<object> {
    let headers = new HttpHeaders().set('authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.get(URL, { headers: headers});
  }
  post(URL, postData, type?: string ): Observable<object> {
    let headers = new HttpHeaders().set('authorization', 'Bearer ' + this.authService.getToken());
    if (type === 'JSON') {
      const header = new HttpHeaders().set('authorization', 'Bearer ' + this.authService.getToken())
                                    .set('Content-Type', 'application/json');
      return this.httpClient.post(`${URL}`, postData, {headers: header});
    } else {
      return this.httpClient.post(`${URL}`, postData, {headers: headers});
    }
  }
  delete(URL, id): Observable<object> {
    return this.httpClient.delete(`${URL}`, {params: {id}, headers: this.authHeader});
  }
  put(URL, putData): Observable<object> {
    return this.httpClient.put(`${URL}`, putData, { headers: this.authHeader});
  }
  uploadFile(url: string, file: File): Observable<HttpEvent<any>> {

    let formData = new FormData();
    formData.append('photo', file);

    let params = new HttpParams();
    let header = new HttpHeaders().set('authorization', 'Bearer ' + this.authService.getToken())
      .set('Content-Type', 'application/json');

    const options = {
       params: params, 
       reportProgress: true,
       header: header
    }

    const req = new HttpRequest('POST', url, formData, options);
    return this.httpClient.request(req);
  }
 
}
