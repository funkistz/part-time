import { Component } from '@angular/core';
import { App, Nav, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  loading:Loading;

  constructor(private app: App, public navCtrl: NavController, public navParams: NavParams,
    public authData: AuthProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  logOut() {
    this.authData.logoutUser()
    .then( authData => {

      this.app.getRootNav().setRoot(LoginPage);

    }, error => {
      this.loading.dismiss().then( () => {
        let alert = this.alertCtrl.create({
          message: error.message,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

}
