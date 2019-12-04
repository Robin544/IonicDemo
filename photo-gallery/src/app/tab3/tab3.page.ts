import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user_Data: any = []
  index: any
  userArray: any = [];

  constructor(public navCtrl: NavController, public activatedRoute: ActivatedRoute, public router: Router, public toastController: ToastController) {
    activatedRoute.queryParams.subscribe(params => {
      this.index = params['id']
    })
  }

  ngOnInit() {
    var editData = localStorage.getItem("userDetails")
    var edit_Data = JSON.parse(editData)
    this.user_Data = edit_Data[this.index]
  }

  ionViewDidEnter() {
    this.ngOnInit()
  }

  // function for toast -->
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your details have been updated.',
      duration: 2000
    });
    toast.present();
  }
  
  // function to update the user details -->
  onUpdate(form: NgForm) {
    var user_Array = localStorage.getItem("userDetails")
    this.userArray = JSON.parse(user_Array)
    this.userArray[this.index] = form.value;
    localStorage.setItem('userDetails', JSON.stringify(this.userArray));
    this.navCtrl.navigateRoot('tabs/tab2')
    this.presentToast()
  }
}