import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromStore from "../../../@core/store";
import { delay } from "rxjs/operators";
import { SortConf } from "../../../@core/store/helpers";

@Component({
  selector: "dtl-table-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class DtlTableHeaderComponent implements OnInit, AfterViewInit {
  sorts: SortConf[] = [];

  sortDirection = "asc";

  showSortNameIcon: boolean = false;
  showSortEmailIcon: boolean = false;
  showSortPhoneIcon: boolean = false;
  showSortGroupsIcon: boolean = false;

  hideMobileDropdownMenu = true;
  btnMenuClicked = false;

  isViewInit = false;

  name = "Nom";

  constructor(
    private store: Store<fromStore.DocumentsState>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    /*
    this.store
      .select<any>(fromStore.getContactsSort)
      .pipe(delay(50))
      .subscribe(sort => {
        this.sorts = sort;
      });
      */
  }

  ngAfterViewInit() {
    this.isViewInit = true;
    this.cdr.detectChanges();
  }

  sort(field: string, direction) {
    this.sortDirection = direction;
    this.sorts = [
      {
        field: field,
        direction: this.sortDirection
      }
    ];
    this.store.dispatch(
      new fromStore.LoadDocuments(
        { filters: [], andOperator: true },
        this.sorts
      )
    );
  }

  sortEmails(direction) {
    this.sortDirection = direction;
    this.sorts = [
      {
        field: "emails",
        direction: this.sortDirection,
        compare: (direction: any, a: any[], b: any[]) => {
          const first = a.find(item => {
            return item.primary;
          }).value;
          const second = b.find(item => {
            return item.primary;
          }).value;
          if (first < second) {
            return -1 * direction;
          }
          if (first > second) {
            return direction;
          }
          return 0;
        }
      }
    ];
    this.store.dispatch(
      new fromStore.LoadDocuments(
        { filters: [], andOperator: true },
        this.sorts
      )
    );
  }

  sortPhoneNumbers(direction) {
    this.sortDirection = direction;
    this.sorts = [
      {
        field: "phoneNumbers",
        direction: this.sortDirection,
        compare: (direction: any, a: any[], b: any[]) => {
          const first = a.find(item => {
            return item.primary;
          }).value;
          const second = b.find(item => {
            return item.primary;
          }).value;
          if (first < second) {
            return -1 * direction;
          }
          if (first > second) {
            return direction;
          }
          return 0;
        }
      }
    ];
    this.store.dispatch(
      new fromStore.LoadDocuments(
        { filters: [], andOperator: true },
        this.sorts
      )
    );
  }

  sortGroups(direction) {
    this.sortDirection = direction;
    this.sorts = [
      {
        field: "groups",
        direction: this.sortDirection,
        compare: (direction: any, a: any[], b: any[]) => {
          const first = a[0].display;
          const second = b[0].display;
          if (first < second) {
            return -1 * direction;
          }
          if (first > second) {
            return direction;
          }
          return 0;
        }
      }
    ];
    this.store.dispatch(
      new fromStore.LoadDocuments(
        { filters: [], andOperator: true },
        this.sorts
      )
    );
  }

  isSort(field: string) {
    return this.sorts.find(s => {
      return s.field === field;
    });
  }

  hideMenu(event) {
    if (event && event["value"] === true) {
      if (!this.btnMenuClicked) {
        this.hideMobileDropdownMenu = true;
      }
      this.btnMenuClicked = false;
    }
  }
}
