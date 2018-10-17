import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SearchModalComponent,
  ItemTemplateDirective
} from "./search-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [SearchModalComponent, ItemTemplateDirective],
  exports: [SearchModalComponent, ItemTemplateDirective],
  entryComponents: [SearchModalComponent]
})
export class SearchModalModule {}
