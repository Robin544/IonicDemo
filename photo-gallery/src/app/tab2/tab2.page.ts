import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  usersDetail: any = []
  index: any
  userArray: any;
  showForce: boolean;

  constructor(private router: Router, 
    public toastController: ToastController, 
    public alertController: AlertController) {}

  ionViewDidEnter() {
    var usersArray = localStorage.getItem("userDetails")
    this.usersDetail = JSON.parse(usersArray)
  }

  // function for toast -->
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your details have been deleted.',
      duration: 2000
    });
    toast.present();
  }

  // function to send the index of a particular user to another component to perform updation -->
  onEdit(i: any) {
    this.index = i;
    this.router.navigate(['/tabs/tab3'], {
      "queryParams": { id: this.index }
    })
  }

  // function to confirm the delete operation of the user details -->
  async onDelete(i: any) {
    const alert = await this.alertController.create({
      header: 'Please Confirm!',
      message: 'Do you really want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: 'Delete',
          handler: () => {
            var user_Array = localStorage.getItem("userDetails")
            this.userArray = JSON.parse(user_Array)
            this.userArray.splice(i, 1)
            localStorage.setItem('userDetails', JSON.stringify(this.userArray));
            this.presentToast()
          }
        }
      ]
    });
    await alert.present();
  }
}
