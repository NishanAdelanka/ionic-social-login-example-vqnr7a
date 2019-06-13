import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import {NavController} from 'ionic-angular';
import {UserService} from '../providers/user.service';
import { AuthService, SocialUser } from 'angular4-social-login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  rootPage:any = LoginPage;
  user:SocialUser;

  constructor(platform: Platform, private userService: UserService, private authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
        this.authService.authState.subscribe((user) => {
          this.rootPage = user ? TabsPage:LoginPage;
          this.user =user;
          this.userService.user = user;

      });
    });
  }

  ngOnInit() {
    
  }

  checkAuth() {
    
  }
  signOut() : void {
    this.authService.signOut().then(()=> {
      this.rootPage = LoginPage;
    });
  }
}
