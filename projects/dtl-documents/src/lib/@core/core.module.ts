import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';

import { DocumentsService } from './services/documents.service';
import { CategoriesService } from './services/categories.service';
import { TypesService } from './services/types.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('dtl-documents', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  providers: [DocumentsService, CategoriesService, TypesService]
})
export class CoreModule {}
