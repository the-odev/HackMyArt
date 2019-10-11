import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { timer } from 'rxjs';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { SlideComponent } from '../slides/slide.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [Keyboard]
})
export class HomePage implements AfterViewInit {
  interval;
  subscribeTimer: any;


  @ViewChild(SlideComponent, { static: false }) slideComponent: SlideComponent;

  constructor(private keyboard: Keyboard) { }


  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.slideComponent.maintimeLeft - val;
    });
  }


  ngAfterViewInit(): void {
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.slideComponent.maintimeLeft > 0) {
        this.slideComponent.maintimeLeft--;
      } else {
        // if (!this.slideComponent.isUnlock) {
        //   alert('Time is up!');
        //   this.slideComponent.slides.length().then(res => {
        //     if ((this.slideComponent.selectedPiecOfArtId + 1) >= res) {
        //       this.slideComponent.slides.slideTo(0);
        //     } else {
        //       this.slideComponent.slides.slideTo(this.slideComponent.selectedPiecOfArtId + 1);
        //     }

        //   });
        // }
        // this.slideComponent.maintimeLeft = 30;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  public showKeyboard(): void {
    this.slideComponent.setInputTextFocus();
  }


}
