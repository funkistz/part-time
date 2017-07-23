import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController, ToastController,
  Loading,
  AlertController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';

@Component({
  selector: 'page-update-profile-user',
  templateUrl: 'update-profile-user.html',
})
export class UpdateProfileUserPage {

  user:any;
  public signupForm:FormGroup;
  public loading:Loading;

  captureDataUrl: string;
  product_image_url;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public aDB: AngularFireDatabase,
    public camera: Camera,
    public toastCtrl: ToastController,
  ) {

      this.user = navParams.get('user');
      console.log(this.user);

      this.signupForm = formBuilder.group({
        name: ['', Validators.compose([Validators.required])],
        contact: ['', Validators.compose([Validators.required])],
        about: [''],
        location: ['', Validators.compose([Validators.required])],
        institute: ['', Validators.compose([Validators.required])],
        job: [''],
        language: [''],
        start_date: [''],
        end_date: [''],
        start_time: [''],
        end_time: [''],
        experience: [''],
      });
  }

  editUser(){
    if (!this.signupForm.valid){

    } else {
      this.updateUser()
    }
  }

  updateUser(){

    let loading = this.loadingCtrl.create({
      content: 'Updating...'
    });

    loading.present();

    this.aDB.object('/users/' + this.user.$key).update({

      name: this.signupForm.value.name || '',
      contact: this.signupForm.value.contact || '',
      about: this.signupForm.value.about || '',
      location: this.signupForm.value.location || '',
      job: this.signupForm.value.job || '',
      language: this.signupForm.value.language || '',
      start_date: this.signupForm.value.start_date || '',
      end_date: this.signupForm.value.end_date || '',
      start_time: this.signupForm.value.start_time || '',
      end_time: this.signupForm.value.end_time || '',
      experience: this.signupForm.value.experience || '',

    }).then( item => {

      loading.dismiss();

      if(this.captureDataUrl){

        this.upload(this.user.$key);
      }else{
        let toast = this.toastCtrl.create({
          message: 'Profile was updated successfully',
          duration: 2000
        });
        toast.present();
      }

      this.navCtrl.pop();

    }, error => {
      console.log(error);
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

    this.aDB.object('/users/' + this.user.$key).update({

      image: this.product_image_url,

    }).then( newProduct => {

      loading.dismiss();

      let toast = this.toastCtrl.create({
        message: 'Successfull',
        duration: 2000
      });
      toast.present();

      this.navCtrl.pop();

    }, error => {
      console.log(error);
    });

  }

}
