import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Tabs2Page } from '../pages/tabs2/tabs2';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { RegisterCompanyPage } from '../pages/register-company/register-company';
import { RegisterPage } from '../pages/register/register';
import { JobPage } from '../pages/job/job';
import { AddJobPage } from '../pages/add-job/add-job';
import { SearchEmployeePage } from '../pages/search-employee/search-employee';
import { SearchJobPage } from '../pages/search-job/search-job';
import { SettingPage } from '../pages/setting/setting';
import { ProfilePage } from '../pages/profile/profile';
import { UpdateProfilePage } from '../pages/update-profile/update-profile';
import { JobInfoPage } from '../pages/job-info/job-info';
import { UserInfoPage } from '../pages/user-info/user-info';
import { NotificationPage } from '../pages/notification/notification';
import { HireChooseJobPage } from '../pages/hire-choose-job/hire-choose-job';
import { JobAcceptPage } from '../pages/job-accept/job-accept';
import { ApplicationAcceptPage } from '../pages/application-accept/application-accept';
import { EmployeeJobPage } from '../pages/employee-job/employee-job';
import { NotificationEmployerPage } from '../pages/notification-employer/notification-employer';
import { UpdateProfileUserPage } from '../pages/update-profile-user/update-profile-user';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { JobUserProvider } from '../providers/job-user/job-user';

import { Push } from  '@ionic-native/push';;

const firebaseConfig = {
  apiKey: "AIzaSyDwuAey54xSYgvHOfz7V7d0BRtQUEIIw0k",
    authDomain: "ijob-e10a0.firebaseapp.com",
    databaseURL: "https://ijob-e10a0.firebaseio.com",
    projectId: "ijob-e10a0",
    storageBucket: "ijob-e10a0.appspot.com",
    messagingSenderId: "107358540647"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Tabs2Page,
    LoginPage,
    ResetPasswordPage,
    RegisterCompanyPage,
    RegisterPage,
    JobPage,
    AddJobPage,
    SearchEmployeePage,
    SettingPage,
    ProfilePage,
    UpdateProfilePage,
    JobInfoPage,
    UserInfoPage,
    NotificationPage,
    HireChooseJobPage,
    JobAcceptPage,
    EmployeeJobPage,
    SearchJobPage,
    NotificationEmployerPage,
    ApplicationAcceptPage,
    UpdateProfileUserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    Tabs2Page,
    LoginPage,
    ResetPasswordPage,
    RegisterCompanyPage,
    RegisterPage,
    JobPage,
    AddJobPage,
    SearchEmployeePage,
    SettingPage,
    ProfilePage,
    UpdateProfilePage,
    JobInfoPage,
    UserInfoPage,
    NotificationPage,
    HireChooseJobPage,
    JobAcceptPage,
    EmployeeJobPage,
    SearchJobPage,
    NotificationEmployerPage,
    ApplicationAcceptPage,
    UpdateProfileUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    JobUserProvider,
    Camera,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
