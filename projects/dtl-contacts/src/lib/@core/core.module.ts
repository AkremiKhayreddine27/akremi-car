import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';

import { ContactsService } from './services/contacts.service';
import { GroupsService } from './services/groups.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('dtl-contacts', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  providers: [ContactsService, GroupsService]
})
export class CoreModule {}
