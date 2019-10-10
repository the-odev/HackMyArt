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

  timeLeft = 30;
  interval;
  subscribeTimer: any;


  @ViewChild('slider', { static: false }) slideComponent: SlideComponent;

  constructor(private keyboard: Keyboard) { }


  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });
  }


  ngAfterViewInit(): void {
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 30;
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
