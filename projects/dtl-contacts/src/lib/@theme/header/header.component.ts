import { Component, OnInit, NgZone } from "@angular/core";
import { NbSidebarService } from "@nebular/theme";
import { Location } from "@angular/common";

import { Store } from "@ngrx/store";
import * as fromStore from "../../@core/store";
import { Group } from "../../@core/models/group";
import { delay, takeWhile } from "rxjs/operators";
import { FilterConf } from "../../@core/store/helpers";

@Component({
  selector: "dtl-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  _timeout: any = null;

  groups: Group[] = [];

  filtersConf: FilterConf = { filters: [], andOperator: false };

  showMobileSearch: Boolean = false;

  searchFields = [
    "email",
    "phone",
    "firstname",
    "lastname",
    "location.address",
    "location.postcode",
    "location.city",
    "location.state",
    "location.country"
  ];

  alive = true;

  constructor(
    private store: Store<fromStore.LocatusState>,
    protected location: Location,
    private sidebarService: NbSidebarService,
    public lc: NgZone
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromStore.GenerateContactsData());
    this.store.dispatch(new fromStore.GenerateGroupsData());
    this.store
      .select(fromStore.getAllGroups)
      .pipe(
        delay(50),
        takeWhile(() => this.alive)
      )
      .subscribe(groups => {
        this.groups = groups;
      });
  }

  search(query) {
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
      });
    }, 1000);
  }

  filter($event) {
    if ($event) {
      this.filtersConf = {
        filters: [
          {
            field: "groups",
            search: $event.id.toString(),
            filter: function(cell: any[], search: any) {
              let exist = false;
              cell.map(item => {
                if (item.toString() === search) {
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

  back() {
    this.location.back();
    return false;
  }

  toggle() {
    this.sidebarService.toggle(true, "left");
  }
}
