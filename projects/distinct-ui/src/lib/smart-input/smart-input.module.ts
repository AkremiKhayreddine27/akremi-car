import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorMessageComponent } from "../form-error-message/form-error-message.component";
import {
  SmartInputComponent,
  SmartInputSuffix,
  SmartInputPrefix
} from "./smart-input.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    SmartInputComponent,
    SmartInputSuffix,
    SmartInputPrefix,
    ErrorMessageComponent
  ],
  exports: [
    SmartInputComponent,
    SmartInputSuffix,
    SmartInputPrefix,
    ErrorMessageComponent
  ]
})
export class SmartInputModule {}
