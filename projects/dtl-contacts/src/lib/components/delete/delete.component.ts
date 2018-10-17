import { Component, OnInit, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Store } from "@ngrx/store";
import * as fromStore from "../../@core/store";
import { User } from "../../@core/models";
@Component({
  selector: "app-delete",
  templateUrl: "./delete.component.html",
  styleUrls: ["./delete.component.scss"]
})
export class DeleteComponent implements OnInit {
  @Input()
  ids: number[];

  constructor(
    private store: Store<fromStore.ContactsAppState>,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {}

  delete() {
    this.store.dispatch(new fromStore.DeleteContacts(this.ids));
    this.activeModal.dismiss();
  }
}
