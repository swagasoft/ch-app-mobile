import { Router } from '@angular/router';
import { LogicService } from './../../services/logic.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signnup',
  templateUrl: './signnup.component.html',
  styleUrls: ['./signnup.component.scss'],
})
export class SignnupComponent implements OnInit {
  signUpForm: FormGroup;
  loading: boolean;
  passwordRegex='^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$';
  passwordType='password';


  validationMessages = {
    email: [
        // {type: 'required', message: 'Email is required.'},
        {type: 'pattern', message: 'Enter a valid email.'},
        {type: 'required', message: 'Email is required!.'},
    ],
    password: [
        {type: 'required', message: 'Password is required.'},
        {type: 'minlength', message: 'Password must be at least 8 characters long.'},
        {type: 'pattern', message: 'Password must have uppercase, lowercase and number.'}
    ],

    lastName: [
        {type: 'required', message: 'First Name is required.'},
        {type: 'minlength', message: 'First Name must be at least 3 characters long.'}
    ],

    firstName: [
        {type: 'required', message: 'Last Name is required.'},
        {type: 'minlength', message: 'Last Name must be at least 3 characters long.'}
    ],

};



  constructor( private formBuilder: FormBuilder, private authService: AuthService, private logicService: LogicService,
    private router: Router) { 

    this.signUpForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
          Validators.required
      ])),
      // username: new FormControl('', [Validators.required, Validators.minLength(8)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),

      password: new FormControl('', [Validators.required, Validators.minLength(8),
        Validators.pattern(this.passwordRegex)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8),
        Validators.pattern(this.passwordRegex)])
  });
  }

  ngOnInit() {}


  togglePassword(){
    if(this.passwordType === 'password'){
      this.passwordType = 'text';
    }else{
      this.passwordType = 'password';
    }
  }
  


  submit(){
    console.log(this.signUpForm.value);
    this.loading  = true;
    this.authService.signUp(this.signUpForm.value).subscribe(res => {
      console.log('res ', res);
      this.logicService.showSuccessToast('Success','registration successful');
      this.router.navigate(['/login']);
      this.loading = false;
    }, err => {
      this.loading = false
      console.log('err ', err.error)
      console.log('err2 ', JSON.stringify(err.error))
      let errorMessage = JSON.stringify(err.error).replace('username','phone number')
      this.logicService.showErrorToast('error',errorMessage);
    });
  }

}
