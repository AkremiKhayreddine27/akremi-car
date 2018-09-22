import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as fromStore from "../../@core/store";
import * as faker from "faker";
import { User, Group } from "../../@core/models";
import { Observable } from "rxjs";
import { FilterConf } from "../../@core/store/helpers";
import { delay } from "rxjs/operators";
@Component({
  selector: "app-show",
  templateUrl: "./show.component.html",
  styleUrls: ["./show.component.scss"]
})
export class ShowComponent implements OnInit, AfterViewInit {
  @Input()
  contact: User;

  @Input()
  edit: Boolean = false;

  form: FormGroup;

  groups$: Observable<Group[]>;
  contactGroups$: Observable<Group[]>;

  showMore: Boolean = false;

  constructor(
    private store: Store<fromStore.LocatusState>,
    public activeModal: NgbActiveModal
  ) {}

  ngAfterViewInit() {}

  ngOnInit() {
    this.groups$ = this.store
      .select<Group[]>(fromStore.getAllGroups)
      .pipe(delay(50));
    this.contactGroups$ = this.store
      .select<Group[]>(fromStore.getPaginatedSortedFiltredGroups)
      .pipe(delay(50));
    this.form = new FormGroup({
      id: new FormControl(faker.random.number()),
      firstname: new FormControl(
        this.contact && this.contact.name.givenName
          ? this.contact.name.givenName
          : ""
      ),
      lastname: new FormControl(
        this.contact && this.contact.name.familyName
          ? this.contact.name.familyName
          : ""
      ),
      company: new FormControl(""),
      job: new FormControl(""),
      note: new FormControl(""),
      email: new FormControl(
        this.contact && this.contact.emails[0].value
          ? this.contact.emails[0].value
          : ""
      ),
      phone: new FormControl(
        this.contact && this.contact.phoneNumbers[0].value
          ? this.contact.phoneNumbers[0].value
          : ""
      ),
      location: new FormGroup({
        address: new FormControl(
          this.contact && this.contact.addresses[0].country
            ? this.contact.addresses[0].country
            : ""
        ),
        postcode: new FormControl(
          this.contact && this.contact.addresses[0].country
            ? this.contact.addresses[0].country
            : ""
        ),
        city: new FormControl(
          this.contact && this.contact.addresses[0].country
            ? this.contact.addresses[0].country
            : ""
        ),
        state: new FormControl(
          this.contact && this.contact.addresses[0].country
            ? this.contact.addresses[0].country
            : ""
        ),
        country: new FormControl(
          this.contact && this.contact.addresses[0].country
            ? this.contact.addresses[0].country
            : ""
        )
      }),
      createdAt: new FormControl(new Date())
    });
  }

  get location(): FormGroup {
    return this.form.get("location") as FormGroup;
  }

  save() {
    this.store.dispatch(new fromStore.CreateContact(this.form.value));
    this.activeModal.dismiss();
  }
}
