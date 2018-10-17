import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  ElementRef,
  ViewContainerRef
} from "@angular/core";
import { OverlayRef, Overlay } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";

@Component({
  selector: "ngx-cars-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"]
})
export class CarsFilterComponent implements OnInit {
  @ViewChild("trigger")
  trigger: ElementRef;

  @ViewChild("desktopContent")
  desktopContent: TemplateRef<any>;

  @ViewChild("mobileContent")
  mobileContent: TemplateRef<any>;

  private _overlayRef: OverlayRef;
  private _mobileOverlayRef: OverlayRef;
  private _portal: TemplatePortal<any>;
  private _mobilePortal: TemplatePortal<any>;

  center: boolean = false;

  statusCollapsed = true;
  typeCollapsed = true;

  constructor(
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }

  open() {
    if (!this._overlayRef) {
      const positionStrategy = this._overlay
        .position()
        .connectedTo(
          this.trigger,
          { originX: "end", originY: "bottom" },
          { overlayX: "end", overlayY: "top" }
        )
        .withFallbackPosition(
          { originX: "end", originY: "top" },
          { overlayX: "end", overlayY: "bottom" }
        );

      this._overlayRef = this._overlay.create({
        hasBackdrop: true,
        backdropClass: "cdk-overlay-transparent-backdrop",
        positionStrategy
      });

      this._overlayRef
        .backdropClick()
        .subscribe(() => this._overlayRef.detach());
      this._portal = new TemplatePortal(
        this.desktopContent,
        this._viewContainerRef
      );
    }

    this._overlayRef.attach(this._portal);
  }

  mobileOpen() {
    if (!this._mobileOverlayRef) {
      let positionStrategy;
      let width = "100%";
      let panelClass = "";
      if (this.center) {
        positionStrategy = this._overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically();
        width = "80%";
        panelClass = "select-border-radius";
      } else {
        positionStrategy = this._overlay
          .position()
          .global()
          .bottom("0");
      }
      this._mobileOverlayRef = this._overlay.create({
        hasBackdrop: true,
        positionStrategy,
        width: width,
        maxHeight: "270px",
        panelClass: panelClass
      });
      this._mobileOverlayRef
        .backdropClick()
        .subscribe(() => this._mobileOverlayRef.detach());
      this._mobilePortal = new TemplatePortal(
        this.mobileContent,
        this._viewContainerRef
      );
    }

    this._mobileOverlayRef.attach(this._mobilePortal);
  }
}
