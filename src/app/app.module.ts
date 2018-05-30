import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FCM } from '@ionic-native/fcm';

import { NewsPage } from '../pages/news/news';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { TabsPage } from '../pages/tabs/tabs';
import { GalleryPage } from '../pages/gallery/gallery';

import { Login } from '../pages/login/login';

import {ResetPassword}from '../pages/reset-password/reset-password';
import {Signup} from '../pages/signup/signup';
import { DriveDetailsPage } from '../pages/drive-details/drive-details';
import { TrainingPage } from '../pages/training/training';
import { AboutUsPage } from '../pages/about-us/about-us';
import { WorkshopPage } from '../pages/workshop/workshop';
import { InternshipPage } from '../pages/internship/internship';
import { IonicImageViewerModule } from 'ionic-img-viewer';

import { TrainingdetailsPage } from '../pages/trainingdetails/trainingdetails';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthData } from '../providers/auth-data';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { environment } from './../environments/environment';
import { Clipboard } from '@ionic-native/clipboard';




@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    ContactPage,
    HomePage,
      TabsPage,
      Login,
      ResetPassword,
      Signup,
      DriveDetailsPage,
      GalleryPage,
      TrainingPage,
      AboutUsPage,
      WorkshopPage,
      InternshipPage,
      ProfilePage,
      TrainingdetailsPage
  ],
  imports: [
    BrowserModule,
    IonicImageViewerModule,
    SelectSearchableModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsPage,
    ContactPage,
    HomePage,
      TabsPage,
      Login,
      ResetPassword,
      Signup,
      DriveDetailsPage,
      GalleryPage,
      TrainingPage,
      AboutUsPage,
      WorkshopPage,
      InternshipPage,
      ProfilePage,
      TrainingdetailsPage
  ],
  providers: [
      AuthData,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    FCM,
    Clipboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
