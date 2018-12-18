# WindowRef.ts

## How to use
### imports Service
-- app.module.ts
```
import { TimerService } from './services/timer.service';

.............
@NgModule({
providers: [ TimerService ]
})
```
-- app.component.ts
```
import { TimerService } from './services/timer.service';

constructor( protected timerService: TimerService) {
     this.startTimer();
}

protected startTimer() {
    if (this.gameTimer != null) {
        return;
    }
    this.gameTimer = this.timerService.gameTimer().getInstance();
    this.gameTimer.setDateFormat('korAMPM');
    this.gameTimer.countdownStart(this.serverTime, function(obj) { // Object {next_no: 178, countdown_ii: 3, countdown_ss: 33}
        this.timerInfo = obj;
        this.timerInfo.remainTime = obj.countdown_ii + '분 ' + obj.countdown_ss + '초';
        this.timerInfo.ramainTimeGraph = Math.round((obj.countdown_ii * 60 + obj.countdown_ss) / (60 * 2) * 10000) / 100;
    }.bind(this));
}
protected refresh(){
    this.gameTimer.refresh_nowDateTime(obj.serverDateTime);
}
```
