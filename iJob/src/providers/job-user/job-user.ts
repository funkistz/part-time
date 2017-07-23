import { Injectable } from '@angular/core';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

@Injectable()
export class JobUserProvider {

  jobList:Array<FirebaseObjectObservable<any>> = [];

  constructor(
    public aDB: AngularFireDatabase
  )
  {}

  setNotification()
  {
    return this.aDB.list('jobUser')
    .subscribe((snapshot) => {

      for (let job of snapshot){

        if(!job.employee_accept)
          this.jobList.push(this.aDB.object('jobs/' + job.job_id));
      };

    });
  }

  getNotification()
  {
    return this.jobList;
  }

}
