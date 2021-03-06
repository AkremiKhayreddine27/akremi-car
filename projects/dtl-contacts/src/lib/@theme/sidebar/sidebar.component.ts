import { Component, OnInit, AfterViewInit } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromStore from "../../@core/store";
import { Group } from "../../@core/models";
import { delay, takeWhile } from "rxjs/operators";
import { NbSidebarService } from "@nebular/theme";

import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";

@Component({
  selector: "dtl-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  groups: Group[] = [];

  roles: any[] = [
    { id: 1, name: "Propriétaire" },
    { id: 2, name: "Manager" },
    { id: 3, name: "Mécanicien" },
    { id: 4, name: "Carrossier" },
    { id: 5, name: "Electronicien" },
    { id: 4, name: "Opérateur Vitrage" },
    { id: 5, name: "Technicien Expert" }
  ];
  filtersConf = { filters: [], andOperator: true };

  alive = true;

  displayBusiness = false;
  displayProviders = true;
  displayRoles = true;

  mobileView;

  constructor(
    private sidebarService: NbSidebarService,
    private store: Store<fromStore.ContactsAppState>,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Tablet])
      .pipe(takeWhile(() => this.alive))
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.displayBusiness = true;
          this.displayProviders = true;
          this.displayRoles = true;
          this.mobileView = true;
        } else {
          this.mobileView = false;
        }
      });
    this.sidebarService
      .onToggle()
      .pipe(takeWhile(() => this.alive))
      .subscribe(event => {
        this.displayBusiness = true;
        this.displayProviders = true;
        this.displayRoles = true;
      });
    this.store
      .select<any>(fromStore.getAllGroups)
      .pipe(
        delay(50),
        takeWhile(() => this.alive)
      )
      .subscribe(groups => {
        this.groups = groups;
      });
    this.store
      .select(fromStore.getContactsFilters)
      .pipe(
        delay(50),
        takeWhile(() => this.alive)
      )
      .subscribe(filtersConf => {
        this.filtersConf = filtersConf;
      });
  }

  ngAfterViewInit() {
    this.store.dispatch(
      new fromStore.LoadGroups(this.filtersConf, [], {
        page: 1,
        perPage: 20
      })
    );
  }

  filterFollwed() {
    this.filtersConf = {
      filters: [
        {
          field: "followed",
          search: "true",
          filter: function(cell: any[], search: any) {
            return cell.toString() === search;
          }
        }
      ],
      andOperator: false
    };
    this.store.dispatch(
      new fromStore.LoadContacts(this.filtersConf, [], {
        page: 1,
        perPage: 20
      })
    );
  }

  filter(group: Group = null) {
    if (group) {
      this.filtersConf = {
        filters: [
          {
            field: "groups",
            search: group.value.toString(),
            filter: function(cell: any[], search: any) {
              let exist = false;
              cell.map(item => {
                if (item.value.toString() === search) {
                  exist = true;
                }
              });
              return exist;
            }
          }
        ],
        andOperator: false
      };
      this.store.dispatch(
        new fromStore.LoadContacts(this.filtersConf, [], {
          page: 1,
          perPage: 20
        })
      );
    } else {
      this.store.dispatch(
        new fromStore.LoadContacts({ filters: [], andOperator: true }, [], {
          page: 1,
          perPage: 20
        })
      );
    }
  }

  isFilter(group: Group) {
    return this.filtersConf.filters.find(filter => {
      return filter.search === group.value.toString();
    });
  }

  isFollwedFilter() {
    return this.filtersConf.filters.find(filter => {
      return filter.field === "followed";
    });
  }

  noFilters() {
    return this.filtersConf.filters.length === 0;
  }

  closeSidebar() {
    if (this.mobileView) {
      this.sidebarService.collapse();
    }
  }
}
