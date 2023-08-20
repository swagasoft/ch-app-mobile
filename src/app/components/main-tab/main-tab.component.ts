import { Router } from '@angular/router';
import { Profile } from './../../interfaces/profile';
import { AuthService } from 'src/app/services/auth.service';
import { LogicService } from 'src/app/services/logic.service';
import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/interfaces/auth';

@Component({
  selector: 'app-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.scss'],
})
export class MainTabComponent implements OnInit {

  constructor(private logicService: LogicService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // this.authService.getMyInfo().subscribe({
    //   next:(val: any )=> {
    //     console.log('val ', val)
    //     this.authService.setAuthPerson(val);
    //     this.getUserProfile();
    //   },
    //   error: (error) => {
    //     console.log('errr ', error)
    //     this.authService.logout();
    //   },
    //   complete: () => {
    //     console.log('copleted')
    //   }
    // })
  }


  getUserProfile(){
    this.authService.getMyProfile().subscribe({
      next:(profile: Profile) => {
        console.log('profile ', profile);
        this.authService.setAuthProfile(profile);
      },
      error : (error: any) => {
        console.log('Error ', error);
    // this.logicService.presentActionSheet()
    this.logicService.alertPromise("Complete you profile",
    'Update your profile with the right information, connect your love ones with ease').then((res) => {
      console.log(res)
      if(res === true){
        this.router.navigate(['/tabs/profile'])
      }
    })

      }
    });
  }

}
