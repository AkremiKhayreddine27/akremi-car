import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as fromStore from '../../@core/store';
import { User } from '../../@core/models';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Input()
  contacts: User[];

  constructor(
    private store: Store<fromStore.LocatusState>,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {}

  delete() {
    for (const contact of this.contacts) {
      this.store.dispatch(new fromStore.DeleteContact(contact.id));
    }
    this.activeModal.dismiss();
  }
}
