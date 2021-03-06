import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DtlDocumentsComponent } from "./dtl-documents.component";
import { DistinctTableModule } from "distinct-table";
import { NgSelectModule } from "@ng-select/ng-select";

import { ThemeModule } from "./@theme/theme.module";
import { CoreModule } from "./@core/core.module";

import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

import { StoreModule, MetaReducer } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
export const metaReducers: MetaReducer<any>[] = [];

import { TableComponent } from "./components/table/table.component";
import { RowComponent } from "./components/table/row/row.component";
import { DtlTableHeaderComponent } from "./components/table/header/header.component";

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
  FileComponent,
  CreateComponent,
  DeleteComponent,
  CreateCategoryComponent,
  DeleteCategoryComponent,
  CreateTypeComponent,
  DeleteTypeComponent,
  GridComponent
} from "./components";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DistinctTableModule,
    NgSelectModule,
    ThemeModule,
    CoreModule,
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
    NgbDropdownModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 35
    })
  ],
  declarations: [
    DtlDocumentsComponent,
    FileComponent,
    CreateComponent,
    DeleteComponent,
    CreateCategoryComponent,
    DeleteCategoryComponent,
    CreateTypeComponent,
    DeleteTypeComponent,
    GridComponent,
    TableComponent,
    RowComponent,
    DtlTableHeaderComponent
  ],
  exports: [DtlDocumentsComponent],
  entryComponents: [
    FileComponent,
    CreateComponent,
    DeleteComponent,
    CreateCategoryComponent,
    DeleteCategoryComponent,
    CreateTypeComponent,
    DeleteTypeComponent
  ]
})
export class DtlDocumentsModule {}
