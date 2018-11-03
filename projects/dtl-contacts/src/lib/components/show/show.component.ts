import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup, FormControl, FormArray } from "@angular/forms";
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

  @ViewChild("header")
  header: ElementRef;

  headerHeight;

  form: FormGroup;

  groups$: Observable<Group[]>;
  contactGroups$: Observable<Group[]>;

  showMore: Boolean = false;

  constructor(
    private store: Store<fromStore.ContactsAppState>,
    public activeModal: NgbActiveModal,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (this.contact && this.contact.groups) {
      const filters = [];
      for (const group of this.contact.groups) {
        filters.push({
          field: "value",
          search: group.value.toString(),
          filter: (cell: any, search: any) => {
            return cell.toString() === search;
          }
        });
      }
      const filterConf: FilterConf = {
        filters,
        andOperator: false
      };
      this.store.dispatch(new fromStore.LoadGroups(filterConf));
    }
    this.headerHeight = this.header.nativeElement.offsetHeight;
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.groups$ = this.store
      .select<Group[]>(fromStore.getAllGroups)
      .pipe(delay(50));
    this.contactGroups$ = this.store
      .select<Group[]>(fromStore.getPaginatedSortedFiltredGroups)
      .pipe(delay(50));
    this.form = new FormGroup({
      id: new FormControl(
        this.contact && this.contact.id
          ? this.contact.id
          : faker.random.number()
      ),
      externalId: new FormControl(
        this.contact && this.contact.externalId
          ? this.contact.externalId
          : faker.random.number()
      ),
      description: new FormControl(null),
      userName: new FormControl(
        this.contact && this.contact.userName ? this.contact.userName : null
      ),
      title: new FormControl(
        this.contact && this.contact.title ? this.contact.title : null
      ),
      userType: new FormControl(
        this.contact && this.contact.userType ? this.contact.userType : null
      ),
      name: new FormGroup({
        formatted: new FormControl(),
        familyName: new FormControl(
          this.contact && this.contact.name.familyName
            ? this.contact.name.familyName
            : ""
        ),
        givenName: new FormControl(
          this.contact && this.contact.name.givenName
            ? this.contact.name.givenName
            : ""
        ),
        middleName: new FormControl(),
        honorificPrefix: new FormControl(),
        honorificSuffix: new FormControl()
      }),
      company: new FormControl(
        this.contact && this.contact.company ? this.contact.company : null
      ),
      job: new FormControl(
        this.contact && this.contact.job ? this.contact.job : null
      ),
      phoneNumbers: new FormArray(
        this.contact && this.contact.phoneNumbers
          ? this.contact.phoneNumbers.map(phoneNumber => {
              return new FormGroup({
                value: new FormControl(phoneNumber.value),
                type: new FormControl(phoneNumber.type),
                primary: new FormControl(phoneNumber.primary)
              });
            })
          : [
              new FormGroup({
                value: new FormControl(null),
                type: new FormControl(null),
                primary: new FormControl(null)
              })
            ]
      ),
      emails: new FormArray(
        this.contact && this.contact.emails
          ? this.contact.emails.map(email => {
              return new FormGroup({
                value: new FormControl(email.value),
                type: new FormControl(email.type),
                primary: new FormControl(email.primary)
              });
            })
          : [
              new FormGroup({
                value: new FormControl(null),
                type: new FormControl(null),
                primary: new FormControl(null)
              })
            ]
      ),
      addresses: new FormArray(
        this.contact && this.contact.addresses
          ? this.contact.addresses.map(address => {
              return new FormGroup({
                address: new FormControl(address.address),
                country: new FormControl(address.country),
                city: new FormControl(address.city),
                state: new FormControl(address.state),
                locality: new FormControl(address.locality),
                postalCode: new FormControl(address.postalCode),
                region: new FormControl(address.region),
                type: new FormControl(address.type),
                primary: new FormControl(address.primary)
              });
            })
          : [
              new FormGroup({
                address: new FormControl(null),
                country: new FormControl(null),
                city: new FormControl(null),
                state: new FormControl(null),
                locality: new FormControl(null),
                postalCode: new FormControl(null),
                region: new FormControl(null),
                type: new FormControl(null),
                primary: new FormControl(null)
              })
            ]
      ),
      groups: new FormArray([]),
      roles: new FormArray([]),
      photo: new FormControl(
        this.contact && this.contact.photo ? this.contact.photo : null
      ),
      active: new FormControl(
        this.contact && this.contact.followed ? this.contact.followed : false
      ),
      followed: new FormControl(
        this.contact && this.contact.followed ? this.contact.followed : false
      ),
      created: new FormControl(
        this.contact && this.contact.created ? this.contact.created : new Date()
      ),
      lastModified: new FormControl(new Date())
    });
  }

  get name(): FormGroup {
    return this.form.get("name") as FormGroup;
  }

  get givenName(): FormControl {
    return this.name.get("givenName") as FormControl;
  }

  get familyName(): FormControl {
    return this.name.get("familyName") as FormControl;
  }

  get company(): FormGroup {
    return this.form.get("company") as FormGroup;
  }

  get job(): FormGroup {
    return this.form.get("job") as FormGroup;
  }

  get emails(): FormArray {
    return this.form.get("emails") as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.form.get("phoneNumbers") as FormArray;
  }

  get description(): FormControl {
    return this.form.get("description") as FormControl;
  }

  get addresses(): FormArray {
    return this.form.get("addresses") as FormArray;
  }

  save() {
    if (!navigator.onLine) {
      this.store.dispatch(
        new fromStore.AddToQueue({
          action: fromStore.CREATE_CONTACT,
          data: this.form.value
        })
      );
    }
    this.store.dispatch(new fromStore.CreateContact(this.form.value));
    this.activeModal.dismiss();
  }
}
