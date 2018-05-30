import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import firebase from 'firebase';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
    personalForm: FormGroup;
    academicForm: FormGroup;
    interestForm: FormGroup;
    profileinfo: string = "";
    
    userRef : any;
    
    user:any = {};
    users = [];
    searchTerm: string = '';
    cities = [];
    streams = [];
    colleges = [];
    mycolleges = [];
    citycolleges = [];
    enggBranches = [];
    semesters=["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8","Pass Out"];
    yops = [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];
    
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
  var currentuser = firebase.auth().currentUser;
    //get uid
    console.log(currentuser.uid);
    var s = "users/" + currentuser.uid;
    this.personalForm = this.formBuilder.group({
      fname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lname: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      mobno: ['', Validators.compose([Validators.pattern('^[6789]\\d{9}$'), Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      college: ['', Validators.compose([Validators.required])],
      stream: ['', Validators.compose([Validators.required])],
      branch: ['', Validators.compose([Validators.required])],
      semester: ['', Validators.compose([Validators.required])],
      yop: ['', Validators.compose([Validators.required])]
    });
    this.academicForm = this.formBuilder.group({
      ssc: ['', Validators.compose([Validators.max(99), Validators.min(40)])],
      hsc: ['', Validators.compose([Validators.max(99), Validators.min(40)])],
      diploma: ['', Validators.compose([Validators.max(99), Validators.min(40)])],
      sem1: ['', Validators.compose([Validators.max(99), Validators.min(40)])],
      sem2: ['', Validators.compose([Validators.max(99), Validators.min(40)])],
      sem3: ['', Validators.compose([Validators.max(99), Validators.min(40)])],
      sem4: ['', Validators.compose([Validators.max(99), Validators.min(40)])],
      sem5: ['', Validators.compose([Validators.max(99), Validators.min(40)])],
      sem6: ['', Validators.compose([Validators.max(99), Validators.min(40)])],
      sem7: ['', Validators.compose([Validators.max(99), Validators.min(40)])],
      sem8: ['', Validators.compose([Validators.max(99), Validators.min(40)])]
    });
    this.interestForm = this.formBuilder.group({
      banking: [false],
      crt: [false],
      it: [false],
      bpo: [false],
      kpo: [false],
      govt: [false],
      internship : [false]
    });
  this.userRef = firebase.database().ref(s);
  
  this.userRef.on('value', resp => {
    this.user = resp.val();       
     console.log(this.user);
     this.populateForm();
     
    });
    this.profileinfo = "personal";    
    this.showCities();
    this.showColleges();
    this.showStreams();
    this.showBranches();
  }
  showStreams()
  {
    var refStreams = firebase.database().ref('streams/');
    refStreams.on('value', resp => {
    this.streams = [];
    this.streams = resp.val();
  });
  }
  
  showBranches()
  {
    var refEnggBranches = firebase.database().ref('enggBranches/');
    refEnggBranches.on('value', resp => {
    this.enggBranches = [];
    this.enggBranches = resp.val();
  });
  }
  
  selectCollege(item)
  {
    console.log(item.value.name);
  }
  
  showColleges()
  {
    var refColleges = firebase.database().ref('colleges/');
    refColleges.on('value', resp => {
    this.colleges = [];
    this.colleges = snapshotToArray(resp);
  });
  }
  
  onSelectCity(mycity)
  {
    console.log("City Selected" + mycity);
    if(this.personalForm.controls['college'].value != null)
    {
        if(mycity != this.user.city)
        {
            this.personalForm.controls['college'].setValue('');
        }
    }
    this.citycolleges = this.colleges.filter(it => {
    //console.log(it.city + "--" + mycity);
    return it.city.toLowerCase().includes(mycity.toLowerCase());
    });
    console.log(this.citycolleges);
  }
  
  setFilteredItems(mysearchTerm)
  {
    console.log('here');
    console.log(mysearchTerm);
    console.log(this.citycolleges);
    this.mycolleges = this.citycolleges.filter((item) => {
            return item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        }); 
  }
  
  
  showCities()
  {
    var refCities = firebase.database().ref('cities/');
    refCities.on('value', resp => {
    this.cities = [];
    this.cities = snapshotToArray(resp);
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  
  saveInterestData()
  {
    var u: any = {};
     if(this.interestForm.controls['banking'].value != null)
        u.banking = this.interestForm.controls['banking'].value;
    if(this.interestForm.controls['crt'].value != null)
        u.crt = this.interestForm.controls['crt'].value;
    if(this.interestForm.controls['it'].value != null)
        u.it = this.interestForm.controls['it'].value;
    if(this.interestForm.controls['bpo'].value != null)
        u.bpo = this.interestForm.controls['bpo'].value;
    if(this.interestForm.controls['kpo'].value != null)
        u.kpo = this.interestForm.controls['kpo'].value;
    if(this.interestForm.controls['govt'].value != null)
        u.govt = this.interestForm.controls['govt'].value;
    if(this.interestForm.controls['internship'].value != null)
        u.internship = this.interestForm.controls['internship'].value;
    
    console.log(u);
    this.userRef.update(u);
    this.navCtrl.push(HomePage);
    //alert saying that successful in updating ur profile
  }
  saveAcademicData(){
    var u: any = {};
    if(this.academicForm.controls['ssc'].value != null)
        u.ssc = this.academicForm.controls['ssc'].value;
    if(this.academicForm.controls['hsc'].value != null)
        u.hsc = this.academicForm.controls['hsc'].value;
    if(this.academicForm.controls['diploma'].value != null)
        u.diploma = this.academicForm.controls['diploma'].value;
    if(this.academicForm.controls['sem1'].value != null)
        u.sem1 = this.academicForm.controls['sem1'].value;
    if(this.academicForm.controls['sem2'].value != null)
        u.sem2 = this.academicForm.controls['sem2'].value;
    if(this.academicForm.controls['sem3'].value != null)
        u.sem3 = this.academicForm.controls['sem3'].value;
    if(this.academicForm.controls['sem4'].value != null)
        u.sem4 = this.academicForm.controls['sem4'].value;
    if(this.academicForm.controls['sem5'].value != null)
        u.sem5 = this.academicForm.controls['sem5'].value;
    if(this.academicForm.controls['sem6'].value != null)
        u.sem6 = this.academicForm.controls['sem6'].value;
    if(this.academicForm.controls['sem7'].value != null)
        u.sem7 = this.academicForm.controls['sem7'].value;
    if(this.academicForm.controls['sem8'].value != null)
        u.sem8 = this.academicForm.controls['sem8'].value;
    
    console.log(u);
    
    this.userRef.update(u);
    this.profileinfo = "interest";
  }
  savePersonalData(){
    
    
    var u : any = {};
    if(this.personalForm.controls['fname'].value != null)
        u.firstName = this.personalForm.controls['fname'].value;
    if(this.personalForm.controls['lname'].value != null)
        u.lastName = this.personalForm.controls['lname'].value;
    if(this.personalForm.controls['mobno'].value != null)
        u.mobno = this.personalForm.controls['mobno'].value;
    if(this.personalForm.controls['city'].value != null)
        u.city = this.personalForm.controls['city'].value;
    if(this.personalForm.controls['college'].value != null)
        u.college = this.personalForm.controls['college'].value;
    if(this.personalForm.controls['stream'].value != null)
        u.stream = this.personalForm.controls['stream'].value;
    if(this.personalForm.controls['branch'].value != null)
        u.branch = this.personalForm.controls['branch'].value;
    if(this.personalForm.controls['semester'].value != null)
        u.semester = this.personalForm.controls['semester'].value;
    if(this.personalForm.controls['yop'].value != null)
        u.yop = this.personalForm.controls['yop'].value;
       
     console.log(u);
     u.isProfileComplete = true;
     this.userRef.update(u);
   this.profileinfo = "academic";  
  
        
    }
    populateForm()
    {
        this.personalForm.controls['fname'].setValue(this.user.firstName);
        this.personalForm.controls['lname'].setValue(this.user.lastName);
        this.personalForm.controls['mobno'].setValue(this.user.mobno);
        this.personalForm.controls['city'].setValue(this.user.city);
        this.personalForm.controls['college'].setValue(this.user.college);
        this.personalForm.controls['stream'].setValue(this.user.stream);
        this.personalForm.controls['branch'].setValue(this.user.branch);
        this.personalForm.controls['semester'].setValue(this.user.semester);
        this.personalForm.controls['yop'].setValue(this.user.yop);
        
        //interest form
        this.interestForm.controls['banking'].setValue(this.user.banking);
        this.interestForm.controls['crt'].setValue(this.user.crt);
        this.interestForm.controls['it'].setValue(this.user.crt);
        this.interestForm.controls['bpo'].setValue(this.user.bpo);
        this.interestForm.controls['kpo'].setValue(this.user.kpo);
        this.interestForm.controls['govt'].setValue(this.user.govt);
        this.interestForm.controls['internship'].setValue(this.user.internship);
        
        //academic
        this.academicForm.controls['ssc'].setValue(this.user.ssc);
        this.academicForm.controls['hsc'].setValue(this.user.hsc);
        this.academicForm.controls['diploma'].setValue(this.user.diploma);
        this.academicForm.controls['sem1'].setValue(this.user.sem1);
        this.academicForm.controls['sem2'].setValue(this.user.sem2);
        this.academicForm.controls['sem3'].setValue(this.user.sem3);
        this.academicForm.controls['sem4'].setValue(this.user.sem4);
        this.academicForm.controls['sem5'].setValue(this.user.sem5);
        this.academicForm.controls['sem6'].setValue(this.user.sem6);
        this.academicForm.controls['sem7'].setValue(this.user.sem7);
        this.academicForm.controls['sem8'].setValue(this.user.sem8);
    }
}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
