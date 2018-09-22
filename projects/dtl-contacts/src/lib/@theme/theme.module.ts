import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NbActionsModule, NbUserModule, NbMenuModule } from "@nebular/theme";

import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

import { ClickOutside } from "./directives/click-outside.directive";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgSelectModule,
    NbActionsModule,
    NbUserModule,
    NbMenuModule
  ],
  declarations: [HeaderComponent, SidebarComponent, ClickOutside],
  exports: [HeaderComponent, SidebarComponent, ClickOutside]
})
export class ThemeModule {}
