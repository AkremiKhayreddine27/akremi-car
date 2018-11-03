import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SmartInputModule } from "../smart-input/smart-input.module";
import {
  SmartDatepickerComponent,
  SmartDatepickerPrefix,
  SmartDatepickerSuffix
} from "./smart-datepicker.component";

@NgModule({
  imports: [CommonModule, SmartInputModule],
  declarations: [
    SmartDatepickerComponent,
    SmartDatepickerPrefix,
    SmartDatepickerSuffix
  ],
  exports: [
    SmartDatepickerComponent,
    SmartDatepickerPrefix,
    SmartDatepickerSuffix
  ]
})
export class SmartDatepickerModule {}
