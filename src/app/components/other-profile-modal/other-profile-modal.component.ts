import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Auth } from 'src/app/interfaces/auth';
import { Profile } from 'src/app/interfaces/profile';
import { AuthService } from 'src/app/services/auth.service';
import { LogicService } from 'src/app/services/logic.service';

@Component({
  selector: 'app-other-profile-modal',
  templateUrl: './other-profile-modal.component.html',
  styleUrls: ['./other-profile-modal.component.scss'],
})
export class OtherProfileModalComponent implements OnInit {
  @Input()  data: Profile;
  myForm: FormGroup;
  loading = false;
  authPerson: any;



  
  constructor(private modalController: ModalController, private formBuilder: FormBuilder, 
    private authService: AuthService, private logicService: LogicService) { 
    this.myForm = this.formBuilder.group({
      user: new FormControl(null),
      other_name: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
      website: new FormControl(''),
      twitter: new FormControl(''),
      state: new FormControl(''),
      facebook: new FormControl(''),
      instagram: new FormControl(''),
      address: new FormControl(''),
      birth_date: new FormControl(null),
      profile_image: new FormControl(''),
  });
  }


  ngOnInit() {
    console.log('ddd ', this.data);
    this.authService.getAuthPerson().subscribe({
      next: (auth: any) => {
        this.authPerson = auth;
        this.myForm.get('user')?.setValue(this.authPerson.id)
      }
    });
    this.myForm.get('other_name')?.setValue(this.data?.other_name)
    this.myForm.get('country')?.setValue(this.data?.country)
    this.myForm.get('state')?.setValue(this.data?.state)
    this.myForm.get('city')?.setValue(this.data?.city)
    this.myForm.get('address')?.setValue(this.data?.address)
    this.myForm.get('birth_date')?.setValue(this.data?.birth_date)
    this.myForm.get('website')?.setValue(this.data?.website)
    this.myForm.get('twitter')?.setValue(this.data?.twitter)
    this.myForm.get('facebook')?.setValue(this.data?.facebook)
    this.myForm.get('instagram')?.setValue(this.data?.instagram)
    // this.myForm.get('profile_image')?.setValue(this.data.profile_image)
  }


  dismiss(){
    this.modalController.dismiss();
  }

  submitForm(){
    console.log(this.myForm.value)
    this.authService.updatePersonProfile(this.myForm.value).subscribe({
      next: (data: any) => {
        console.log('SEEE ', data)
        this.authService.setAuthProfile(data);
        this.modalController.dismiss()
      },
      error: (err: any) => {
        console.log('eer ', err)
        this.logicService.showErrorToast('Error', err.error)
      }

    })

  }

}
