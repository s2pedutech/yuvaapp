import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Login } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { FCM } from '@ionic-native/fcm';


import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

@ViewChild('myNav') navCtrl: NavController;

  rootPage:any = Login;
  
  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public fcm: FCM) {

 if (platform.is('cordova')) {
        this.fcm.getToken().then(token => {
  // Your best bet is to here store the token on the user's profile on the
  // Firebase database, so that when you want to send notifications to this 
  // specific user you can do it from Cloud Functions.
});
   }else{
        
   }
 



      // Initialize Firebase
      var config = {
          apiKey: "AIzaSyB24kfDF4UY3D9OXFnutu-L4p4PQB7k3oo",
    authDomain: "yuva-f5e18.firebaseapp.com",
    databaseURL: "https://yuva-f5e18.firebaseio.com",
    projectId: "yuva-f5e18",
    storageBucket: "yuva-f5e18.appspot.com",
    messagingSenderId: "32360053062"
      };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged((user) => {

          if (!user) {
              console.log("not login");
              this.rootPage = Login;


          } else {
              console.log("login");
              this.rootPage = HomePage;

          }

      });

    platform.ready().then(() => {
    
    
    if (platform.is('cordova')){
    fcm.onNotification().subscribe( data => {
      if(data.wasTapped){
        //Notification was received on device tray and tapped by the user.
      }else{
        //Notification was received in foreground. Maybe the user needs to be notified.
      }
    });
    }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //splashScreen.hide();
      if (splashScreen) {
  setTimeout(() => {
    splashScreen.hide();
  }, 100);
 }
 
 
 
    });
  }
  
  hideSplashScreen() {

}
}
