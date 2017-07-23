import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController, ToastController,
  Loading,
  AlertController } from 'ionic-angular';

  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { AuthProvider } from '../../providers/auth/auth';
  import { TabsPage } from '../tabs/tabs';

  import { EmailValidator } from '../../validators/email';
  import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
  import { Camera, CameraOptions } from '@ionic-native/camera';
  import * as firebase from 'firebase';

  @Component({
    selector: 'page-register',
    templateUrl: 'register.html',
  })
  export class RegisterPage {

    userList : FirebaseListObservable<any>;
    public signupForm:FormGroup;
    public loading:Loading;

    captureDataUrl: string;
    product_image_url;

    user_key:any;

    constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public authData: AuthProvider,
      public formBuilder: FormBuilder,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      public aDB: AngularFireDatabase,
      public camera: Camera,
      public toastCtrl: ToastController,
    ) {

      this.signupForm = formBuilder.group({
        name: ['', Validators.compose([Validators.required])],
        contact: ['', Validators.compose([Validators.required])],
        institute: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        password2: ['', Validators.compose([Validators.minLength(6), Validators.required])],
        job: [''],
        language: [''],
        start_date: [''],
        end_date: [''],
        start_time: [''],
        end_time: [''],
        experience: [''],
        about: [''],

      });

      this.userList = aDB.list('/users');
    }

    signupUser(){
      if (!this.signupForm.valid){
        console.log(this.signupForm.value);
      } else {
        this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
        .then(() => {

          this.addUser()

        }, (error) => {
          this.loading.dismiss().then( () => {
            var errorMessage: string = error.message;
            let alert = this.alertCtrl.create({
              message: errorMessage,
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

    addUser(){

      let loading = this.loadingCtrl.create({
        content: 'Registering...'
      });

      loading.present();

      this.user_key = this.userList.push({

        email: this.signupForm.value.email,
        name: this.signupForm.value.name,
        contact: this.signupForm.value.contact,
        institute: this.signupForm.value.institute,
        type: 'user',
        job: this.signupForm.value.job,
        language: this.signupForm.value.language,
        start_date: this.signupForm.value.start_date,
        end_date: this.signupForm.value.end_date,
        start_time: this.signupForm.value.start_time,
        end_time: this.signupForm.value.end_time,
        experience: this.signupForm.value.experience,
        about: this.signupForm.value.about,

      }).key;

      loading.dismiss();

      const aDBObserver = this.aDB.list('/users', {query: {orderByChild : "email", equalTo: this.signupForm.value.email }}).subscribe( item => {

          aDBObserver.unsubscribe();
          this.authData.setUserData(item[0]);

          if(this.captureDataUrl){

            this.upload(item[0].$key);
          }else{
            let toast = this.toastCtrl.create({
              message: 'Register successfully',
              duration: 2000
            });
            toast.present();
          }

          aDBObserver.unsubscribe();

          this.authData.loginUser(this.signupForm.value.email, this.signupForm.value.password)
          .then( authData => {
            this.navCtrl.setRoot(TabsPage);
          });
      });

    }

    capture() {
      const cameraOptions: CameraOptions = {
        quality: 50,
        sourceType: 0,
        targetWidth: 450,
        targetHeight: 450,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      };

      this.camera.getPicture(cameraOptions).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
      });
    }

    upload(image_name) {

      let loading = this.loadingCtrl.create({
        content: 'Uploading Image...'
      });

      loading.present();

      let storageRef = firebase.storage().ref();
      // Create a timestamp as filename
      const filename = Math.floor(Date.now() / 1000);

      // Create a reference to 'images/todays-date.jpg'
      const imageRef = storageRef.child(`user_images/${image_name}/${filename}.jpg`);

      this.product_image_url = "https://firebasestorage.googleapis.com/v0/b/ijob-e10a0.appspot.com/o/user_images%2F"+image_name+"%2F"+filename+".jpg?alt=media";

      imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {

        loading.dismiss();
        this.updateProductImage(image_name);
      });
    }

    updateProductImage(id){

      let loading = this.loadingCtrl.create({
        content: 'Updating...'
      });

      loading.present();

      this.aDB.object('/users/' + this.user_key).update({

        image: this.product_image_url,

      }).then( newProduct => {

        loading.dismiss();

        let toast = this.toastCtrl.create({
          message: 'Successfull',
          duration: 2000
        });
        toast.present();

      }, error => {
        console.log(error);
      });

    }

  }
