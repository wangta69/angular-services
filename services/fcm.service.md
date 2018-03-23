# WindowRef.ts

## How to use
### refer : https://ionicframework.com/docs/native/fcm/
### imports Service
``` app.module.ts
import { FCM }              from '@ionic-native/fcm';
import { FCMService }			from './fcm.service';

.............
@NgModule({
providers: [ FCM, FCMService ]
})
```

``` app.component.ts
import { FCMService }			from './fcm.service';

constructor(protected fcmSvc: FCMService) {
    platform.ready().then(() => {
       if(platform.is('cordova')){
           fcmSvc.init();
       }
     });
}//
```
