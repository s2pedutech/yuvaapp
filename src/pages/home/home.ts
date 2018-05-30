import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Login } from '../login/login';
import { GalleryPage } from '../gallery/gallery';
import { TrainingPage } from '../training/training';
import { TrainingdetailsPage } from '../trainingdetails/trainingdetails';
import { AboutUsPage } from '../about-us/about-us';
import { NewsPage } from '../news/news';
import { DriveDetailsPage } from '../drive-details/drive-details';
import { WorkshopPage } from '../workshop/workshop';
import { InternshipPage } from '../internship/internship';
import { ProfilePage } from '../profile/profile';

import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
trustedVideoUrl: Array<SafeResourceUrl> = [];
    events=[];
    gallery = [];
    workshops=[];
    internships=[];
    videos = [];
    video = "";
    noCampus = false;
    yuva: string = "";
    constructor(public navCtrl: NavController, public authData: AuthData, private domSanitizer: DomSanitizer) {
    this.yuva = "workshop";
    this.addVideoUrls();
    this.showWorkshops();
    this.showEvents();
    this.showGallery();
    this.showInternships();
    this.video = "https://www.youtube.com/embed/MLleDRkSuvk";
  //this.trustedVideoUrl.push(this.domSanitizer.bypassSecurityTrustResourceUrl(this.video)); 
  
    var lastseen = new Date();
    
    
    var curruser = firebase.auth().currentUser.uid;
    var s = "users/" + curruser;
    var userref = firebase.database().ref(s);
    var l:any = {};
    l.lastSeenDate = lastseen.toString() ;
    userref.update(l);
  }
  
  addVideoUrls()
  {
    firebase.database().ref('videos/').on('value',resp => {
    this.videos = [];
    this.videos = snapshotToArray(resp);
    //convert all the videos into iframe videos
    for (let myvideo in this.videos)
    {
        console.log("pushing: " + this.videos[myvideo].url);
        this.trustedVideoUrl.push(this.domSanitizer.bypassSecurityTrustResourceUrl(this.videos[myvideo].url));
    }
    });
  }
  gotoDetails(item)
  {
    this.navCtrl.push(DriveDetailsPage,{"details":item});
  }
  
  gotoGallery()
  {
    this.navCtrl.push(GalleryPage);
  }
  
  gotoTraining()
  {
    this.navCtrl.push(TrainingPage);
  }
  
  gotoAboutUs()
  {
    this.navCtrl.push(AboutUsPage);
  }
  
  gotoNews()
  {
    // about page is nothing but our team page
    this.navCtrl.push(NewsPage);
  }
  gotoWorkshop(item)
  {
    this.navCtrl.push(WorkshopPage,{"details":item});
  }
  gotoInternship(item)
  {
    this.navCtrl.push(InternshipPage,{"details":item});
  }
  gotoProfile()
  {
    this.navCtrl.push(ProfilePage);
  }
  showEvents()
  {
    firebase.database().ref('events/').on('value',resp => {
    this.events = [];
    this.events = snapshotToArray(resp);
    console.log(this.events);
    if(this.events.length == 0)
        this.noCampus = true;
    }); 
  }
  showGallery()
  {
    firebase.database().ref('gallery/').on('value',resp => {
    
     
    this.gallery = [];
    this.gallery = snapshotToArray(resp);
    console.log(this.gallery);
    }); 
  }
  
  showWorkshops()
  {
    firebase.database().ref('workshops/').on('value',resp => {
    this.workshops = [];
    this.workshops = snapshotToArray(resp);
    console.log(this.workshops);
    }); 
  }
  
  showInternships()
  {
    firebase.database().ref('internships/').on('value',resp => {
    this.internships = [];
    this.internships = snapshotToArray(resp);
    console.log(this.internships);
    }); 
  }
  
  logOut() {
      this.authData.logoutUser().then(() => {
          this.navCtrl.setRoot(Login);
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