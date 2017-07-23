import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';

import { JobInfoPage } from '../job-info/job-info';

@Component({
  selector: 'page-search-job',
  templateUrl: 'search-job.html',
})
export class SearchJobPage {

  jobList:Array<FirebaseObjectObservable<any>> = [];
  jobUser:Array<any> = [];

  user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public aDB: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public authData: AuthProvider,
  ) {

    this.loadJob();
    this.user = authData.getUserData();
  }

  loadJob(search = '', filterby=""){

    this.aDB.list('jobs')
    .subscribe((snapshot) => {

      this.jobList = [];

      for (let job of snapshot){
        // '(?=.*are)(?=.*Apples)(?=.*round)'

        if(!job.employee_accept && !job.employer_accept){

          let filter = job.position + ' ' + job.location;
          let regex = '(?=.*' + search.toLowerCase() + ')';
          if(filter.toLowerCase().search(regex) == -1 ){

          }else{

            const authObserver = this.aDB.list('jobUser', {
              query: {
                orderByChild: 'job_id',
                equalTo: job.$key
              }
            }).subscribe((snapshot2) => {

                if(snapshot2[0] != null){

                  if((!snapshot2[0].employee_accept && !snapshot2[0].employer_accept) && snapshot2[0].email != this.user.email ){

                    this.jobList.push(this.aDB.object('jobs/' + job.$key));
                  }
                }else{
                  this.jobList.push(this.aDB.object('jobs/' + job.$key));
                }

                authObserver.unsubscribe();

            });
          }
        }

      };

    });

  }

  search(searchEvent) {
    let term = searchEvent.target.value
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 2) {
      // Load cached users
      this.loadJob();
    } else {
      this.loadJob(term);
    }
  }

  jobInfo(jobFirebase){

    let job;
    jobFirebase.subscribe( snapshot => {
        job = snapshot;
    });

    this.navCtrl.push(JobInfoPage, {
      job: job,
      apply:true
    });
  }

}
