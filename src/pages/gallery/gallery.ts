import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import  firebase from 'firebase';
/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {

    ref = firebase.database().ref("gallery/");
    gallery = [];
    images = ["logo.png","logo.png","logo.png","logo.png"];
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  }
  
  presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: 'Loading Gallery Data...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 2000);
}
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad GalleryPage');
    //this.presentLoadingDefault();
    this.ref.on('value',resp => {
    this.gallery = [];
    this.gallery = snapshotToArray(resp);
    console.log("Gallery");
    console.log(this.gallery);
    });
  }

}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    
    snapshot.forEach(childSnapshot => {
    
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        //console.log(item.key);
        returnArr.push(item);
    });

    return returnArr;
};