# push.service.ts

## How to use
### refer : https://ionicframework.com/docs/native/push/
### imports Service
``` app.module.ts
import { Push }              from '@ionic-native/fcm';
import { PushService }			from './push.service';

.............
@NgModule({
providers: [ Push, PushService ]
})
```

``` app.component.ts
import { PushService }			from './push.service';

constructor(protected pushSvc:PushService) {
    platform.ready().then(() => {
       if(platform.is('cordova')){
           pushSvc.init();
       }
     });
}//
```
