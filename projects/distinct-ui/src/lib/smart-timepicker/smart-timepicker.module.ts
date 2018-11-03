import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AmazingTimePickerModule } from "amazing-time-picker";
import { SmartSelectModule } from "../smart-select/smart-select.module";
import {
  SmartTimepickerComponent,
  SmartTimepickerSuffix,
  SmartTimepickerPrefix
} from "./smart-timepicker.component";

@NgModule({
  imports: [CommonModule, AmazingTimePickerModule, SmartSelectModule],
  declarations: [
    SmartTimepickerComponent,
    SmartTimepickerSuffix,
    SmartTimepickerPrefix
  ],
  exports: [
    SmartTimepickerComponent,
    SmartTimepickerSuffix,
    SmartTimepickerPrefix
  ]
})
export class SmartTimepickerModule {}
