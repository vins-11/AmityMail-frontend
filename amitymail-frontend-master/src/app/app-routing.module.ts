import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContactUsComponent } from "./components/contact-us/contact-us.component";
import { InboxComponent } from "./components/inbox/inbox.component";
import { LoginComponent } from "./components/login/login.component";
import { MailViewComponent } from "./components/mail-view/mail-view.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "contact-us", component: ContactUsComponent },
  { path: "inbox", component: InboxComponent },
  { path: "view/:id", component: MailViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
