
import { Injectable }		from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { NavController, AlertController, Platform, App }	from 'ionic-angular';
import { Device } 				from '@ionic-native/device';
import { HttpService } 			from './http.service';
import { LocalStorageService }	from 'ng-storages'

//https://github.com/aggarwalankush/ionic-push-base/blob/master/src/app/app.ts
@Injectable()
export class PushService {

	options: PushOptions = {
	   android: {},
	   ios: {
		   alert: 'true',
		   badge: true,
		   sound: 'false'
	   },
	   windows: {},
	   browser: {
		   pushServiceURL: 'http://push.api.phonegap.com/v1/push'
	   }
	};

	pushObject: PushObject;

	constructor( public platform: Platform, private device: Device, public alertCtrl: AlertController, private app:App, protected http:HttpService, private push: Push, protected storage:LocalStorageService) {//, private platformService: PlatformService
		//this.init();
		this.pushObject = this.push.init(this.options);
	}//, private appVersion: AppVersion




    /**
    * 아래 부분은 platform.ready 이후 처리되어야 하는 부분이므로
    * app.components 이하 platform.ready에서 호출한다. if(platform.is('cordova')){ fcmSvc.init(); }
    */
    public init(){
		// to check if we have permission
		this.push.hasPermission()
		  .then((res: any) => {

		    if (res.isEnabled) {
		      console.log('We have permission to send push notifications');
		    } else {
		      console.log('We do not have permission to send push notifications');
		    }

		  });

		/**
		*	notification {sound, title, message, additionalData:{coldstart:false, foreground:true}}
		*/
		this.pushObject.on('notification').subscribe((notification: any) => {
			console.log('Received a notification 1111', notification);
			if(notification.additionalData.foreground){
				console.log('foreground');
			}else{
			}
		});

		this.pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
        this.set_token();
    }

    public set_token(){
		if(this.platform.is('cordova')){
			//registration.registrationId, //registration.registrationType
			this.pushObject.on('registration').subscribe((registration: any) => {
				let token =   registration.registrationId;
				//let push_type = registration.registrationType;//FCM
				let push_type = "fcm";
				//토큰을 저장해 두었다가 시세 같은 개별 push를 원할 경우 이 부분을 서버측에 동시에 저장해둔다.
                let token_info = {push_token: token, push_type: push_type, device_id:this.device.uuid};

				this.storage.set({'fcm_token':token}).then((res) => {
		            //console.log(res);
		        });
              //POST
              	this.http.post({url:'push/register', params:token_info}).then((res) => {
	            	//console.log(res)
	        	});

			 });
        }
    }

	// Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
	public channel_create(){
		this.push.createChannel({
		 id: "testchannel1",
		 description: "My first test channel",
		 // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
		 importance: 3
		}).then(() => console.log('Channel created'));
	}


	// Delete a channel (Android O and above)
	public channel_delete(){
		this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));
	}

	// Return a list of currently configured channels
	public channel_lists(){
		this.push.listChannels().then((channels) => console.log('List of channels', channels))
	}
}
