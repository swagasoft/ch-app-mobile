import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { MessagesTabComponent } from './components/messages-tab/messages-tab.component';
import { FamilyTabComponent } from './components/family-tab/family-tab.component';
import { NotificationTabComponent } from './components/notification-tab/notification-tab.component';
import { SearchTabComponent } from './components/search-tab/search-tab.component';
import { MainTabComponent } from './components/main-tab/main-tab.component';
import { SignnupComponent } from './components/signnup/signnup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FeedTabComponent } from './components/feed-tab/feed-tab.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignnupComponent
  },
  {
    path: 'tabs',
    component: MainTabComponent,canActivate: [AuthGuard],
    children:[
      {path:'feeds', component:FeedTabComponent},
      {path:'search', component:SearchTabComponent},
      {path:'notifications', component: NotificationTabComponent},
      {path:'family', component: FamilyTabComponent},
      {path:'messages', component: MessagesTabComponent},
      {path:'profile', component: ProfileComponent},
    ]
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
