import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {RESTApiService} from "../RESTApi/restapi-service.service";
import {environment} from "../../../environments/environment";
import {AuthenticationService} from "../Authentication/authentication.service";

@Injectable()
export class UsersettingsService {

  userSettings = {};
  constructor(private router: Router, private restApiService: RESTApiService, private auth: AuthenticationService) {
  
  }

  public getUserSettings() {
    return this.userSettings;
  }
}
