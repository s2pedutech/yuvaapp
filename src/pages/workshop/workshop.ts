import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import firebase from 'firebase';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the WorkshopPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-workshop',
  templateUrl: 'workshop.html',
})
export class WorkshopPage {
    data: any = {};
    workshops=[];
    trustedVideoUrl: SafeResourceUrl;
    
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController, private domSanitizer: DomSanitizer) {
  
  this.data = this.navParams.get("details");
  
  console.log(this.data);
  this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.video); 
  }
  
  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Application Status',
    subTitle: 'Success',
    buttons: [{text: 'Ok', 
    handler: () => {
          this.navCtrl.setRoot(HomePage);
        }
    }]
  }); 
  alert.present();
}
  
  onApply()
  {
        var reference = firebase.database().ref('workshops/' + this.data.uid + '/applicants/');
        //push(firebase.auth().currentUser.uid);
        
        reference.once('value', resp => {
        console.log(resp);
            var uarr = getValues(resp);
            console.log(uarr);
            if(uarr.length == 0)
           {
            // u r the first applicant
            // push urself there
            reference.push(firebase.auth().currentUser.uid);
           }
           else
           {
                var s = uarr.find((x) => x.uid === firebase.auth().currentUser.uid);
   
               if(s)
               {
                    console.log("Already Applied");
               }
                else
                { 
                    var l: any = {};
                    l.applicationDate = new Date().toString();
                    l.uid = firebase.auth().currentUser.uid;
                    reference.push(l);
                }
           }
           this.presentAlert();
   
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkshopPage');
  }
  

}

export const getValues = snapshot => {
    let returnArr = [];

    
    snapshot.forEach(childSnapshot => {
    
        let item = childSnapshot.val();
        //item.key = childSnapshot.key;
        console.log(item.key);
        returnArr.push(item);
    });

    return returnArr;
};