import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { JobPage } from '../job/job';
import { EmployeeJobPage } from '../employee-job/employee-job';
import { SearchJobPage } from '../search-job/search-job';
import { SettingPage } from '../setting/setting';
import { ProfilePage } from '../profile/profile';
import { NotificationPage } from '../notification/notification';

@Component({
  selector: 'page-tabs2',
  templateUrl: 'tabs2.html',
})
export class Tabs2Page {

  tabs: any[] = [
    { title: "My Jobs", root: EmployeeJobPage, icon: "briefcase" },
    { title: "Search", root: SearchJobPage, icon: "search" },
    { title: "Profile", root: ProfilePage, icon: "contacts" },
    { title: "Notification", root: NotificationPage, icon: "notifications" },
    { title: "Setting", root: SettingPage, icon: "settings" }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
