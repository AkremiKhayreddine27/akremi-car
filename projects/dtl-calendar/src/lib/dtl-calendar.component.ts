import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dtl-calendar',
  templateUrl: "./dtl-calendar.component.html",
  styleUrls: ["./dtl-calendar.component.scss"]
})
export class DtlCalendarComponent implements OnInit {

  view = 'Month';

  currentDate = new Date();

  constructor() { }

  ngOnInit() {
  }

}
