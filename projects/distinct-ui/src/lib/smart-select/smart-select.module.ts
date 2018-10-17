import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OverlayModule } from "@angular/cdk/overlay";
import { A11yModule } from "@angular/cdk/a11y";

import { UiSharedModule } from "../directives/ui-shared.module";

import { SmartSelectComponent } from "./smart-select.component";
import { SmartSelectOptionComponent } from "./smart-select-option/smart-select-option.component";

@NgModule({
  imports: [CommonModule, OverlayModule, A11yModule, UiSharedModule],
  declarations: [SmartSelectComponent, SmartSelectOptionComponent],
  exports: [SmartSelectComponent, SmartSelectOptionComponent],
  providers: []
})
export class SmartSelectModule {}
