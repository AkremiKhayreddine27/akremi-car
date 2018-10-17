import { Component, OnInit, Input } from "@angular/core";
import { SmartPageHeaderService } from "../directives/smart-page-header.service";
import { NbThemeService, NbSidebarService } from "@nebular/theme";
import { delay } from "rxjs/operators";

@Component({
  selector: "ngx-smart-page-header",
  templateUrl: "./smart-page-header.component.html",
  styleUrls: ["./smart-page-header.component.scss"]
})
export class SmartPageHeaderComponent implements OnInit {
  @Input()
  responsive: boolean = false;

  isExtended: boolean;

  pageTitle: string = "";

  constructor(
    private service: SmartPageHeaderService,
    private sidebarService: NbSidebarService,
    protected themeService: NbThemeService
  ) {}

  ngOnInit(): void {
    this.service.isExtendedChanged.subscribe(state => {
      this.isExtended = state;
    });
    this.themeService
      .onMediaQueryChange()
      .pipe(delay(1))
      .subscribe(media => {
        if (
          media[1].name === "is" ||
          media[1].name === "xs" ||
          media[1].name === "sm" ||
          media[1].name === "md"
        ) {
          this.isExtended = true;
          this.service.changeState(this.isExtended);
        } else {
          this.isExtended = false;
          this.service.changeState(this.isExtended);
        }
      });
    this.sidebarService.onToggle().subscribe(chnges => {
      this.isExtended = !this.isExtended;
      this.service.changeState(this.isExtended);
    });
    this.sidebarService.onCollapse().subscribe(chnges => {
      this.isExtended = false;
      this.service.changeState(this.isExtended);
    });
    this.sidebarService.onExpand().subscribe(chnges => {
      this.isExtended = true;
      this.service.changeState(this.isExtended);
    });
  }
}
