import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { DtlContactsModule } from '../../../../projects/dtl-contacts/src/public_api';
import { ContactsRoutingModule, routedComponents } from './contacts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ContactsRoutingModule,
    DtlContactsModule
  ],
  declarations: [...routedComponents]
})
export class ContactsModule { }
