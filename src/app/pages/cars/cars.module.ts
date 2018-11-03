import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ThemeModule } from "../../@theme/theme.module";
import { CarsRoutingModule, routedComponents } from "./cars-routing.module";

import { CarsTableComponent } from "./table/cars-table.component";
import { CarsTableRowComponent } from "./table/table-row/table-row.component";

import { CarsGridComponent } from "./grid/car-grid.component";
import { CarsCardComponent } from "./grid/car/car-card.component";

import { CarsFilterComponent } from "./filter/filter.component";

import {
  SmartSelectModule,
  DistinctUiModule,
  TopOptionBarModule,
  SmartPageHeaderModule,
  SearchModalModule,
  SmartInputModule,
  SmartDatepickerModule,
  SmartTimepickerModule
} from "../../../../projects/distinct-ui/src/public_api";
import { CarContactsFormComponent } from "./form/contacts/car-contacts-form.component";
import { CarServiceFormComponent } from "./form/service/car-service-form.component";
import { CarCostFormComponent } from "./form/cost/car-cost-form.component";
import { CarDocumentsFormComponent } from "./form/documents/car-documents-form.component";
import { CarDocumentFormComponent } from "./form/documents/document/car-document-form.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    DistinctUiModule,
    SmartPageHeaderModule,
    TopOptionBarModule,
    SmartSelectModule,
    SearchModalModule,
    SmartInputModule,
    SmartDatepickerModule,
    SmartTimepickerModule,
    CarsRoutingModule
  ],
  declarations: [
    ...routedComponents,
    CarsTableComponent,
    CarsTableRowComponent,
    CarsGridComponent,
    CarsCardComponent,
    CarsFilterComponent,
    CarContactsFormComponent,
    CarServiceFormComponent,
    CarCostFormComponent,
    CarDocumentsFormComponent,
    CarDocumentFormComponent
  ]
})
export class CarsModule {}
