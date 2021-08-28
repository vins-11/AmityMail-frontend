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
  selector: "app-mail-view",
  templateUrl: "./mail-view.component.html",
  styleUrls: ["./mail-view.component.scss"],
})
export class MailViewComponent implements OnInit {
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
  routeId: any;
  mailData: any;
  from: String;
  ngOnInit(): void {
    this.myForm = this._formBuilder.group({
      //from validation of contact details...
      to: new FormControl("", [Validators.required]),
      subject: new FormControl("", [Validators.required]),
      body: new FormControl("", [Validators.required]),
    });
    this.route.params.subscribe((params) => {
      this.routeId = params["id"];
    });
    this.getMailDeatils();
    this.from = localStorage.getItem("from");
  }
  getMailDeatils() {
    this.restapiservice
      .get(
        environment.apiURL +
          environment.mailApi +
          "/mail_view" +
          "?mailId=" +
          this.routeId +
          ""
      )
      .subscribe(
        (data: any) => {
          this.mailData = data;
          this.toastr.success("Mail details showing successfully");
        },
        (err) => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
  }
  sendMail() {
    console.log(this.myForm.getRawValue());
    var emailId = this.myForm.get("to").value;
    this.restapiservice
      .get(
        environment.apiURL +
          environment.userApi +
          "/get_to_addesses?" +
          "emailId=" +
          emailId +
          ""
      )
      .subscribe(
        (data: any) => {
          let senddata = this.myForm.getRawValue();
          senddata["to"] = data._id;
          this.restapiservice
            .post(
              environment.apiURL + environment.mailApi + "/sendMail",
              senddata
            )
            .subscribe(
              (data: any) => {
                this.toastr.success("Mail send successfully");
                this.myForm.reset();
                this.submitted = false;
              },
              (err) => {
                console.log(err);
                this.toastr.error(err.error.message);
              }
            );
        },
        (err) => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
  }
  starMail() {
    let data = {};
    data["mailId"] = this.routeId;
    console.log(data);
    this.restapiservice
      .post(environment.apiURL + environment.mailApi + "/update_mail", data)
      .subscribe(
        (data: any) => {
          this.toastr.success("Mail marked as starred successfully");
        },
        (err) => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
  }
  logOut() {
    this.auth.logout();
    this.toastr.success("Logout Successful");
  }
}
