import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

import { JobInfoPage } from '../job-info/job-info';

@Component({
  selector: 'page-employee-job',
  templateUrl: 'employee-job.html',
})
export class EmployeeJobPage {

  user:any;
  jobList:Array<FirebaseObjectObservable<any>> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public aDB: AngularFireDatabase,
  ) {

    this.aDB.list('jobUser')
    .subscribe((snapshot) => {

      this.jobList = [];
      for (let job of snapshot){

        if(job.employee_accept && job.employer_accept)
          this.jobList.push(aDB.object('jobs/' + job.job_id));
      };

    });

  }

  jobInfo(jobFirebase){

    let job;
    jobFirebase.subscribe( snapshot => {
        job = snapshot;
    });

    this.navCtrl.push(JobInfoPage, {
      job: job
    });
  }

}
