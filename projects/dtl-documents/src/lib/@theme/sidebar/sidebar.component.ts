import { Component, OnInit, AfterViewInit } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromStore from "../../@core/store";
import { delay, takeWhile } from "rxjs/operators";
import { NbSidebarService } from "@nebular/theme";

import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { DocumentType } from "../../@core/models";

@Component({
  selector: "dtl-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit, AfterViewInit {
  types: DocumentType[] = [];

  filtersConf = { filters: [], andOperator: true };

  alive = true;

  displayBusiness = false;
  displayProviders = true;

  mobileView;

  constructor(
    private sidebarService: NbSidebarService,
    private store: Store<fromStore.DocumentsState>,
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
      });
    this.store
      .select<any>(fromStore.getAllCategories)
      .pipe(
        delay(50),
        takeWhile(() => this.alive)
      )
      .subscribe(types => {
        this.types = types;
      });
    this.store
      .select(fromStore.getDocumentsFilters)
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
      new fromStore.LoadCategories(this.filtersConf, [], {
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
      new fromStore.LoadDocuments(this.filtersConf, [], {
        page: 1,
        perPage: 20
      })
    );
  }

  filter(group: any = null) {
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
        new fromStore.LoadDocuments(this.filtersConf, [], {
          page: 1,
          perPage: 20
        })
      );
    } else {
      this.store.dispatch(
        new fromStore.LoadDocuments({ filters: [], andOperator: true }, [], {
          page: 1,
          perPage: 20
        })
      );
    }
  }

  isFilter(group: any) {
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
