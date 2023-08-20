import { Auth } from './../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode, * as jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { Profile } from '../interfaces/profile';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  public  authPerson$ = new BehaviorSubject<Auth | null>(null);
  public  authProfile$ = new BehaviorSubject<Profile | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  setAuthPerson(person: Auth) {
    this.authPerson$.next(person);
}

getAuthPerson() {
  return this.authPerson$;
}

setAuthProfile(profile: Profile) {
    this.authProfile$.next(profile);
}

getAuthProfile() {
  return this.authProfile$;
}

  signUp( data: Auth) {
    return this.http.post(environment.apiBaseUrl + '/auth/' , data);
  }

  loginUp( data: any) {
    return this.http.post(environment.apiBaseUrl + '/auth/login' , data);
  }

  getMyInfo() {
    return this.http.get(environment.apiBaseUrl + '/auth/users/me/');
  }

  getMyProfile(): Observable <Profile> {
    return this.http.get<Profile>(environment.apiBaseUrl + '/person/profile/me/');
  }

  updateAuthPerson(data: Auth): Observable <Auth> {
    return this.http.put<Auth>(environment.apiBaseUrl + '/auth/users/me/', data);
  }


  updatePersonProfile(data: Profile): Observable <Profile> {
    return this.http.post<Profile>(environment.apiBaseUrl + '/person/profile/', data);
  }



  setAuthToken(token: string) {
    localStorage.setItem('token', token);
   }

  setRefreshToken(token: string) {
    localStorage.setItem('refresh_token', token);
   }

   deleteToken() {
     window.localStorage.removeItem('token');
   }

   public getToken(): string {
   this.token = localStorage.getItem('token');
   return this.token;
   }


   getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }


  isLogedIn() {
    // const userPayload = this.getUserPayload();
    // if (userPayload) {
    // return userPayload.exp > Date.now() / 1000;
    // } else {
    // return false;
    // }
    // commented out just for testing
    return true;
  }

  public logout(): void {
    this.deleteToken();
    this.router.navigateByUrl('/login');
   }
}
