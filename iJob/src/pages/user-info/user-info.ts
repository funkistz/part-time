import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, ModalController, ViewController  } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { HireChooseJobPage } from '../hire-choose-job/hire-choose-job';


@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  user:any;
  jobUser : FirebaseListObservable<any>;

  constructor
  (
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public aDB: AngularFireDatabase
  )
  {

    this.user = this.navParams.get('user');

    this.jobUser = aDB.list('/jobUser');
  }

  hire(){
    let modal = this.modalCtrl.create(HireChooseJobPage,
    {
      user: this.user
    });
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
