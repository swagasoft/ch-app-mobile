import { Component } from '@angular/core';
import { Auth } from './interfaces/auth';
import { AuthService } from './services/auth.service';
import { LogicService } from './services/logic.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  person: Auth | null;
  public appPages = [
    // { title: 'Notifications', url: '/notifications', icon: 'paper-plane' },
    { title: 'Profile', url: '/tabs/profile', icon: 'person' },
    { title: 'Example', url: '/transactions', icon: 'swap-vertical' },
    { title: 'Example', url: '/deposit', icon: 'wallet' },
    { title: 'Example', url: '/withdraw', icon: 'repeat' },
    { title: 'Example', url: '/stake-list', icon: 'podium' },
    { title: 'Example', url: '/my-stake', icon: 'trending-up' },
    { title: 'Example', url: '/how-it-works', icon: 'information' },
    { title: 'Invite a Friend', url: '/invite', icon: 'person-add' },
    { title: 'Help Center', url: '/help-center', icon: 'help' }

  ];
  constructor(public authService: AuthService , private logicService: LogicService) {
    this.authService.authPerson$.subscribe((person: Auth| null) => {
      this.person = person;
    });
  }

  logOut(){
    this.authService.logout();
  }


}
