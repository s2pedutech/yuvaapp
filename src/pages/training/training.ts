import { Component } from '@angular/core';
import { NavController, ViewController, LoadingController } from 'ionic-angular';
import { TrainingdetailsPage } from '../trainingdetails/trainingdetails';
import firebase from 'firebase';
@Component({
  selector: 'page-training',
  templateUrl: 'training.html'
})
export class TrainingPage {

data = {};
data1 = {};
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public loadingCtrl: LoadingController) {
  //this.presentLoadingDefault();
    firebase.database().ref('trainings/').on('value', resp => {
  
    this.data = [];
    this.data = resp.val();
    console.log(this.data);
  });
  
  
  }
  
  presentLoadingDefault() {
  let loading = this.loadingCtrl.create({
    content: 'Loading Training Data...'
  });

  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 1000);
}
  
  ionViewDidLoad()
  {
    
  }
  
  fun()
  {
    firebase.database().ref('trainings/').on('value', resp => {
  
   
    this.data1 = resp.val();
    console.log(this.data1);
    });
  }
  
  gotoTrainingDetails(item)
  {
    this.navCtrl.push(TrainingdetailsPage,{"details":item});
  }
  ngOnInit(){
  
  
  }
  
}
