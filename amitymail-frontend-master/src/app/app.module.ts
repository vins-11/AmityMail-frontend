import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { RESTApiService } from './service/RESTApi/restapi-service.service';
import { AuthenticationService } from './service/Authentication/authentication.service';
import { AuthGuardService } from './service/Authentication/AuthGuard.service';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { MailViewComponent } from './components/mail-view/mail-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactUsComponent,
    InboxComponent,
    MailViewComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({ preventDuplicates: true,}) 
  ],
  providers: [RESTApiService,AuthenticationService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
