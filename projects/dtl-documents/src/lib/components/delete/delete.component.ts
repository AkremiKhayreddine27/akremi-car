import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as fromStore from '../../@core/store';
import { Document } from '../../@core/models';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  @Input()
  documents: Document[];

  constructor(
    private store: Store<fromStore.DocumentsState>,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
  }

  delete() {
    for (const document of this.documents) {
      this.store.dispatch(new fromStore.DeleteDocument(document.id));
    }
    this.activeModal.dismiss();
  }

}
