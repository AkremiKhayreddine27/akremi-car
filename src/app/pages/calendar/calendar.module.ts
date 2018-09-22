import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarComponent } from "./calendar.component";
import { DtlCalendarModule } from "../../../../projects/dtl-calendar/src/public_api";

@NgModule({
  imports: [CommonModule, DtlCalendarModule],
  declarations: [CalendarComponent]
})
export class CalendarModule {}
