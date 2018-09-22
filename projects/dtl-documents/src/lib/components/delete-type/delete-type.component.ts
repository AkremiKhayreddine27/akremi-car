import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as fromStore from '../../@core/store';
import { DocumentType } from '../../@core/models';

@Component({
  selector: 'app-delete-type',
  templateUrl: './delete-type.component.html',
  styleUrls: ['./delete-type.component.scss']
})
export class DeleteTypeComponent implements OnInit {

  @Input()
  type: DocumentType;

  constructor(
    private store: Store<fromStore.DocumentsState>,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {}

  delete() {
    this.store.dispatch(new fromStore.DeleteType(this.type.id));
    this.activeModal.dismiss();
  }

}
