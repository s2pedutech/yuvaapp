import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the TrainingdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-trainingdetails',
  templateUrl: 'trainingdetails.html',
})
export class TrainingdetailsPage {
trustedVideoUrl: SafeResourceUrl;
training: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private domSanitizer: DomSanitizer, private iab: InAppBrowser) {
  this.training = this.navParams.get("details");
  console.log(this.training.video);
  this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.training.video);
  }

 openLink()
  {
    const browser = this.iab.create(this.training.profile,'_self',{location:'no'});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainingdetailsPage');
  }

}
