import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  TopOptionBarComponent,
  TopOptionBarLeftComponent,
  TopOptionBarRightComponent
} from "./top-option-bar.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    TopOptionBarComponent,
    TopOptionBarLeftComponent,
    TopOptionBarRightComponent
  ],
  exports: [
    TopOptionBarComponent,
    TopOptionBarLeftComponent,
    TopOptionBarRightComponent
  ]
})
export class TopOptionBarModule {}
