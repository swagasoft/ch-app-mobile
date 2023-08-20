import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('mySlider', {static : false}) mySlider: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  splashColor ='primary';

  constructor(private router: Router) {
   } 


  ngOnInit() {}


  skipSection(){
    this.router.navigate(['/login'])
 
  }

  public slidesLoaded($event: any) {
    // console.log($event.target)
    this.splashColor = 'medium';
    }

    login(){
      this.router.navigate(['/login'])
    }

    signup(){
      this.router.navigate(['/signup'])
    }

}
