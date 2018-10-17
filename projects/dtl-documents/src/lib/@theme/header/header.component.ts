import { Component, OnInit, NgZone, AfterViewInit } from "@angular/core";
import { NbSidebarService } from "@nebular/theme";
import { Location } from "@angular/common";

import { Store } from "@ngrx/store";
import * as fromStore from "../../@core/store";
import { delay, takeWhile } from "rxjs/operators";
import { FilterConf } from "../../@core/store/helpers";

import { Router, RoutesRecognized } from "@angular/router";
import { filter, pairwise } from "rxjs/operators";

@Component({
  selector: "dtl-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  _timeout: any = null;

  filtersConf: FilterConf = { filters: [], andOperator: false };

  showMobileSearch: Boolean = false;
  showMobileSearchDropdown: boolean = true;

  searchFields = ["name.familyName", "name.givenName"];

  alive = true;

  previousUrl: string;

  query;

  constructor(
    private store: Store<fromStore.DocumentsState>,
    protected location: Location,
    private sidebarService: NbSidebarService,
    public lc: NgZone,
    public router: Router
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromStore.GenerateDocumentsData());
    this.store.dispatch(new fromStore.GenerateCategoriesData());
    this.store
      .select(fromStore.getAllCategories)
      .pipe(
        delay(50),
        takeWhile(() => this.alive)
      )
      .subscribe(groups => {
        //this.groups = groups;
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

  ngAfterViewInit() {}

  search(query) {
    if (query === "Group: ") {
      query = "";
    }
    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
      this._timeout = null;
      this.lc.run(() => {
        this.filtersConf.filters = [];
        if (query !== "") {
          this.filtersConf.andOperator = false;
          this.filtersConf.filters = this.searchFields.map((field: string) => {
            return {
              field: field,
              search: query
            };
          });
          this.store.dispatch(
            new fromStore.LoadDocuments(this.filtersConf, [], {
              page: 1,
              perPage: 20
            })
          );
        } else {
          this.store.dispatch(
            new fromStore.LoadDocuments(
              { filters: [], andOperator: true },
              [],
              {
                page: 1,
                perPage: 20
              }
            )
          );
        }
      });
    }, 1000);
  }

  filter(group: any) {
    this.query = "Group:" + group.display;
    if (this.isFilter(group)) {
      this.store.dispatch(
        new fromStore.LoadDocuments({ filters: [], andOperator: true }, [], {
          page: 1,
          perPage: 20
        })
      );
    } else {
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
    }
  }

  back() {
    this.router.events
      .pipe(
        filter((e: any) => e instanceof RoutesRecognized),
        pairwise(),
        takeWhile(() => this.alive)
      )
      .subscribe((e: any) => {
        if (e[0].urlAfterRedirects) {
          this.previousUrl = e[0].urlAfterRedirects;
        }
      });
    if (this.previousUrl) {
      this.router.navigateByUrl(this.previousUrl);
    } else {
      this.router.navigateByUrl("/pages/dashboard");
    }
  }

  toggle() {
    this.sidebarService.toggle(true, "left");
  }

  isFilter(group: any) {
    return this.filtersConf.filters.find(filter => {
      return filter.search === group.value.toString();
    });
  }

  clear() {
    this.query = "";
    this.filtersConf = { filters: [], andOperator: true };
    this.store.dispatch(
      new fromStore.LoadDocuments(this.filtersConf, [], {
        page: 1,
        perPage: 20
      })
    );
  }
}
