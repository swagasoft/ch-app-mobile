import { LogicService } from './../../services/logic.service';
import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Auth } from 'src/app/interfaces/auth';

@Component({
  selector: 'app-main-profile-modal',
  templateUrl: './main-profile-modal.component.html',
  styleUrls: ['./main-profile-modal.component.scss'],
})
export class MainProfileModalComponent implements OnInit {
  @Input()  data: Auth;
  myForm: FormGroup;
  loading = false;


  validationMessages = {
    email: [
        // {type: 'required', message: 'Email is required.'},
        {type: 'pattern', message: 'Enter a valid email.'}
    ],
    username: [
        {type: 'required', message: 'Phone number is required.'},
        {type: 'minlength', message: 'phone must be at least 8 characters long.'},
    ],
};
  
  constructor(private modalController: ModalController, private formBuilder: FormBuilder, 
    private authService: AuthService, private logicService: LogicService) { 
    this.myForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required, Validators.minLength(8)]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl(''),
  });
  }


  ngOnInit() {
    console.log('ddd ', this.data);
    this.myForm.get('username')?.setValue(this.data.username)
    this.myForm.get('email')?.setValue(this.data.email)
    this.myForm.get('last_name')?.setValue(this.data.last_name)
    this.myForm.get('first_name')?.setValue(this.data.first_name)
  }


  dismiss(){
    this.modalController.dismiss();
  }

  submitForm(){
    console.log(this.myForm.value)
    this.authService.updateAuthPerson(this.myForm.value).subscribe({
      next: (data: any) => {
        console.log('SEEE ', data)
        this.authService.setAuthPerson(data);
        this.modalController.dismiss()
      },
      error: (err: any) => {
        console.log('eer ', err)
        this.logicService.showErrorToast('Error', err.error)
      }

    })

  }

}
