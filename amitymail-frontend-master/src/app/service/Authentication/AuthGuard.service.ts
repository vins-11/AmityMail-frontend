import {Injectable} from '@angular/core';
import {Router, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router,) {
  }

  canActivate(route, state: RouterStateSnapshot) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/home');
      return false;
    }
    console.log(this.auth.getUserDetails().role_name);
    switch (state.url) {
      case '/admin/manage-dashboard' :
        console.log(this.auth.getUserDetails().role_name);
        if (!this.auth.isLoggedIn()) {
          this.router.navigateByUrl('/home');
          return false;
        }
        break;
      case '/user-profile' :
        console.log(this.auth.getUserDetails().role_name);
        if (this.auth.getUserDetails().role_name.indexOf('user') === -1) {
          this.router.navigateByUrl('/home');
          return false;

        }
        break;
      case '/add-listing':
        console.log(this.auth.getUserDetails().role_name);
        if (this.auth.getUserDetails().role_name.indexOf('seller') === -1) {
          this.router.navigateByUrl('/home');
          return false;

        }
        break;
      case '/listing-dashboard':
        console.log(this.auth.getUserDetails().role_name);
        if (this.auth.getUserDetails().role_name.indexOf('seller') === -1) {
          this.router.navigateByUrl('/home');
          return false;

        }
        break;
      case '/listing-profile':
        console.log(this.auth.getUserDetails().role_name);
        if (this.auth.getUserDetails().role_name.indexOf('seller') === -1) {
          this.router.navigateByUrl('/home');
          return false;

        }
        break;
      case '/listing-package':
        console.log(this.auth.getUserDetails().role_name);
        if (this.auth.getUserDetails().role_name.indexOf('seller') === -1) {
          this.router.navigateByUrl('/home');
          return false;

        }
        break;
        case '/seller-wallet':
          console.log(this.auth.getUserDetails().role_name);
          if (this.auth.getUserDetails().role_name.indexOf('seller') === -1) {
            this.router.navigateByUrl('/home');
            return false;
  
          }
          break;
          case '/payment-status':
            console.log(this.auth.getUserDetails().role_name);
            let transactionid = localStorage.getItem('transactionId')
            if (transactionid) {
              return true;
            }else{
              this.router.navigateByUrl('/home');
              return false;
            }
              break;
      default :
        return true;
        break;
    }
    return true;
  }
}
