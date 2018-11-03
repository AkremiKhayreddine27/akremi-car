import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchModalComponent } from "./search-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [SearchModalComponent],
  exports: [SearchModalComponent],
  entryComponents: [SearchModalComponent]
})
export class SearchModalModule {}
