
import { Injectable }		from '@angular/core';
import { Firebase  }        from '@ionic-native/firebase';
import { NavController, AlertController, Platform, App }	from 'ionic-angular';
import { Device } 				from '@ionic-native/device';
import { HttpService } 			from './http.service';
import { LocalStorageService }	from 'ng-storages'

//https://github.com/aggarwalankush/ionic-push-base/blob/master/src/app/app.ts
@Injectable()
export class FireBaseService {

	constructor( public platform: Platform, private device: Device, public alertCtrl: AlertController, private app:App, protected http:HttpService, private firebase: Firebase, protected storage:LocalStorageService) {//, private platformService: PlatformService
	}//, private appVersion: AppVersion

    /**
    * 아래 부분은 platform.ready 이후 처리되어야 하는 부분이므로
    * app.components 이하 platform.ready에서 호출한다. if(platform.is('cordova')){ fcmSvc.init(); }
    */
    public init(){
        this.firebase.subscribe('marketing');

        this.firebase.onNotificationOpen().subscribe(data=>{
         	console.log(data);
        })

        this.firebase.onTokenRefresh().subscribe(token=>{
         // backend.registerToken(token);
        })

        this.firebase.unsubscribe('marketing');

        this.set_token();
    }

    public set_token(){
        if(this.platform.is('cordova')){
            this.firebase.getToken().then(token=>{
                let push_type = "fcm";
				//토큰을 저장해 두었다가 시세 같은 개별 push를 원할 경우 이 부분을 서버측에 동시에 저장해둔다.
                let user = {push_token: token, push_type: push_type, device_id:this.device.uuid};

				this.storage.set({'fcm_token':token}).then((res) => {
		            //console.log(res);
		        });
              //POST
              this.http.post({url:'push/register', params:user}).then((res) => {
	            //console.log(res)
	        	});
            })
        }
    }

	get navCtrl(): NavController {// 서비스에서는 private navCtrl: NavController를 사용하면 에러가 발생한다.
		return this.app.getActiveNavs()[0];
	}

}
