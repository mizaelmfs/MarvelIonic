import { Injectable } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';


@Injectable()
export class TransactionPageService {

    constructor(private nativePageTransitions: NativePageTransitions) { }

    public upTransaction(): void {
        const options: NativeTransitionOptions = {
            direction: 'up',
            duration: 500,
            slowdownfactor: 3,
            slidePixels: 20,
            iosdelay: 100,
            androiddelay: 150,
            fixedPixelsTop: 0,
            fixedPixelsBottom: 60
           };
          this.nativePageTransitions.slide(options);
    }
}
