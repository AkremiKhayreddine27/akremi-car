import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from "@angular/core";
import { Document, Category } from "../../../@core/models";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../@core/store";
import { Observable } from "rxjs/Observable";
import { delay } from "rxjs/operators";
import { CreateComponent } from "../../create/create.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeleteComponent } from "../../delete/delete.component";

@Component({
  selector: "dtl-row",
  templateUrl: "./row.component.html",
  styleUrls: ["./row.component.scss"]
})
export class RowComponent implements OnInit, OnChanges {
  @Input()
  document: Document;

  @Input()
  allSelected;

  @Output()
  contactSelected: EventEmitter<any> = new EventEmitter();

  types$: Observable<Category[]>;

  showCheckbox: boolean = false;

  checked: boolean = false;

  constructor(
    private store: Store<fromStore.DocumentsState>,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.types$ = this.store
      .select<Category[]>(fromStore.getAllCategories)
      .pipe(delay(50));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.allSelected && this.allSelected.type === "event") {
      this.checked = this.allSelected.checked;
    }
  }

  show() {
    const modalRef = this.modalService.open(CreateComponent, {
      windowClass: "all-height"
    });
    modalRef.componentInstance.contact = this.document;
  }

  edit() {
    const modalRef = this.modalService.open(CreateComponent, {
      windowClass: "all-height"
    });
    modalRef.componentInstance.contact = this.document;
    modalRef.componentInstance.edit = true;
  }

  delete() {
    const modalRef = this.modalService.open(DeleteComponent, {
      windowClass: "centred"
    });
    modalRef.componentInstance.ids = [this.document.id];
  }

  assignToGroup(item: Category) {
    /*
    const partial: Document = {};
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
    */
  }

  belongToDocument(group: Category) {
    return this.document.type.id === group.id;
  }
}
