import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpService } from './providers/http.service';
import { HttpClientModule } from '@angular/common/http';
import { BaseHttpService } from './providers/base.http.service';
import { Network } from '@ionic-native/network/ngx';
import { TransactionPageService } from './providers/transaction.page.service';
import { CacheModule } from 'ionic-cache';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, CacheModule.forRoot(), IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    HttpService,
    BaseHttpService,
    Network,
    TransactionPageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
