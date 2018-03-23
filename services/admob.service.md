# admob.service.ts

## How to use
### refer : https://ionicframework.com/docs/native/admob-pro/
### imports Service
``` app.module.ts
import { AdMobPro }         from '@ionic-native/admob-pro';
import { AdMobService }         from './admob.service';

.............
@NgModule({
providers: [ AdMobPro, AdMobService ]
})
```

``` app.component.ts
import { AdMobService }			from './admob.service';

@Component({
  selector: 'page-test',
  template: `
  <ion-header>
    <ion-navbar>
      <ion-title>뉴스</ion-title>
    </ion-navbar>
  </ion-header>

  <ion-content padding>

      <ion-item>
        <ion-label>position</ion-label>
        <ion-select [(ngModel)]="options.position">
          <ion-option value="1">Top Left</ion-option>
          <ion-option value="2">Top Center</ion-option>
          <ion-option value="3">Top Right</ion-option>
          <ion-option value="4">Left</ion-option>
          <ion-option value="5">Center</ion-option>
          <ion-option value="6">Right</ion-option>
          <ion-option value="7">Bottom Left</ion-option>
          <ion-option value="8">Bottom Center</ion-option>
          <ion-option value="9">Bottom Right</ion-option>
          <ion-option value="10">POS_XY</ion-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>size</ion-label>
        <ion-select [(ngModel)]="options.adSize">
          <ion-option value="SMART_BANNER">SMART_BANNER</ion-option>
          <ion-option value="BANNER">BANNER</ion-option>
          <ion-option value="MEDIUM_RECTANGLE">MEDIUM_RECTANGLE</ion-option>
          <ion-option value="FULL_BANNER">FULL_BANNER</ion-option>
          <ion-option value="LEADERBOARD">LEADERBOARD</ion-option>
          <ion-option value="SKYSCRAPER">SKYSCRAPER</ion-option>
          <ion-option value="CUSTOM">CUSTOM</ion-option>
        </ion-select>
      </ion-item>





      <ion-item>
          <ion-label>overlap</ion-label>
          <ion-checkbox [(ngModel)]="options.overlap"></ion-checkbox>
      </ion-item>

      <ion-item>
          <ion-label>autoShow</ion-label>
          <ion-checkbox [(ngModel)]="options.autoShow"></ion-checkbox>
      </ion-item>

      <ion-item>
          <ion-label>offsetTopBar</ion-label>
          <ion-checkbox [(ngModel)]="options.offsetTopBar"></ion-checkbox>
      </ion-item>

      set size to CUSTOM
      <ion-item>
          <ion-label color="primary" stacked>width</ion-label>
          <ion-input type="number" [(ngModel)]="options.width"></ion-input>
      </ion-item>

      <ion-item>
          <ion-label color="primary" stacked>height</ion-label>
          <ion-input type="number" [(ngModel)]="options.height"></ion-input>
      </ion-item>

  set position to POS_XY
      <ion-item>
          <ion-label color="primary" stacked>x</ion-label>
          <ion-input type="number" [(ngModel)]="options.x"></ion-input>
      </ion-item>

      <ion-item>
          <ion-label color="primary" stacked>y</ion-label>
          <ion-input type="number" [(ngModel)]="options.y"></ion-input>
      </ion-item>

      <button ion-item  (click)="set_options()">
        Set Options
      </button>
      <button ion-item  (click)="get_settings()">
        Get Settings
      </button>
      <button ion-item  (click)="hide()">
       hide
      </button>
      <button ion-item  (click)="show()">
       show
      </button>
      <button ion-item  (click)="delete()">
       delete
      </button>
  </ion-content>

  `
})
export class TestPage {
    options:any = {adSize:'SMART_BANNER', overlap:false, position:8, autoShow:true, offsetTopBar:true, width:0, height:0, x:0, y:0};
    constructor( protected adMobSvc: AdMobService) {
        this.adMobSvc.createBanner();
        //this.adMobSvc.interstitial();
    }//

    set_options(){
        console.log(this.options)
        this.adMobSvc.options = this.options
        this.adMobSvc.createBanner();
    }

    get_settings(){
        console.log(this.adMobSvc.getAdSettings());
    }

    hide(){this.adMobSvc.hideBanner()}
    show(){this.adMobSvc.showBanner(0)}
    delete(){this.adMobSvc.removeBanner()}

}
```
