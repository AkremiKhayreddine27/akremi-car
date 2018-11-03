import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DtlContactsComponent } from "./dtl-contacts.component";
import { DistinctTableModule } from "distinct-table";

import { NgSelectModule } from "@ng-select/ng-select";

import { ThemeModule } from "./@theme/theme.module";
import { CoreModule } from "./@core/core.module";

import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

import { StoreModule, MetaReducer } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
export const metaReducers: MetaReducer<any>[] = [];

import { LayoutModule } from "@angular/cdk/layout";

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

import {
  CreateGroupComponent,
  DeleteComponent,
  DeleteGroupComponent,
  ShowComponent,
  TableComponent,
  RowComponent,
  DtlTableHeaderComponent
} from "./components";
import {
  SmartInputModule,
  TopOptionBarModule
} from "../../../distinct-ui/src/public_api";
import { SmartSelectModule } from "../../../distinct-ui/src/lib/smart-select/smart-select.module";
import { SmartPageHeaderModule } from "../../../distinct-ui/src/lib/smart-page-header/smart-page-header.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    NgSelectModule,
    DistinctTableModule,
    ThemeModule,
    CoreModule,
    NgbDropdownModule,
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
    NbProgressBarModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 35
    }),
    SmartInputModule,
    SmartSelectModule,
    SmartPageHeaderModule,
    TopOptionBarModule
  ],
  declarations: [
    DtlContactsComponent,
    CreateGroupComponent,
    DeleteComponent,
    DeleteGroupComponent,
    ShowComponent,
    TableComponent,
    RowComponent,
    DtlTableHeaderComponent
  ],
  exports: [DtlContactsComponent],
  entryComponents: [
    CreateGroupComponent,
    DeleteComponent,
    DeleteGroupComponent,
    ShowComponent
  ]
})
export class DtlContactsModule {}
