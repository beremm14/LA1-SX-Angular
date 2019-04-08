import { Component, Input, OnInit, OnDestroy } from '@angular/core';

export interface ClockComponentConfig {
  startStopVisible: boolean;
  isClockRunning?: boolean;
}

@Component({
  selector: 'app-clock',
  template: `
  <span>
    {{outText}}
    <button *ngIf = "config.startStopVisible" (click)=onClick()> {{buttonText}}</button>
  </span>`
})
export class ClockComponent implements OnInit, OnDestroy {

  @Input() config: ClockComponentConfig;

  public outText = '??:??:??';
  public buttonText = 'Stop';
  private enabled: boolean;
  private intervalTimer: any;

  public ngOnInit() {
    this.enabled = true;
    this.intervalTimer = setInterval( () => {
      const now = new Date();
      if (this.config.isClockRunning === true || this.config.isClockRunning === false) {
        this.enabled = this.config.isClockRunning;
      }
      if (this.enabled) {
        this.outText = now.toLocaleTimeString();
      }
    }, 100);
  }

  public ngOnDestroy() {
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer);
      this.intervalTimer = null;
    }
  }

  public onClick() {
    this.enabled = !this.enabled;
    this.buttonText = this.enabled ? 'Stop' : 'Start';
    console.log(this.config);
  }

}
