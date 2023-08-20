import { OtherProfileModalComponent } from './../other-profile-modal/other-profile-modal.component';
import { MainProfileModalComponent } from './../main-profile-modal/main-profile-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/interfaces/auth';
import { Profile } from 'src/app/interfaces/profile';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  authPerson: Auth | undefined;
  authProfile: Profile | undefined;

  constructor(private authService: AuthService, private modalController: ModalController) { }

  ngOnInit() {
    this.authService.getAuthPerson().subscribe({
      next: (auth: any) => {
        this.authPerson = auth;
      }
    });


    this.authService.getAuthProfile().subscribe({
      next: (profile: any) => {
        this.authProfile = profile;
      }
    });
  }


  async mainProfileModal() {
    const modal = await this.modalController.create({
    component: MainProfileModalComponent,
    componentProps: { data: this.authPerson}
    });
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data)
  }


  async modifyOtherProfileModal() {
    const modal = await this.modalController.create({
    component: OtherProfileModalComponent,
    componentProps: { data: this.authProfile}
    });
    await modal.present();
  
    const data = await modal.onDidDismiss();
    console.log(data)
  }

}
