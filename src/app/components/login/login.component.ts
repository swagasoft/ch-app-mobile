import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LogicService } from 'src/app/services/logic.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  emailForm: FormGroup;
  loading: boolean;
  passwordType='password';
  segment = 'email';
  passwordRegex='^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$';

  validationMessages = {
    email: [
        {type: 'required', message: 'Email is required.'},
        {type: 'pattern', message: 'Enter a valid email.'}
    ],
 
    password: [
        {type: 'required', message: 'Password is required.'},
        {type: 'minlength', message: 'Password must be at least 8 characters long.'},
    ],

};

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private logicService: LogicService,
    private router: Router) { 


    this.emailForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
          Validators.required
      ])),
      password: new FormControl('', [Validators.required
      ]),

  });
  }

  ngOnInit() {}


  onSegMentChange(event:any){
    console.log(event)
    this.segment = event.target.value;
  }


  togglePassword(){
    if(this.passwordType === 'password'){
      this.passwordType = 'text';
    }else{
      this.passwordType = 'password';
    }
  }



  loginMobile(){
    console.log(this.emailForm.value);
    this.loading  = true;
    console.log('Login ', this.emailForm.value);
    this.authService.loginUp(this.emailForm.value).subscribe({
      next: (value: any)=>{
        this.loading  = false;
        console.log(value)
        this.authService.setAuthToken(value?.access);
        this.router.navigate(['/tabs/feeds']);
      },
      error: (err) => {
        this.loading  = false;
        this.logicService.showErrorToast('Error', this.logicService.cleanUpMessage(err.error))
      },
      complete:()=> console.log('completed')
    });
  }


  // loginEmail(){
  //   console.log(this.emailForm.value);
  //   this.loading  = true;
  //   this.authService.loginUp(this.emailForm.value).subscribe({
  //     next: (value)=>{
  //       this.loading  = false;
  //       console.log(value)
  //     },
  //     error: (err) => {
  //       this.loading  = false;
  //       this.logicService.showErrorToast('Error', this.logicService.cleanUpMessage(err.error))
  //     },
  //     complete:()=> console.log('completed')
  //   });
  // }

  loginEmail(){
    console.log(this.emailForm.value);
    this.loading  = true;
    this.authService.loginUp(this.emailForm.value).subscribe({
      next: (value: any)=>{
        this.loading  = false;
        console.log(value)
        this.authService.setAuthToken(value?.access_token);
        this.authService.setRefreshToken(value?.access_token);
        this.router.navigate(['/tabs/feeds']);
      },
      error: (err) => {
        this.loading  = false;
        this.logicService.showErrorToast('Error', this.logicService.cleanUpMessage(err.error))
      },
      complete:()=> console.log('completed')
    });
  }




}
