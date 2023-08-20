import { MainProfileModalComponent } from './components/main-profile-modal/main-profile-modal.component';
import { OtherProfileModalComponent } from './components/other-profile-modal/other-profile-modal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { MessagesTabComponent } from './components/messages-tab/messages-tab.component';
import { FamilyTabComponent } from './components/family-tab/family-tab.component';
import { SearchTabComponent } from './components/search-tab/search-tab.component';
import { FeedTabComponent } from './components/feed-tab/feed-tab.component';
import { MainTabComponent } from './components/main-tab/main-tab.component';

import { AuthService } from './services/auth.service';
import { LogicService } from './services/logic.service';
import { SignnupComponent } from './components/signnup/signnup.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {InputTextModule} from 'primeng/inputtext';
import { ToastrModule } from 'ngx-toastr';
import { NotificationTabComponent } from './components/notification-tab/notification-tab.component';
import { AuthInterceptor } from './auth.interceptor';



@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, SignnupComponent,
    MainTabComponent,FeedTabComponent,SearchTabComponent, NotificationTabComponent,
    FamilyTabComponent,MessagesTabComponent, ProfileComponent,OtherProfileModalComponent,
    MainProfileModalComponent

    ],
  imports: [BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule,
    BrowserAnimationsModule,CommonModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,FormsModule,HttpClientModule,
    InputTextModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ,LogicService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
