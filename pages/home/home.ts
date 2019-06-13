import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {UserService} from '../../providers/user.service'
import { SocialUser } from 'angular4-social-login';
import { AuthService } from 'angular4-social-login';
import {LoginPage} from '../login/login';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles: [`
  agm-map {
    height: 300px;
  }
  `]
})
export class HomePage {
  user:SocialUser;
  currentLocation:any;
  // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number;// = 51.673858;
  lng: number;// = 7.815982;
  constructor(public navCtrl: NavController,
   private userService:UserService,
   private authService: AuthService) {
    this.user = this.userService.user || 'Lokesh';
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
        (location) => {
          console.log(location)
          this.currentLocation = `${location.coords.latitude}, ${location.coords.longitude}`;

          this.lat = location.coords.latitude;
          this.lng = location.coords.longitude;
        },
        (error)=>{console.log(error)
    });
  }

clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: '+5',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: '=1',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}