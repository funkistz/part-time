import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, ActionSheetController  } from 'ionic-angular';

import { AddJobPage } from '../add-job/add-job';
import { JobInfoPage } from '../job-info/job-info';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-job',
  templateUrl: 'job.html',
})
export class JobPage {

  jobList: FirebaseListObservable<any>;

  user = {
    email: '',
    name: '',
    contact: '',
    image: '',
    about: ''
  };

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public aDB: AngularFireDatabase,
    afAuth: AngularFireAuth,
  ) {

    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {

        this.loadJob(user.email, 'company/email');

        authObserver.unsubscribe();
      } else {
        authObserver.unsubscribe();
      }
    });

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

  jobActionSheet(job) {
    let actionSheet = this.actionSheetCtrl.create({
      title: job.company.name.substring(0,1).toUpperCase()+job.company.name.substring(1),
      buttons: [
        {
          text: 'Edit',
          icon: 'create',
          handler: () => {
            this.editJob(job);
          }
        },{
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.removeJob(job.$key);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
        }
      ]
    });
    actionSheet.present();
  }

  addJob(){
    this.navCtrl.push(AddJobPage);
  }

  editJob(job){
    this.navCtrl.push(AddJobPage, {
      id: job.$key,
      location: job.location,
      position: job.position,
      start_date: job.start_date,
      end_date: job.end_date,
      start_time: job.start_time,
      end_time: job.end_time,
      gender: job.gender,
      pay: job.pay,
    });
  }

  jobInfo(job){
    this.navCtrl.push(JobInfoPage, {
      job: job
    });
  }

  removeJob(id: string){
    this.jobList.remove(id);

    let toast = this.toastCtrl.create({
      message: 'Job was deleted successfully',
      duration: 2000
    });
    toast.present();
  }

}
