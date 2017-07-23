import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-add-job',
  templateUrl: 'add-job.html',
})
export class AddJobPage {

  user = {
    id: '',
    email: '',
    name: '',
    contact: '',
    image: ''
  };

  jobList : FirebaseListObservable<any>;
  job = {
    id: '',
    location: '',
    position: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    gender: '',
    pay: 0,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
      public toastCtrl: ToastController,
      public loadingCtrl: LoadingController,
      public aDB: AngularFireDatabase,
      afAuth: AngularFireAuth,
    ) {

      const authObserver = afAuth.authState.subscribe( user => {
        if (user) {

          aDB.list('/users', {query: {
            orderByChild : "email",
            equalTo: user.email,
            limitToFirst: 1
          }}).subscribe(
            userx => {
              this.user.id = userx[0].$key;
              this.user.email = userx[0].email;
              this.user.name = userx[0].name;
              this.user.contact = userx[0].contact;
              this.user.image = userx[0].image;
            }
          );

          authObserver.unsubscribe();
        } else {
          authObserver.unsubscribe();
        }
      });

      this.jobList = aDB.list('/jobs');

      this.job.id = this.navParams.get('id');
      this.job.location = this.navParams.get('location');
      this.job.position = this.navParams.get('position');
      this.job.start_date = this.navParams.get('start_date');
      this.job.end_date = this.navParams.get('end_date');
      this.job.start_time = this.navParams.get('start_time');
      this.job.end_time = this.navParams.get('end_time');
      this.job.gender = this.navParams.get('gender');
      this.job.pay = this.navParams.get('pay');
  }

  submitProduct(){

    if(this.job.location && this.job.position && this.job.start_date && this.job.end_date && this.job.start_time && this.job.end_time && this.job.gender && this.job.pay){

      if(this.job.id) {

        this.updateJob();

      } else {

        this.addJob();

      }

    }else{
      let toast = this.toastCtrl.create({
        message: 'Please fill all required input (*)',
        duration: 2000
      });
      toast.present();
    }

  }

  addJob(){

    let loading = this.loadingCtrl.create({
      content: 'Adding Job...'
    });

    loading.present();

    this.jobList.push({

      location: this.job.location,
      position: this.job.position,
      start_date: this.job.start_date,
      end_date: this.job.end_date,
      start_time: this.job.start_time,
      end_time: this.job.end_time,
      gender: this.job.gender,
      pay: this.job.pay,
      image: this.user.image,
      company: this.user,
      tags: this.job.location+' '+this.job.position+' '+this.job.gender+' '+this.job.pay,

    }).then( item => {

      loading.dismiss();
      this.navCtrl.pop();

    }, error => {
        console.log(error);
    });

  }

  updateJob(){

    let loading = this.loadingCtrl.create({
      content: 'Updating Job...'
    });

    loading.present();

    this.jobList.update(this.job.id, {

      location: this.job.location,
      position: this.job.position,
      start_date: this.job.start_date,
      end_date: this.job.end_date,
      start_time: this.job.start_time,
      end_time: this.job.end_time,
      gender: this.job.gender,
      pay: this.job.pay,
      image: this.user.image,
      company: this.user,
      tags: this.job.location+' '+this.job.position+' '+this.job.gender+' '+this.job.pay,

    }).then( item => {

      loading.dismiss();

      let toast = this.toastCtrl.create({
        message: 'Job was updated successfully',
        duration: 2000
      });
      toast.present();

      this.navCtrl.pop();
    }, error => {
      console.log(error);
    });

  }

}
