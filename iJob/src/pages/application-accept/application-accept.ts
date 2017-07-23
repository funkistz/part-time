import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-application-accept',
  templateUrl: 'application-accept.html',
})
export class ApplicationAcceptPage {

  user:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public aDB: AngularFireDatabase,
    afAuth: AngularFireAuth,
    public authData: AuthProvider,
  ) {
    this.user = this.navParams.get('user');

  }

  acceptOffer(){

    let loading = this.loadingCtrl.create({
      content: 'Accepting...'
    });

    loading.present();

    this.aDB.object('/jobUser/'+ this.user.jobUser_id).update(
    {
      employer_accept: true,
    }
    ).then( item => {

      loading.dismiss();
      this.navCtrl.pop();

    }, error => {
        console.log(error);
    });

  }

}
