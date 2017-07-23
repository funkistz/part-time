import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-hire-choose-job',
  templateUrl: 'hire-choose-job.html',
})
export class HireChooseJobPage {

  user:any;
  jobList: FirebaseListObservable<any>;
  jobUserList: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public aDB: AngularFireDatabase,
    afAuth: AngularFireAuth,
  )
  {
      const authObserver = afAuth.authState.subscribe( user => {
        if (user) {

          this.loadJob(user.email, 'company/email');

          authObserver.unsubscribe();
        } else {
          authObserver.unsubscribe();
        }
      });

      this.jobUserList = this.aDB.list('/jobUser');

      this.user = this.navParams.get('user');
  }

  loadJob(filter:String='false', filterby=""){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    if(filter == 'false'){
      this.jobList = this.aDB.list('/jobs');
    }else{
      this.jobList = this.aDB.list('/jobs', {query: {orderByChild : filterby, equalTo:filter}});
    }

    loading.dismiss();
  }

  hire(job){

    let userjobkey = this.user.$key + job.$key;

    let loading = this.loadingCtrl.create({
      content: 'Hiring...'
    });

    loading.present();

    this.aDB.object('/jobUser/'+ userjobkey).set(
      {
        user_email: this.user.email,
        job_id: job.$key,
        job_position: job.position,
        job_location: job.location,
        employer_accept: true,
        employee_accept: false,
      }
    ).then( item => {

      loading.dismiss();
      this.navCtrl.pop();

    }, error => {
        console.log(error);
    });

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
