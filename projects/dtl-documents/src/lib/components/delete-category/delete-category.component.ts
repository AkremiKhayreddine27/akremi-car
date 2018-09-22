import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as fromStore from '../../@core/store';
import { Category } from '../../@core/models';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.scss']
})
export class DeleteCategoryComponent implements OnInit {

  @Input()
  category: Category;

  constructor(
    private store: Store<fromStore.DocumentsState>,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {}

  delete() {
    this.store.dispatch(new fromStore.DeleteCategory(this.category.id));
    this.activeModal.dismiss();
  }

}
