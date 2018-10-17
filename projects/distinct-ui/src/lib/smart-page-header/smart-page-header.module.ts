import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SmartPageHeaderComponent } from "./smart-page-header.component";
import { SmartPageHeaderTitleComponent } from "./smart-page-header-title/smart-page-header-title.component";
import { SmartPageHeaderOptionsComponent } from "./smart-page-header-options/smart-page-header-options.component";

import { UiSharedModule } from "../directives/ui-shared.module";
@NgModule({
  imports: [CommonModule, UiSharedModule],
  declarations: [
    SmartPageHeaderComponent,
    SmartPageHeaderTitleComponent,
    SmartPageHeaderOptionsComponent
  ],
  exports: [
    SmartPageHeaderComponent,
    SmartPageHeaderTitleComponent,
    SmartPageHeaderOptionsComponent
  ]
})
export class SmartPageHeaderModule {}
