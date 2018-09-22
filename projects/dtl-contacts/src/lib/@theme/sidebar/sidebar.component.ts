import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

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
  providers: any[] = [
    { id: 1, name: "Assurances" },
    { id: 2, name: "Contrôle Technique" },
    { id: 3, name: "Entretient - Réparation" },
    { id: 4, name: "Equipements" },
    { id: 5, name: "Station Services" }
  ];
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

  constructor(
    private sidebarService: NbSidebarService,
    private store: Store<fromStore.LocatusState>,
    private modalService: NgbModal,
    public breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Tablet])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.displayBusiness = true;
          this.displayProviders = true;
          this.displayRoles = true;
        }
      });
    this.sidebarService.onToggle().subscribe(event => {
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
  }

  ngAfterViewInit() {
    this.store.dispatch(
      new fromStore.LoadGroups(this.filtersConf, [], {
        page: 1,
        perPage: 20
      })
    );
  }
}
