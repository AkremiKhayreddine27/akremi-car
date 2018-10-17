import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SmartInputComponent,
  SmartInputSuffix,
  SmartInputPrefix
} from "./smart-input.component";

@NgModule({
  imports: [CommonModule],
  declarations: [SmartInputComponent, SmartInputSuffix, SmartInputPrefix],
  exports: [SmartInputComponent, SmartInputSuffix, SmartInputPrefix]
})
export class SmartInputModule {}
