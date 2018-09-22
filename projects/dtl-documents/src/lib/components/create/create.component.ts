import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromStore from '../../@core/store';
import { Document } from '../../@core/models';
import * as faker from 'faker';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @Input() document: Document;

  @Input() edit: Boolean = false;

  form: FormGroup;

  categories$;
  types$;

  constructor(
    private store: Store<fromStore.DocumentsState>,
    public activeModal: NgbActiveModal
  ) {}
  ngOnInit() {
    this.categories$ = this.store.select(fromStore.getAllCategories);
    this.types$ = this.store.select(fromStore.getAllTypes);
    this.form = new FormGroup({
      id: new FormControl(this.document ? this.document.id : faker.random.number()),
      title: new FormControl(this.document ? this.document.title : ''),
      description: new FormControl(this.document ? this.document.description : ''),
      category: new FormControl(this.document ? this.document.category : ''),
      type: new FormControl(this.document ? this.document.type : ''),
      link: new FormControl(this.document ? this.document.link : ''),
      createdAt: new FormControl(new Date()),
      file: new FormGroup({
        name: new FormControl(''),
        size: new FormControl(''),
        type: new FormControl('')
      })
    });
  }

  save() {
    this.store.dispatch(new fromStore.CreateDocument(this.form.value));
    this.activeModal.dismiss();
  }
}
