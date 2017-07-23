import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

import { UserInfoPage } from '../user-info/user-info';

@Component({
  selector: 'page-search-employee',
  templateUrl: 'search-employee.html',
})
export class SearchEmployeePage {

  employeeList:Array<FirebaseObjectObservable<any>> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public aDB: AngularFireDatabase,
    public loadingCtrl: LoadingController,

  ) {

    this.loadEmployee();
  }

  loadEmployee(search = '', filterby=""){

    this.aDB.list('users', {
      query: {
        orderByChild: 'type',
        equalTo: 'user'
      }
    })
    .subscribe((snapshot) => {

      this.employeeList = [];
      for (let employee of snapshot){
        // '(?=.*are)(?=.*Apples)(?=.*round)'
        let filter = employee.institute + ' ' + employee.location;
        let regex = '(?=.*' + search.toLowerCase() + ')';
        if(filter.toLowerCase().search(regex) == -1 ){

        }else{
          this.employeeList.push(this.aDB.object('users/' + employee.$key));
        }
      };

    });

  }

  search(searchEvent) {
    let term = searchEvent.target.value
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 2) {
      // Load cached users
      this.loadEmployee();
    } else {
      this.loadEmployee(term);
    }
  }

  userInfo(userFirebase){

    let user;
    userFirebase.subscribe( snapshot => {
        user = snapshot;
    });

    this.navCtrl.push(UserInfoPage, {
      user: user
    });
  }

}
