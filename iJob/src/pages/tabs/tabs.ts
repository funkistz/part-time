import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { JobPage } from '../job/job';
import { SearchEmployeePage } from '../search-employee/search-employee';
import { SettingPage } from '../setting/setting';
import { ProfilePage } from '../profile/profile';
import { NotificationEmployerPage } from '../notification-employer/notification-employer';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabs: any[] = [
    { title: "My Jobs", root: JobPage, icon: "briefcase" },
    { title: "Search", root: SearchEmployeePage, icon: "search" },
    { title: "Profile", root: ProfilePage, icon: "contacts" },
    { title: "Notification", root: NotificationEmployerPage, icon: "notifications" },
    { title: "Setting", root: SettingPage, icon: "settings" }
  ];

  constructor() {}
}
