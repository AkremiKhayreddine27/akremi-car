import { Component, OnInit } from "@angular/core";
import { NbSidebarService } from "@nebular/theme";
import { Location } from "@angular/common";

import { Store } from "@ngrx/store";
import * as fromStore from "../../@core/store";
import { Document } from "../../@core/models";
import { delay, takeWhile } from "rxjs/operators";
import { FilterConf } from "../../@core/store/helpers";

@Component({
  selector: "dtl-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  filtersConf;

  showMobileSearch: Boolean = false;

  constructor(
    private store: Store<fromStore.DocumentsState>,
    protected location: Location,
    private sidebarService: NbSidebarService
  ) {}

  ngOnInit() {
    this.store.dispatch(new fromStore.GenerateDocumentsData());
  }

  back() {
    this.location.back();
    return false;
  }

  toggle() {
    this.sidebarService.toggle(true, "left");
  }
}
