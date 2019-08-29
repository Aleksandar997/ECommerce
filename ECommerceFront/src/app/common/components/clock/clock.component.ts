import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'clock',
  templateUrl: './clock.component.html'
})
export class ClockComponent implements AfterViewInit {

  @ViewChild('time', { static: false }) time: ElementRef;
  @ViewChild('date', { static: false }) date: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    const clockHandler = setInterval(() => {
      this.time.nativeElement.innerHTML = this.getTime();
      this.date.nativeElement.innerHTML = this.getDate();
    }, 1);
  }

  getTime() {
    const date = new Date();
    return [date.getHours(), date.getMinutes(), date.getSeconds()].map(current => current >= 10 ? current : '0' + current).join(':');
  }

  getDate() {
    const date = new Date();
    return [date.getDate(), date.getMonth() + 1, date.getFullYear()]
      .map(current => current >= 10 ? current : '0' + current).join('.');
  }


}
