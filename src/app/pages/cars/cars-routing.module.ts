import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CarsComponent } from "./cars.component";
import { CarsFormComponent } from "./form/cars-form.component";

const routes: Routes = [
  {
    path: "",
    component: CarsComponent
  },
  {
    path: "create",
    component: CarsFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule {}
export const routedComponents = [CarsComponent, CarsFormComponent];
