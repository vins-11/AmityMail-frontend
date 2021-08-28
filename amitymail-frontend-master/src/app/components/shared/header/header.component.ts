import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { environment } from "../../../../environments/environment";
import { AuthenticationService } from "../../../service/Authentication/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RESTApiService } from "../../../service/RESTApi/restapi-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  imagelink: any;
  env: any;
  constructor(private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private restapiservice: RESTApiService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,) {
      this.env = environment.apiURL;
     }

  ngOnInit(): void {
    this.fetchprofile();
  }
 logout(){
   this.auth.logout();
   this.toastr.success('Logout Successful');
 }
 fetchprofile(){
  this.restapiservice
  .get(environment.apiURL + environment.userApi+'/get_profile')
  .subscribe(
    (data: any) => {
     console.log(data);
     this.imagelink=data.profile_pic;
    },
    err => {
      console.log(err);
    }
  );
}
}
