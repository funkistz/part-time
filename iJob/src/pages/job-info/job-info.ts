import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-job-info',
  templateUrl: 'job-info.html',
})
export class JobInfoPage {

  job:any;
  isApply:any;

  user:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authData: AuthProvider,
    public aDB: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {

    this.job = this.navParams.get('job');
    this.isApply = this.navParams.get('apply');

    this.user = authData.getUserData();
  }

  applyJob(job){

    let loading = this.loadingCtrl.create({
      content: 'Applying...'
    });

    loading.present();

    this.aDB.object('/jobUser/'+ this.user.$key ).set(
      {
        user_email: this.user.email,
        job_id: job.$key,
        job_position: job.position,
        job_location: job.location,
        employee_accept: true,
        employer_accept: false,
      }
    ).then( item => {

      loading.dismiss();
      this.navCtrl.pop();

    }, error => {
        console.log(error);
    });

  }


}
