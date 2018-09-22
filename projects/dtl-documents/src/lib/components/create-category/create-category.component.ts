import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Category } from '../../@core/models';

import { Store } from '@ngrx/store';
import * as fromStore from '../../@core/store';
import * as faker from 'faker';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  @Input()
  category: Category;

  form: FormGroup;

  constructor(
    private store: Store<fromStore.DocumentsState>,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(faker.random.number()),
      name: new FormControl(
        this.category && this.category.name ? this.category.name : ''
      )
    });
  }

  save() {
    this.store.dispatch(new fromStore.CreateCategory(this.form.value));
    this.activeModal.dismiss();
  }

}
