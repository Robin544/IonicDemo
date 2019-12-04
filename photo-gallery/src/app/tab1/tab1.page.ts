import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  userArray: any = []
  newUser = {
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    mobile: ''
  }

  constructor(public toastController: ToastController, public navCtrl: NavController) {
  }

  ionViewDidEnter() {
    this.newUser
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your details have been saved.',
      duration: 2000
    });
    toast.present();
  }

  onSubmit(form: NgForm) {
    var user_Array = localStorage.getItem("userDetails")
    this.userArray = JSON.parse(user_Array)
    this.userArray.push(form.value);
    localStorage.setItem('userDetails', JSON.stringify(this.userArray));
    this.navCtrl.navigateRoot('tabs/tab2')
    this.presentToast()
  }
}
