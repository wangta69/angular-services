#WindowRef.ts

## How to use
### imports Service
``` app.module.ts
import { WindowRef }            from './WindowRef';

...............
@NgModule({
providers: [ WindowRef ]
})
```

``` app.component.ts
import { WindowRef } 				from './WindowRef';

constructor(private winRef:WindowRef) { 
     winRef.nativeWindow.open(url);
}//
```
