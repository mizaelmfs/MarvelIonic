import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CacheService } from 'ionic-cache';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private cacheSerive: CacheService,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translate.addLangs(["en", "pt"]);
      this.translate.setDefaultLang("pt");
      let browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang.match(/en|pt/) ? browserLang : "en");
      this.cacheSerive.setDefaultTTL(60 * 60 * 12);
      this.cacheSerive.setOfflineInvalidate(false);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
