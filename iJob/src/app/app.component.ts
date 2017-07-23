import { Component } from '@angular/core';
import { Platform, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Tabs2Page } from '../pages/tabs2/tabs2';
import { LoginPage } from '../pages/login/login';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth'
import { AuthProvider } from '../providers/auth/auth';

import { Push,PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    afAuth: AngularFireAuth,
    public authData: AuthProvider,
    public aDB: AngularFireDatabase,
    public push: Push,
    public alertCtrl: AlertController
  ) {

    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {

        aDB.list('/users', {query: {
          orderByChild : "email",
          equalTo: user.email,
          limitToFirst: 1
        }}).subscribe(
          userx => {
            authData.setUserData(userx[0]);
            if(userx[0].type == 'company')
              this.rootPage = TabsPage;
            else
              this.rootPage = Tabs2Page;

            this.pushsetup();
          }
        );

        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  pushsetup(){
    const options:PushOptions = {
      android: {
        senderID: '107358540647'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    const PushObject: PushObject = this.push.init(options);
    let user_id = this.authData.getUserData().$key;

    PushObject.on('notification').subscribe((notification: any) => {
      if(notification.additionalData.foreground && notification.additionalData.user_id == user_id) {
        let youralert = this.alertCtrl.create({
          title: notification.message,
          message: notification.message
        });
        console.log(notification);
        youralert.present();
      }
    });

    PushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    PushObject.on('error').subscribe((error: any) => console.log('', error));


  }
}
