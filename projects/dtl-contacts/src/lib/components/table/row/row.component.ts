import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import { User } from "../../../@core/models/user";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../@core/store";
import { Observable } from "rxjs/Observable";
import { Group } from "../../../@core/models/group";
import { delay } from "rxjs/operators";
import { ShowComponent } from "../../show/show.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteComponent } from "../../delete/delete.component";

@Component({
  selector: "dtl-row",
  templateUrl: "./row.component.html",
  styleUrls: ["./row.component.scss"]
})
export class RowComponent implements OnInit, OnChanges {
  @Input()
  contact: User;

  @Input()
  allSelected;

  @Output()
  contactSelected: EventEmitter<any> = new EventEmitter();

  groups$: Observable<Group[]>;

  showCheckbox: boolean = false;

  checked: boolean = false;

  constructor(
    private store: Store<fromStore.ContactsAppState>,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.groups$ = this.store
      .select<Group[]>(fromStore.getAllGroups)
      .pipe(delay(50));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.allSelected && this.allSelected.type === "event") {
      this.checked = this.allSelected.checked;
    }
  }

  show() {
    const modalRef = this.modalService.open(ShowComponent, {
      windowClass: "all-height"
    });
    modalRef.componentInstance.contact = this.contact;
  }

  edit() {
    const modalRef = this.modalService.open(ShowComponent, {
      windowClass: "all-height"
    });
    modalRef.componentInstance.contact = this.contact;
    modalRef.componentInstance.edit = true;
  }

  delete() {
    const modalRef = this.modalService.open(DeleteComponent, {
      windowClass: "centred"
    });
    modalRef.componentInstance.ids = [this.contact.id];
  }

  assignToGroup(item: Group) {
    const partial: User = {};
    partial.groups = [...this.contact.groups];
    const exist = partial.groups.find(group => {
      return group.value === item.value;
    });
    if (exist) {
      partial.groups = partial.groups.filter(group => {
        return group.value !== item.value;
      });
    } else {
      partial.groups.push(item);
    }
    this.store.dispatch(new fromStore.UpdateContact(this.contact.id, partial));
  }

  belongToContact(group: Group) {
    return this.contact.groups.find(g => {
      return g.value === group.value;
    });
  }
}
