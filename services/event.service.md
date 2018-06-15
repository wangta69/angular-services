How to subscribe
## 1. Add EventService to AppModule
```
    import { EventService } from './services/event.service';
    @NgModule({
        providers: [ EventService],
    })
```
## 2. Add EventService to a Component where you are going to use
```
    import { EventService } from './services/event.service';
    constructor(protected eventSvc: EventService) {}
```
## 3. Send Message
```
    message send : this.eventSvc.sendMessage({state: 'PROGRESS'});
```
## 4. Receive Message
```
    message receive : this.eventSvc.getMessage().subscribe(message => { console.log(message) });
```
