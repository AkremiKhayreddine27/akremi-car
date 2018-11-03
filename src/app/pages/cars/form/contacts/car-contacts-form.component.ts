import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import * as fromStore from "../../../../../../projects/dtl-contacts/src/lib/@core/store";
import { Store } from "@ngrx/store";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { of } from "rxjs";
import { ShowComponent } from "../../../../../../projects/dtl-contacts/src/lib/components";
import { User } from "../../../../../../projects/dtl-contacts/src/lib/@core/models";

@Component({
  selector: "ngx-car-contacts-form",
  templateUrl: "./car-contacts-form.component.html",
  styleUrls: ["./car-contacts-form.component.scss"]
})
export class CarContactsFormComponent implements OnInit {
  form: FormGroup;
  groups$;
  users$;

  clientHovred: boolean = false;
  assignedToHovred: boolean = false;
  providerHovred: boolean = false;

  constructor(
    private store: Store<fromStore.ContactsAppState>,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadContacts());
    this.store.dispatch(new fromStore.LoadGroups());
    this.users$ = this.store.select(fromStore.getAllContacts);
    this.groups$ = of([
      {
        name: "Groups",
        items$: this.store.select(fromStore.getAllGroups)
      }
    ]);
    this.form = new FormGroup({
      client: new FormControl(null),
      assignedTo: new FormControl(null),
      provider: new FormControl(null)
    });
  }

  get client(): FormControl {
    return this.form.get("client") as FormControl;
  }

  get provider(): FormControl {
    return this.form.get("provider") as FormControl;
  }

  get assignedTo(): FormControl {
    return this.form.get("assignedTo") as FormControl;
  }

  setClient(contact) {
    this.form.patchValue({ client: contact });
  }

  setAssignedTo(contact) {
    this.form.patchValue({ assignedTo: contact });
  }

  setProvider(contact) {
    this.form.patchValue({ provider: contact });
  }

  addContact() {
    const modalRef = this.modalService.open(ShowComponent, {
      windowClass: "all-height"
    });
    modalRef.componentInstance.edit = true;
  }

  showContact(contact: User) {
    const modalRef = this.modalService.open(ShowComponent, {
      windowClass: "all-height"
    });
    modalRef.componentInstance.edit = false;
    modalRef.componentInstance.contact = contact;
  }
}
