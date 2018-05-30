import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import  firebase from 'firebase';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Clipboard } from '@ionic-native/clipboard';

@Component({
  selector: 'page-drive-details',
  templateUrl: 'drive-details.html'
})
export class DriveDetailsPage {

link : any;
isExternal : boolean = false;
    ref = firebase.database().ref('events/');
    data: any = {};
    events=[];
    isProfileComplete: boolean = false;
  constructor(public navCtrl: NavController, public navParams : NavParams, private alertCtrl: AlertController,private iab: InAppBrowser,private clipboard: Clipboard) {
  
  //this.link = "http://www.kratinmobile.com/careers.html#jumptofresher";
  
  this.data = this.navParams.get("details");
  var uid = this.data.uid;
  this.link = this.data.applyurl;
this.isExternal = this.data.isExternal;
  console.log(this.isExternal);
  
  
  
  var ss = "users/" + firebase.auth().currentUser.uid;
  var myuserref = firebase.database().ref(ss);
  myuserref.on('value',resp => {
  
  
    var myuser = resp.val();
    
    if(myuser.isProfileComplete)
        this.isProfileComplete = true;
  });
  }
  

  gotoProfile()
  {
    this.navCtrl.push(ProfilePage);
  }
  presentAlert() {
  if(this.isExternal){
  let alert = this.alertCtrl.create({
    title: this.link,
    subTitle: 'Either copy the link and navigate manually to apply or click GoTo button to navigate directly',
    buttons: [{text: 'GoTo', 
    handler: () => {
          //this.navCtrl.setRoot(HomePage);
          this.GoTo();
        }
    },
    {text: 'Copy', 
    handler: () => {
          //this.navCtrl.setRoot(HomePage);
          this.CopyLink();
        }
    }]
  });
  alert.present();
  }
  else{
  let alert = this.alertCtrl.create({
    title: 'Application Status',
    subTitle: 'Success',
    buttons: [{text: 'Ok', 
    handler: () => {
          this.navCtrl.setRoot(HomePage);
          //this.CopyLink();
        }
    }]
  }); 
  alert.present();
  }
  
}
CopyLink()
{
console.log("copy Called"); 
this.clipboard.copy(this.link).then(rs => {
      alert('link copied');
    }).catch(error => {
      alert(error);
    })
}
  GoTo(){
  this.iab.create(this.link,'_self',{location:'no'});
  
  }
  onApply()
  {
  
    
  
        var reference = firebase.database().ref('events/' + this.data.uid + '/applicants/');
        //push(firebase.auth().currentUser.uid);
        
        reference.once('value', resp => {
    
    
   var uarr = getValues(resp);
   console.log(uarr);
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
   
   this.presentAlert(); 
   
   
  });
       
  }
  
}

export const getValues = snapshot => {
    let returnArr = [];

    
    snapshot.forEach(childSnapshot => {
    
        let item = childSnapshot.val();
        //item.key = childSnapshot.key;
        //console.log(item.key);
        returnArr.push(item);
    });

    return returnArr;
};