import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import firebase from 'firebase';
@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
    news = [];
  constructor(public navCtrl: NavController, private iab: InAppBrowser) {
    this.news = [];
    
    firebase.database().ref('news/').on('value',resp => {
    
     
    this.news = [];
    this.news = snapshotToArray(resp);
    }); 
    
  }
  
  openLink(link)
  {
    const browser = this.iab.create(link,'_self',{location:'no'});
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
