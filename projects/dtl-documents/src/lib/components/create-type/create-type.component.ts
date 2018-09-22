import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { DocumentType } from '../../@core/models';

import { Store } from '@ngrx/store';
import * as fromStore from '../../@core/store';
import * as faker from 'faker';

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html',
  styleUrls: ['./create-type.component.scss']
})
export class CreateTypeComponent implements OnInit {
  @Input()
  type: DocumentType;

  form: FormGroup;

  constructor(
    private store: Store<fromStore.DocumentsState>,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(faker.random.number()),
      name: new FormControl(this.type && this.type.name ? this.type.name : '')
    });
  }

  save() {
    this.store.dispatch(new fromStore.CreateType(this.form.value));
    this.activeModal.dismiss();
  }
}
