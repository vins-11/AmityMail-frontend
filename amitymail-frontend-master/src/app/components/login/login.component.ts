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
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private restapiservice: RESTApiService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  myForm: FormGroup;
  submitted = false;
  registerForm: FormGroup;
  registerSubmitted = false;

  ngOnInit(): void {
    this.myForm = this._formBuilder.group({
      //from validation of contact details...
      emailId: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
    this.registerForm = this._formBuilder.group({
      //from validation of contact details...
      name: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
      ]),
      emailId: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }
  get f() {
    return this.myForm.controls;
  }
  get r() {
    return this.registerForm.controls;
  }
  login() {
    const data: any = {
      emailId: this.myForm.get("emailId").value,
      password: this.myForm.get("password").value,
    };
    console.log(data);
    this.auth.login(data).subscribe(
      (data: any) => {
        this.toastr.success("login successfully");
        this.myForm.reset();
        this.submitted = false;
        this.router.navigateByUrl("/inbox");
      },
      (err) => {
        console.error(err);
        this.toastr.error(err.error.message);
      }
    );
  }
  register() {
    this.restapiservice
      .post(
        environment.apiURL + environment.userApi + "/register",
        this.registerForm.getRawValue()
      )
      .subscribe(
        (data: any) => {
          this.toastr.success("User register successfully please login");
          this.registerForm.reset();
          this.registerSubmitted = false;
        },
        (err) => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
  }
  contactUs(){
    this.router.navigateByUrl("/contact-us")
  }
}
