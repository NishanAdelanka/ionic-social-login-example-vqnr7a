import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms'
import {NavController} from 'ionic-angular';

import { AuthService } from 'angular4-social-login';
import { SocialUser } from 'angular4-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';

import {UserService} from '../../providers/user.service'

import { TabsPage } from '../tabs/tabs';

declare var AccountKit;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login = {}
  submitted = false;
  user: SocialUser
  constructor(public navCtrl: NavController, private authService: AuthService, private userService: UserService) {
    
  }


// login callback
  loginCallback(response) {
    console.log(response)
    if (response.status === "PARTIALLY_AUTHENTICATED") {
      var code = response.code;
      var csrf = response.state;
      // Send code to server to exchange for access token
    }
    else if (response.status === "NOT_AUTHENTICATED") {
      // handle authentication failure
    }
    else if (response.status === "BAD_PARAMS") {
      // handle bad parameters
    }
  }

  // phone form submission handler
  smsLogin() {
    AccountKit.init({
        appId:"150126959048665", 
        state:"loksatest123", 
        version:"v1.1",
        fbAppEventsEnabled:true,
        redirect:""
      }
    );
    var countryCode = document.getElementById("country_code").value;
    var phoneNumber = document.getElementById("phone_number").value;
    AccountKit.login(
      'PHONE', 
      {countryCode: countryCode, phoneNumber: phoneNumber}, // will use default values if not specified
      this.loginCallback
    );
  }

onLogin(form) {
    this.submitted = true;

    if (form.valid) {
     this.navCtrl.setRoot(TabsPage);
    }
  }

signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(()=>{
      this.navCtrl.setRoot(TabsPage);
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
}