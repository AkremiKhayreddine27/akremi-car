import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { DocumentsComponent } from './documents.component';
import { DtlDocumentsModule } from '../../../../projects/dtl-documents/src/public_api';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    DtlDocumentsModule
  ],
  declarations: [DocumentsComponent]
})
export class DocumentsModule { }
