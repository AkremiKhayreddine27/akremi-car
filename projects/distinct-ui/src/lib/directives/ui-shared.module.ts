import { NgModule } from "@angular/core";

import { ClickOutsideDirective } from "./click-outside.directive";
import { StickyHeaderDirective } from "./sticky-header.directive";
import { SmartPageHeaderService } from "./smart-page-header.service";

@NgModule({
  imports: [],
  declarations: [ClickOutsideDirective, StickyHeaderDirective],
  exports: [ClickOutsideDirective, StickyHeaderDirective],
  providers: [SmartPageHeaderService]
})
export class UiSharedModule {}
