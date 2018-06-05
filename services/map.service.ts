import { Injectable }			from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation';
declare var google;

import { HttpService }          from './http.service';

@Injectable()
export class MapService  {
//@ViewChild('map') mapElement: ElementRef;
    map: any;
    infoWindow:any;
    geocoder:any;
    myMarker:any;//나의 위치를 가르키는 마크
    markers = [];

    customIcons = {
        'M':{icon: 'http://labs.google.com/ridefinder/images/mm_20_green.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png' },
        'W':{ icon: 'http://labs.google.com/ridefinder/images/mm_20_blue.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png' },
        'N':{ icon: 'http://labs.google.com/ridefinder/images/mm_20_red.png', shadow: 'http://labs.google.com/ridefinder/images/mm_20_shadow.png' },
    };

	constructor(protected http: HttpService, public geolocation: Geolocation) {}


    public loadMap( mapElement):Promise<any>{
        return new Promise(function(resolve, reject) {
            this.geolocation.getCurrentPosition().then((position) => {

              let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

              let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              }

              this.map = new google.maps.Map(mapElement.nativeElement, mapOptions);
              this.geocoder = new google.maps.Geocoder;
              resolve(true);
            }, (err) => {
              reject(err);
            });
        }.bind(this));
    }

    //private default_url = 'http://tutor.shop-wiz.com/api/v1/';

    public addMarker(){
        return new Promise(function(resolve, reject) {
            this.myMarker = new google.maps.Marker({
              map: this.map,
              animation: google.maps.Animation.DROP,
              position: this.map.getCenter(),
              draggable:true
            });

            google.maps.event.addListener(this.myMarker, 'dragend', function () {
            }.bind(this));//google.maps.event.addListener(marker, 'dragend', function () {

            resolve(true);
        }.bind(this));
   }//addMarker(){

    /**
    * 중심점 lat 및 lng를 기준으로 반경 안에 있는 모든 사용자 위치 정보 가져오기
    */
    public get_users_on_map(radius) {//중심점은 현재 addMarker가  된 것을 기준으로 가져온다.
        let lat = this.myMarker.position.lat();
        let lng = this.myMarker.position.lng();

        console.log('get_users_on_map lat:'+lat+', lng:'+lng);

        this.http.get({'url':'maps/load?lat='+lat+'&lng='+lng+'&radius='+radius}).then((res) => {
            console.log('after get_users_on_map');
            console.log(res);
            //this.markers = [];
            for (let entry of res.users) {//someArray mustbe string type
                console.log(entry); // 1, "string", false

                let point = new google.maps.LatLng(parseFloat(entry.lat), parseFloat(entry.lng));
                let icon = this.customIcons[entry.gender] || {};
                let html = entry.html;
                //var marker = new google.maps.Marker({ map: map, position: point, icon: icon.icon, shadow: icon.shadow });
                let marker = new google.maps.Marker({
                    map: this.map,
                    //animation: google.maps.Animation.DROP,
                    position: point,
                    icon: icon.icon,
                    shadow: icon.shadow
                });

                let infoWindow = new google.maps.InfoWindow();


                this.markers.push(marker);//생성된 marker를 별도로 저장해 두었다가 이동등을 할때 일괄적으로 삭제시킨다.
                //bindInfoWindow(marker, map, infoWindow, html);
                this.bindInfoWindow(marker, this.map, infoWindow, html);
            }//for (let entry of res) {



            //markerCluster = new MarkerClusterer($scope.map, markers);
        });


    }//public get_users_on_map(lat, lng, radius) {

    private addInfoWindow(marker, content){
            console.log('addInfoWindow start');
            console.log(marker);
            console.log(content);
         this.infoWindow = new google.maps.InfoWindow({
           content: content
         });
         this.infoWindow.open(this.map, marker);

         google.maps.event.addListener(marker, 'click', () => {
           this.infoWindow.open(this.map, marker);
         });

     }//addInfoWindow(marker, content){

    // Binds a marker to an info window
	private bindInfoWindow(marker, map, infoWindow, html) {
		google.maps.event.addListener(marker, 'mouseover', function() {
			infoWindow.setContent('<div class="info-win clearfix">'+html+'</div>');
			infoWindow.open(map, marker);
		});
	}

}
