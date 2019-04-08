import { Component } from '@angular/core';
import { ClockComponentConfig } from './clock/clock.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = '5AHME LA1 Group 1';
  public configClock1: ClockComponentConfig = {
    startStopVisible: true
  };
  public configClock2: ClockComponentConfig = {
    startStopVisible: false,
    isClockRunning: true
  };

  public onClick() {
    console.log('click');
    this.configClock2.isClockRunning = !this.configClock2.isClockRunning;
  }
}
