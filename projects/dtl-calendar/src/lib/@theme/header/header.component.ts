import { Component, OnInit } from "@angular/core";
import { NbSidebarService } from "@nebular/theme";
import { Location } from "@angular/common";

@Component({
  selector: "dtl-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  constructor(
    protected location: Location,
    private sidebarService: NbSidebarService,
  ) {}

  ngOnInit() {

  }

  search(query) {

  }

  filter($event) {

  }

  back() {
    this.location.back();
    return false;
  }

  toggle() {
    this.sidebarService.toggle(false, "calendar-left");
  }
}
