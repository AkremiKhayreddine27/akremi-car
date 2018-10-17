import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as fromStore from '../../@core/store';
import { Group } from '../../@core/models';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss']
})
export class DeleteGroupComponent implements OnInit {
  @Input()
  group: any;

  constructor(
    private store: Store<fromStore.ContactsAppState>,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {}

  delete() {
    this.store.dispatch(new fromStore.DeleteGroup(this.group.id));
    this.activeModal.dismiss();
  }
}
