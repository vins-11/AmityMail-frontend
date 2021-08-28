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
  selector: "app-inbox",
  templateUrl: "./inbox.component.html",
  styleUrls: ["./inbox.component.scss"],
})
export class InboxComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private restapiservice: RESTApiService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  mailsData = [];
  sentMailsData = [];
  starredMails = [];
  profile: any;
  to: any;
  myForm: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.myForm = this._formBuilder.group({
      //from validation of contact details...
      to: new FormControl("", [Validators.required]),
      subject: new FormControl("", [Validators.required]),
      body: new FormControl("", [Validators.required]),
    });
    this.getInboxMails();
    this.userProfile();
  }
  get f() {
    return this.myForm.controls;
  }
  getInboxMails() {
    this.restapiservice
      .get(environment.apiURL + environment.mailApi + "/inboxMail")
      .subscribe(
        (data: any) => {
          this.mailsData = data.mails;
          this.router.navigateByUrl("/inbox");
          this.toastr.success("Inbox mails");
        },
        (err) => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
  }

  userProfile() {
    this.restapiservice
      .get(environment.apiURL + environment.userApi + "/get_profile")
      .subscribe(
        (data: any) => {
          this.profile = data;
        },
        (err) => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
  }
  getSentMails() {
    this.restapiservice
      .get(environment.apiURL + environment.mailApi + "/getsentMail")
      .subscribe(
        (data: any) => {
          this.sentMailsData = data.mails;
          this.toastr.success("Sent mails");
          this.router.navigateByUrl("/inbox");
        },
        (err) => {
          console.log(err);
          this.toastr.error(err.error.message);
        }
      );
  }
  getStarredMails() {
    this.restapiservice
      .get(
        environment.apiURL +
          environment.mailApi +
          "/inboxMail" +
          "?is_starred=true"
      )
      .subscribe(
        (data: any) => {
          this.starredMails = data.mails;
          this.toastr.success("Starred mails");
          this.router.navigateByUrl("/inbox");
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
  logOut() {
    this.auth.logout();
    this.toastr.success("Logout Successful");
  }
  mailView(id, from) {
    this.router.navigateByUrl("/view/" + id + "");
    localStorage.setItem("from", from);
  }
}
