import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, ActionSheetController  } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';

import { JobAcceptPage } from '../job-accept/job-accept';

@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  // jobList: FirebaseListObservable<any>;
  jobList:Array<FirebaseObjectObservable<any>> = [];

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public aDB: AngularFireDatabase,
    afAuth: AngularFireAuth,
    public authData: AuthProvider,
  ) {

    let email = authData.getUserData().email;

    this.loadJob(email + 'pending', 'user_email');

  }

  loadJob(filter:String='false', filterby=""){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.aDB.list('jobUser')
    .subscribe((snapshot) => {

      this.jobList = [];
      for (let job of snapshot){

        if(this.authData.getUserData().type == 'user'){

          if(!job.employee_accept && job.employer_accept)
          this.jobList.push(this.aDB.object('jobs/' + job.job_id));
        }else{
          if(job.employee_accept && !job.employer_accept)
          this.jobList.push(this.aDB.object('jobs/' + job.job_id));
        }
      };

    });

    loading.dismiss();
  }

  jobInfo(jobFirebase){

    let job;
    jobFirebase.subscribe( snapshot => {
        job = snapshot;
    });

    this.navCtrl.push(JobAcceptPage, {
      job: job,
    });
  }

}
