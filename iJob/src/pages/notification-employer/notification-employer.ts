import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, ActionSheetController  } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';

import { ApplicationAcceptPage } from '../application-accept/application-accept';

@Component({
  selector: 'page-notification-employer',
  templateUrl: 'notification-employer.html',
})
export class NotificationEmployerPage {

  jobList:Array<any> = [];

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

          let count = 0;
          if(job.employee_accept && !job.employer_accept){


            this.aDB.list('users', {query: {orderByChild : 'email', equalTo:job.user_email}})
            .subscribe( snapshot2 => {
                this.jobList[count] = snapshot2[0];
                this.jobList[count]['jobUser_id'] = job.$key;
                this.jobList[count]['apply_position'] = job.job_position;
                this.jobList[count]['apply_location'] = job.job_location;
                count++;
                console.log(this.jobList);
            });

          }
      };


    });

    loading.dismiss();
  }

  jobInfo(user){

    this.navCtrl.push(ApplicationAcceptPage, {
      user: user,
    });
  }

}
