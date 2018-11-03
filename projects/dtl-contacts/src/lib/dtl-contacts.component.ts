import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Store } from "@ngrx/store";
import * as fromStore from "./@core/store";
import { Pagination } from "./@core/store/helpers";
import { User, Group } from "./@core/models";
import { delay, takeWhile, mapTo, mergeMap } from "rxjs/operators";
import { ShowComponent, DeleteComponent } from "./components";
import { Email } from "./@core/models/email";
import { PhoneNumber } from "./@core/models/phone";
import { FilterConf } from "../../../dtl-documents/src/lib/@core/store/helpers";
import { merge, of, fromEvent, Observable } from "rxjs";
import { Queue } from "./@core/models/queue";
import { NbSidebarService } from "@nebular/theme";
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints
} from "@angular/cdk/layout";

@Component({
  selector: "dtl-contacts",
  templateUrl: "./dtl-contacts.component.html",
  styleUrls: ["./dtl-contacts.component.scss"]
})
export class DtlContactsComponent implements OnInit, AfterViewInit, OnDestroy {
  pageTitle = "Contacts";

  users: User[] = [];
  usersLoaded: Observable<boolean>;

  groups: Group[] = [];

  config: any;

  pagination: Pagination = { page: 1, perPage: 10 };
  filtersConf: FilterConf = { filters: [], andOperator: true };

  selectedData: any[] = [];
  allSelected: any = { type: "event", checked: false };
  alive = true;

  notification;

  hideMobileDropdownLabel = true;
  hideMobileDropdownMenu = true;
  btnLableClicked = false;
  btnMenuClicked = false;
  btnSidebarClicked = false;

  isViewInit = false;

  online: boolean;

  isExtended = false;

  mobileView;

  constructor(
    private store: Store<fromStore.ContactsAppState>,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private sidebarService: NbSidebarService,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.loadContacts();
    this.loadGroups();
    this.breakpointObserver
      .observe(["(orientation: portrait)", "(orientation: landscape)"])
      .pipe(takeWhile(() => this.alive))
      .subscribe((state: BreakpointState) => {
        this.isExtended = false;
      });
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .pipe(takeWhile(() => this.alive))
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.mobileView = true;
        } else {
          this.mobileView = false;
        }
      });
    this.sidebarService
      .onToggle()
      .pipe(takeWhile(() => this.alive))
      .subscribe(event => {
        this.isExtended = !this.isExtended;
        this.btnSidebarClicked = !this.btnSidebarClicked;
      });
    this.sidebarService
      .onCollapse()
      .pipe(takeWhile(() => this.alive))
      .subscribe(event => {
        this.isExtended = false;
        this.btnSidebarClicked = false;
      });
    merge(
      of(navigator.onLine),
      fromEvent(window, "online").pipe(mapTo(true)),
      fromEvent(window, "offline").pipe(mapTo(false))
    )
      .pipe(
        takeWhile(() => this.alive),
        mergeMap(isOnline => {
          if (isOnline) {
            return this.store.select(fromStore.getAllQueue);
          }
          return of([]);
        })
      )
      .subscribe((queue: Queue[]) => {
        if (queue.length > 0) {
          //this.store.dispatch(new fromStore.ClearQueue());
        }
      });
    this.store.dispatch(new fromStore.LoadQueue());
    this.store
      .select(fromStore.getContactsFilters)
      .pipe(
        delay(50),
        takeWhile(() => this.alive)
      )
      .subscribe(filtersConf => {
        this.filtersConf = filtersConf;
        if (this.filtersConf && this.filtersConf.filters.length === 0) {
          this.pageTitle = "Contacts";
        }
        if (this.filtersConf) {
          this.filtersConf.filters.map(filter => {
            if (filter.field === "groups") {
              this.pageTitle = "Contacts";
            } else if (filter.field === "followed") {
              this.pageTitle = "Contacts suivis";
            }
          });
        }
      });
  }

  loadContacts() {
    this.store
      .select<User[]>(fromStore.getPaginatedSortedFiltredContacts)
      .pipe(delay(50))
      .subscribe(users => {
        this.users = users;
      });
    this.usersLoaded = this.store
      .select<boolean>(fromStore.getContactsLoaded)
      .pipe(delay(50));
  }

  loadGroups() {
    this.store
      .select<Group[]>(fromStore.getAllGroups)
      .pipe(delay(50))
      .subscribe(groups => {
        this.groups = groups;
      });
  }

  ngAfterViewInit() {
    this.isViewInit = true;
    this.cdr.detectChanges();
    this.store.dispatch(
      new fromStore.LoadContacts(
        this.filtersConf,
        [{ field: "name.familyName", direction: "asc" }],
        {
          page: 1,
          perPage: 10
        }
      )
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }

  handleSelectRowChanged(event) {
    if (event.checked) {
      this.selectedData.push(event.row);
    } else {
      this.selectedData = this.selectedData.filter(item => {
        return item.id !== event.row.id;
      });
    }
    this.allSelected = {
      type: "change",
      checked: this.selectedData.length === this.users.length
    };
  }

  handleSelectAllChanged($event) {
    this.allSelected = { type: "event", checked: this.allSelected.checked };
    if (this.allSelected.checked) {
      this.selectedData = this.users;
    } else {
      this.selectedData = [];
    }
  }

  resetSelected() {
    this.selectedData = [];
    this.allSelected = { ...this.allSelected, type: "event", checked: false };
  }

  create() {
    const modalRef = this.modalService.open(ShowComponent, {
      windowClass: "all-height"
    });
    modalRef.componentInstance.edit = true;
  }

  delete(user = null) {
    const modalRef = this.modalService.open(DeleteComponent, {
      windowClass: "centred"
    });
    modalRef.componentInstance.ids = this.selectedData.map(item => item.id);
    modalRef.result.then(result => {}).catch(reason => {
      this.notification = "Le contact a été supprimé";
      setTimeout(() => {
        this.notification = null;
      }, 5000);
      this.selectedData = [];
      this.allSelected = {
        type: "event",
        checked: false
      };
    });
  }

  hideLabels(event) {
    if (event && event["value"] === true) {
      if (this.btnLableClicked) {
        this.hideMobileDropdownLabel = true;
      }
      this.btnLableClicked = false;
    }
  }

  hideMenu(event) {
    if (event && event["value"] === true) {
      if (this.btnMenuClicked) {
        this.hideMobileDropdownMenu = true;
      }
      this.btnMenuClicked = false;
    }
  }

  hideSidebar(event) {
    if (this.mobileView) {
      if (event && event["value"] === true) {
        if (!this.btnSidebarClicked) {
          this.sidebarService.collapse();
        }
        this.btnSidebarClicked = false;
      }
    }
  }
}
