import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocatusCalendarModule } from 'locatus-calendar';

import { ThemeModule } from './@theme/theme.module';

import { DtlCalendarComponent } from './dtl-calendar.component';

import {
  NbActionsModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbRouteTabsetModule,
  NbSearchModule,
  NbSidebarModule,
  NbTabsetModule,
  NbThemeModule,
  NbUserModule,
  NbCheckboxModule,
  NbPopoverModule,
  NbContextMenuModule,
  NbProgressBarModule
} from "@nebular/theme";

@NgModule({
  imports: [
    CommonModule,

    LocatusCalendarModule,
    ThemeModule,

    NbActionsModule,
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbRouteTabsetModule,
    NbSearchModule,
    NbSidebarModule,
    NbTabsetModule,
    NbThemeModule,
    NbUserModule,
    NbCheckboxModule,
    NbPopoverModule,
    NbContextMenuModule,
    NbProgressBarModule
  ],
  declarations: [DtlCalendarComponent],
  exports: [DtlCalendarComponent]
})
export class DtlCalendarModule { }
