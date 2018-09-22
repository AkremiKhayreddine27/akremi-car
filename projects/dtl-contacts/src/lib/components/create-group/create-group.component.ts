import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Group } from '../../@core/models/group';

import { Store } from '@ngrx/store';
import * as fromStore from '../../@core/store';
import * as faker from 'faker';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {
  @Input()
  group: any;

  form: FormGroup;

  constructor(
    private store: Store<fromStore.LocatusState>,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(faker.random.number()),
      name: new FormControl(
        this.group && this.group.name ? this.group.name : ''
      )
    });
  }

  save() {
    this.store.dispatch(new fromStore.CreateGroup(this.form.value));
    this.activeModal.dismiss();
  }
}
