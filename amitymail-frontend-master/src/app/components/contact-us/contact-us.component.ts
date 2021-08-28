import { Component, OnInit } from "@angular/core";
declare var jQuery: any;
import { ToastrService } from "ngx-toastr";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  NgForm,
} from "@angular/forms";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { environment } from "../../../environments/environment";
import { AuthenticationService } from "../../service/Authentication/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RESTApiService } from "../../service/RESTApi/restapi-service.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor( private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private restapiservice: RESTApiService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService) { }
    myForm: FormGroup;
    submitted = false;
  ngOnInit(): void {
    this.myForm = this._formBuilder.group({
      //from validation of contact details...
      name: new FormControl("", [Validators.required]),
      emailId: new FormControl("", [Validators.required]),
      message: new FormControl("", [Validators.required]),
    });
  }

  contactUs(){
    this.restapiservice
      .post(
        environment.apiURL + environment.userApi + "/contactUs",
        this.myForm.getRawValue()
      )
      .subscribe(
        (data: any) => {
          this.toastr.success("Your query send successfully");
          this.myForm.reset();
          this.submitted = false;
        },
        (err) => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
  }
}
