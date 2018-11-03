import {
  Component,
  OnDestroy,
  ViewChild,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";
import { delay, withLatestFrom, takeWhile } from "rxjs/operators";
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
  NbThemeService
} from "@nebular/theme";

import { StateService } from "../../../@core/data/state.service";
import { OverlayRef, Overlay } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";

// TODO: move layouts into the framework
@Component({
  selector: "ngx-sample-layout",
  styleUrls: ["./sample.layout.scss"],
  templateUrl: "./sample.layout.html"
})
export class SampleLayoutComponent implements OnDestroy {
  subMenu: NbMenuItem[] = [
    {
      title: "PAGE LEVEL MENU",
      group: true
    },
    {
      title: "Buttons",
      icon: "ion ion-android-radio-button-off",
      link: "/pages/ui-features/buttons"
    },
    {
      title: "Grid",
      icon: "ion ion-android-radio-button-off",
      link: "/pages/ui-features/grid"
    },
    {
      title: "Icons",
      icon: "ion ion-android-radio-button-off",
      link: "/pages/ui-features/icons"
    },
    {
      title: "Modals",
      icon: "ion ion-android-radio-button-off",
      link: "/pages/ui-features/modals"
    },
    {
      title: "Typography",
      icon: "ion ion-android-radio-button-off",
      link: "/pages/ui-features/typography"
    },
    {
      title: "Animated Searches",
      icon: "ion ion-android-radio-button-off",
      link: "/pages/ui-features/search-fields"
    },
    {
      title: "Tabs",
      icon: "ion ion-android-radio-button-off",
      link: "/pages/ui-features/tabs"
    }
  ];
  layout: any = {};
  sidebar: any = {};

  private alive = true;

  currentTheme: string;

  isMobile = false;
  showOverlay = false;

  constructor(
    protected stateService: StateService,
    protected menuService: NbMenuService,
    protected themeService: NbThemeService,
    protected bpService: NbMediaBreakpointsService,
    protected sidebarService: NbSidebarService,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) {
    this.stateService
      .onLayoutState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((layout: string) => (this.layout = layout));

    this.stateService
      .onSidebarState()
      .pipe(takeWhile(() => this.alive))
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

    const isBp = this.bpService.getByName("sm");
    this.menuService
      .onItemSelect()
      .pipe(
        takeWhile(() => this.alive),
        withLatestFrom(this.themeService.onMediaQueryChange()),
        delay(20)
      )
      .subscribe(
        ([item, [bpFrom, bpTo]]: [
          any,
          [NbMediaBreakpoint, NbMediaBreakpoint]
        ]) => {
          if (bpTo.width <= isBp.width) {
            this.sidebarService.collapse("menu-sidebar");
          }
        }
      );

    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });

    this.themeService
      .onMediaQueryChange()
      .pipe(delay(1))
      .subscribe(media => {
        if (
          media[1].name === "is" ||
          media[1].name === "xs" ||
          media[1].name === "sm"
        ) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
    this.sidebarService.onToggle().subscribe(({ compact, tag }) => {
      if (this.isMobile) {
        if (this._mobileOverlayRef && this._mobileOverlayRef.hasAttached()) {
          this._mobileOverlayRef.detach();
        } else {
          this.mobileOpen();
          this.showOverlay = true;
        }
      }
    });
  }
  private _mobileOverlayRef: OverlayRef;
  private _mobilePortal: TemplatePortal<any>;

  @ViewChild("mobileContent")
  mobileContent: TemplateRef<any>;

  mobileOpen() {
    if (!this._mobileOverlayRef) {
      const positionStrategy = this._overlay
        .position()
        .global()
        .bottom("0");

      this._mobileOverlayRef = this._overlay.create({
        hasBackdrop: true,
        positionStrategy,
        width: "100%"
      });
      this._mobileOverlayRef.backdropClick().subscribe(() => {
        this._mobileOverlayRef.detach();
        this.sidebarService.collapse("menu-sidebar");
      });
      this._mobilePortal = new TemplatePortal(
        this.mobileContent,
        this._viewContainerRef
      );
    }

    //this._mobileOverlayRef.attach(this._mobilePortal);
  }

  closeSidebar() {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.showOverlay = false;
  }

  hideSidebar(event) {
    if (event && event.target.className !== "nb-menu" && this.isMobile) {
      this.sidebarService.collapse("menu-sidebar");
      this.showOverlay = false;
    } else if (event && event.target.className === "nb-menu" && this.isMobile) {
      this.showOverlay = true;
    }
  }

  hideWithOverlay() {
    this.sidebarService.collapse("menu-sidebar");
    this.showOverlay = false;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
