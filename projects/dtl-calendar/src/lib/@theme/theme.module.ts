import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocatusCalendarModule } from 'locatus-calendar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NbActionsModule, NbUserModule, NbMenuModule } from '@nebular/theme';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    LocatusCalendarModule,
    NgbModule,
    NgSelectModule,
    NbActionsModule,
    NbUserModule,
    NbMenuModule
  ],
  declarations: [HeaderComponent, SidebarComponent],
  exports: [HeaderComponent, SidebarComponent]
})
export class ThemeModule {}
