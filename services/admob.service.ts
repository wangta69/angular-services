
import { Injectable }		from '@angular/core';
import { AdMobPro }         from '@ionic-native/admob-pro';
import { Platform }	from 'ionic-angular';


//https://github.com/aggarwalankush/ionic-push-base/blob/master/src/app/app.ts
@Injectable()
export class AdMobService {

    banner_id:string;
	constructor( public platform: Platform, private admob: AdMobPro) {
            if(platform.is('cordova')){
                if(platform.is('android')){
                    this.banner_id = 'ca-app-pub-5513336539352987/6358687461';
                }else if(platform.is('ios')){
                    this.banner_id = '';
                }
            }
    }//, private appVersion: AppVersion



    public createBanner(position){

        switch(position){
            default:
                this.admob.createBanner({
                    adId:this.banner_id,
                     position:this.admob.AD_POSITION.BOTTOM_CENTER,
                     autoShow:true
                });
            break;
        }

    }

    public removeBanner(){
        this.admob.removeBanner();
    }
    public showBanner(parameter1){
        this.admob.showBanner(parameter1);
    }
    public showBannerAtXY(parameter1, parameter2){
        this.admob.showBannerAtXY(parameter1, parameter2);
    }
    public hideBanner(){
        this.admob.hideBanner();
    }
    public prepareInterstitial(parameter1, parameter2, parameter3){
        //this.admob.prepareInterstitial(parameter1, parameter2, parameter3);
    }
    public showInterstitial(){
        this.admob.showInterstitial();
    }
    public setOptions(parameter1, parameter2, parameter3){
        //this.admob.setOptions(parameter1, parameter2, parameter3)
    }
}
