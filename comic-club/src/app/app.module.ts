import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CardBackComponent } from './card-back/card-back.component';
import { CardEditComponent } from './card-edit/card-edit.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UrlComponent } from './url/url.component';

@NgModule({
  declarations: [AppComponent, CardBackComponent, CardEditComponent,UserDataComponent, UrlComponent],
  entryComponents: [CardBackComponent, CardEditComponent,UserDataComponent, UrlComponent],
  imports: [BrowserModule,HttpClientModule, HttpModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
