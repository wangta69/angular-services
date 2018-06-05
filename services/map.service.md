import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { MapService }          from '../../app/services/map.service';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  geocoder:any;
  infoWindow:any;

  constructor(public navCtrl: NavController, protected mapSvc: MapService) {

  }

  ionViewDidLoad(){
    this.mapSvc.loadMap(this.mapElement).then((res) => {
        if(res == true){
            this.mapSvc.addMarker().then((res) => {
                this.mapSvc.get_users_on_map(5);//5: 5km
            });
        }
    });
  }

}
