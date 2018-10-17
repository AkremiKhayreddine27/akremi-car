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
  SearchModalModule
} from "../../../../projects/distinct-ui/src/public_api";

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
    CarsRoutingModule
  ],
  declarations: [
    ...routedComponents,
    CarsTableComponent,
    CarsTableRowComponent,
    CarsGridComponent,
    CarsCardComponent,
    CarsFilterComponent
  ]
})
export class CarsModule {}
