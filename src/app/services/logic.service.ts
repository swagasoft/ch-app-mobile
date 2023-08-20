import { Injectable } from '@angular/core';
import { ActionSheetController, AlertController, PopoverController, ToastController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor(private toastr: ToastrService, private actionSheetCtrl: ActionSheetController, private alertController: AlertController) { }

  showSuccessToast(title: string, message: string) {
    this.toastr.success( message, title);
  }
  
  showErrorToast(title: string, message: string) {
    this.toastr.error( message, title);
  }

  showWarningToast(title: string, message: string) {
    this.toastr.warning(message, title);
  }

  showInfoToast(title: string, message: string) {
    this.toastr.info( message,title);
  }

  cleanUpMessage(message: any){
    const newMessage: string = JSON.stringify(message);
    const msg = newMessage.replace(/{/g,'').replace(/}/g,'').replace('[','').replace(']','');
    return msg;
  }


  async alertPromise(head: string, msg: string): Promise<void | boolean> {
    let resolveFunction: (choice: boolean) => void;
    const promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });
    const alert = await this.alertController
        .create({
          header: head, message: msg,
          cssClass:'my-alert-class',
          mode:"ios",
          buttons: [
            {
              text: 'Later',
              role: 'cancel',
              
            },
            {
              text: 'Continue',
              handler: () => resolveFunction(true)
            }
          ]
        });
    await alert.present();
    return promise;
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Complete your profile',
      subHeader: 'Update your profile with the right information. Connect to your love ones with ease',
      mode:'ios',
      buttons: [
     
        {
          text: 'Continue',
          data: {
            action: true,
          },
        },
    
        {
          text: 'Maybe Later',
          role: 'cancel',
          data: {
            action:  false,
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    console.log(result)
  }
}
