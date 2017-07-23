import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UpdateProfilePage } from '../../pages/update-profile/update-profile';
import { UpdateProfileUserPage } from '../../pages/update-profile-user/update-profile-user';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  users : FirebaseListObservable<any>;
  user = {
    email: '',
    name: '',
    contact: '',
    image: ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public aDB: AngularFireDatabase,
    public authData: AuthProvider
  ) {

    this.users = aDB.list('/users', {query: {orderByChild : "email", equalTo: authData.getUserData().email}});

  }

  updateProfile(user)
  {
    if(this.authData.getUserData().type == 'company'){

      this.navCtrl.push(UpdateProfilePage, {
        user: user
      });

    }else{

      this.navCtrl.push(UpdateProfileUserPage, {
        user: user
      });

    }
  }

}
